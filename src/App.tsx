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
import { useCallback, useRef, useState } from "react";

import "@xyflow/react/dist/style.css";
import { LocalStorageHandler } from "./components/local-storage-handler";
import { EmptyState } from "./components/menus/empty-state";
import { Help } from "./components/menus/help";
import NodeContextMenu, {
  NodeContextMenuProps,
} from "./components/menus/node-context-menu";
import NodeMenu from "./components/menus/node-menu";
import SelectionDisplay from "./components/menus/selection-display";
import Toolbar from "./components/menus/toolbar";
import edgeTypes from "./constants/edgeTypes";
import { nodeTypes } from "./constants/node-types";
import { styleConstants } from "./constants/style-constants";
import { SourceHandleValues } from "./types/node-data";

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

const contextMenuSize = { width: 230, height: 260 };

const miniMapNodeColor = (node: Node) =>
  (node.data?.sourceHandleValues as SourceHandleValues | undefined)?.some(
    (v) => v.value
  )
    ? styleConstants.activeColor
    : "#334155";

const App = () => {
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);

  const ref = useRef<HTMLDivElement | null>(null);

  const [menu, setMenu] = useState<NodeContextMenuProps | null>(null);

  const closeMenu = useCallback(() => setMenu(null), []);

  const onPaneClick = useCallback(() => {
    closeMenu();
    // React Flow swallows pane mousedown, so inputs inside nodes (e.g. the
    // hex input) would otherwise keep focus and eat keyboard shortcuts
    if (document.activeElement instanceof HTMLInputElement) {
      document.activeElement.blur();
    }
  }, [closeMenu]);

  const onNodeContextMenu: NodeMouseHandler<Node> = useCallback(
    (event, node) => {
      // Prevent native context menu from showing
      event.preventDefault();
      if (!ref.current) return;

      // Position the menu relative to the canvas, flipping it when it would
      // otherwise go off-screen
      const pane = ref.current.getBoundingClientRect();
      const x = event.clientX - pane.left;
      const y = event.clientY - pane.top;
      const flipX = x > pane.width - contextMenuSize.width;
      const flipY = y > pane.height - contextMenuSize.height;

      setMenu({
        closeMenu,
        id: node.id,
        top: flipY ? undefined : y,
        left: flipX ? undefined : x,
        right: flipX ? pane.width - x : undefined,
        bottom: flipY ? pane.height - y : undefined,
      });
    },
    [closeMenu]
  );

  const onConnect = useCallback(
    (params: Edge | Connection) =>
      setEdges((eds) => addEdge({ ...params, type: "wire" }, eds)),
    [setEdges]
  );

  const handleNodesChange = useCallback(
    (changes: NodeChange<Node>[]) => {
      // Close the context menu if its node goes away
      if (
        menu &&
        changes.some((c) => c.type === "remove" && c.id === menu.id)
      ) {
        setMenu(null);
      }
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [menu, setNodes]
  );

  const handleEdgesChange = useCallback(
    (changes: EdgeChange<Edge>[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  return (
    <div className="w-screen h-screen">
      <ReactFlow
        colorMode="dark"
        onNodeContextMenu={onNodeContextMenu}
        onPaneClick={onPaneClick}
        onMoveStart={closeMenu}
        onNodeDragStart={closeMenu}
        connectionLineType={ConnectionLineType.SmoothStep}
        connectionLineStyle={{
          stroke: styleConstants.activeColor,
          strokeWidth: 2,
          strokeDasharray: "6 6",
        }}
        edgeTypes={edgeTypes}
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={onConnect}
        deleteKeyCode={["Backspace", "Delete"]}
        snapToGrid
        snapGrid={[10, 10]}
        minZoom={0.2}
        maxZoom={3}
        ref={ref}
        proOptions={{
          hideAttribution: true,
        }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1.3}
          color="#243044"
        />
        <MiniMap
          nodeColor={miniMapNodeColor}
          nodeBorderRadius={4}
          bgColor="#0d1220"
          maskColor="rgba(7, 10, 18, 0.65)"
          position="bottom-right"
          pannable
          zoomable
          className="!m-3 hidden md:block"
        />
        <Controls
          position="bottom-right"
          orientation="horizontal"
          showInteractive={false}
          className="!m-3 md:!mb-[174px]"
        />
        <EmptyState />
        <NodeMenu />
        <Toolbar />
        <SelectionDisplay />
        <Help />
        {menu && <NodeContextMenu {...menu} />}
        <LocalStorageHandler />
      </ReactFlow>
    </div>
  );
};
export default App;
