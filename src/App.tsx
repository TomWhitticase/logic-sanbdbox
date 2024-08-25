import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  BackgroundVariant,
  Connection,
  ConnectionLineType,
  Controls,
  Edge,
  EdgeChange,
  MiniMap,
  Node,
  NodeChange,
  NodeMouseHandler,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import { useCallback, useEffect, useRef, useState } from "react";

import "@xyflow/react/dist/style.css";
import NodeContextMenu, {
  NodeContextMenuProps,
} from "./components/menus/node-context-menu";
import NodeMenu from "./components/menus/node-menu";
import SelectionDisplay from "./components/menus/selection-display";
import edgeTypes from "./constants/edgeTypes";
import nodeTypes from "./constants/nodeTypes";

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

const localStorageKeys = {
  nodes: "flowNodes",
  edges: "flowEdges",
};

const App = () => {
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);

  const ref = useRef<HTMLDivElement | null>(null);

  const [menu, setMenu] = useState<NodeContextMenuProps | null>(null);

  const onNodeContextMenu: NodeMouseHandler<Node> = useCallback(
    (event, node) => {
      // Prevent native context menu from showing
      event.preventDefault();

      // Calculate position of the context menu. We want to make sure it
      // doesn't get positioned off-screen.
      if (!ref.current) return;
      const pane = ref.current.getBoundingClientRect();

      setMenu({
        id: node.id,
        top: event.clientY < pane.height - 200 ? event.clientY : undefined,
        left: event.clientX < pane.width - 200 ? event.clientX : undefined,
        right:
          event.clientX >= pane.width - 200
            ? pane.width - event.clientX
            : undefined,
        bottom:
          event.clientY >= pane.height - 200
            ? pane.height - event.clientY
            : undefined,
      });
    },
    [setMenu]
  );

  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

  const onConnect = useCallback(
    (params: Edge | Connection) =>
      setEdges((eds) => {
        const updatedEdges = addEdge({ ...params, type: "wire" }, eds);
        localStorage.setItem(
          localStorageKeys.edges,
          JSON.stringify(updatedEdges)
        );
        return updatedEdges;
      }),
    [setEdges]
  );

  useEffect(() => {
    const storedNodes = localStorage.getItem(localStorageKeys.nodes);
    const storedEdges = localStorage.getItem(localStorageKeys.edges);

    if (storedNodes) {
      setNodes(JSON.parse(storedNodes));
    }
    if (storedEdges) {
      setEdges(JSON.parse(storedEdges));
    }
  }, [setNodes, setEdges]);

  const handleNodesChange = (changes: NodeChange<Node>[]) => {
    setNodes((nds) => {
      const updatedNodes = applyNodeChanges(changes, nds);
      localStorage.setItem(
        localStorageKeys.nodes,
        JSON.stringify(updatedNodes)
      );
      return updatedNodes;
    });
  };

  const handleEdgesChange = (changes: EdgeChange<Edge>[]) => {
    setEdges((eds) => {
      const updatedEdges = applyEdgeChanges(changes, eds);
      localStorage.setItem(
        localStorageKeys.edges,
        JSON.stringify(updatedEdges)
      );
      return updatedEdges;
    });
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        onNodeContextMenu={onNodeContextMenu}
        onPaneClick={onPaneClick}
        connectionLineType={ConnectionLineType.Straight}
        connectionLineStyle={{
          stroke: "lightgray",
          strokeDasharray: "5 5",
        }}
        edgeTypes={edgeTypes}
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={(nodes) => handleNodesChange(nodes)}
        onEdgesChange={(edges) => handleEdgesChange(edges)}
        onConnect={onConnect}
        ref={ref}
        proOptions={{
          hideAttribution: true,
        }}
      >
        <MiniMap
          nodeColor={"gray"}
          className="border-2 rounded-md"
          position="bottom-right"
        />
        <Controls position="bottom-right" />
        <Background variant={BackgroundVariant.Lines} gap={12} size={1} />
        <NodeMenu />
        <SelectionDisplay />
        {menu && <NodeContextMenu {...menu} />}
      </ReactFlow>
    </div>
  );
};
export default App;
