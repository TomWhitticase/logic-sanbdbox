import {
  Edge,
  Node,
  Panel,
  useOnSelectionChange,
  useReactFlow,
} from "@xyflow/react";
import { useCallback, useEffect, useState } from "react";
import { useMousePosition } from "../../hooks/use-mouse-position";
const SelectionDisplay = () => {
  const [selectedNodes, setSelectedNodes] = useState<Node[]>([]);
  const [selectedEdges, setSelectedEdges] = useState<Edge[]>([]);

  const [copiedNodes, setCopiedNodes] = useState<Node[]>([]);
  const [copiedEdges, setCopiedEdges] = useState<Edge[]>([]);

  const { addEdges, addNodes, setNodes, setEdges } = useReactFlow();

  const { screenToFlowPosition } = useReactFlow();
  const mousePosition = useMousePosition();
  const [copyPosition, setCopyPosition] = useState({ x: 0, y: 0 });

  const onChange = useCallback(
    ({ nodes, edges }: { nodes: Node[]; edges: Edge[] }) => {
      setSelectedNodes(nodes);
      setSelectedEdges(edges);
    },
    []
  );

  useOnSelectionChange({
    onChange,
  });

  const handleCopy = useCallback(() => {
    setCopiedNodes(selectedNodes);
    setCopiedEdges(selectedEdges);
    setCopyPosition(
      screenToFlowPosition({
        x: mousePosition.x,
        y: mousePosition.y,
      })
    );
  }, [selectedEdges, selectedNodes]);

  const handlePaste = useCallback(() => {
    const timestamp = Date.now();

    const position = screenToFlowPosition({
      x: mousePosition.x,
      y: mousePosition.y,
    });

    const newNodes: Node[] = copiedNodes.map((node) => ({
      ...node,
      id: `${node.id}-${timestamp}`,
      position: {
        x: node.position.x - copyPosition.x + position.x,
        y: node.position.y - copyPosition.y + position.y,
      },
    }));
    const nodeIds = new Set(newNodes.map((node) => node.id));

    const newEdges: Edge[] = selectedEdges
      .filter(
        (edge) =>
          nodeIds.has(`${edge.source}-${timestamp}`) &&
          nodeIds.has(`${edge.target}-${timestamp}`)
      )
      .map((edge) => ({
        ...edge,
        id: `${edge.id}-${timestamp}`,
        source: `${edge.source}-${timestamp}`,
        target: `${edge.target}-${timestamp}`,
      }));

    addNodes(newNodes);
    addEdges(newEdges);
  }, [addEdges, addNodes, copiedEdges, copiedNodes, mousePosition]);

  const handleCut = useCallback(() => {
    handleCopy();
    setNodes((nodes) =>
      nodes.filter((node) => !selectedNodes.some((n) => n.id === node.id))
    );
    setEdges((edges) =>
      edges.filter((edge) => !selectedEdges.some((e) => e.id === edge.id))
    );
  }, [handleCopy, selectedEdges, selectedNodes, setEdges, setNodes]);

  useEffect(() => {
    const eventListeners = [
      { type: "copy", listener: handleCopy },
      { type: "paste", listener: handlePaste },
      { type: "cut", listener: handleCut },
    ];

    eventListeners.forEach(({ type, listener }) => {
      window.addEventListener(type, listener);
    });

    return () =>
      eventListeners.forEach(({ type, listener }) => {
        window.removeEventListener(type, listener);
      });
  }, [
    handleCopy,
    handlePaste,
    handleCut,
    copiedNodes,
    copiedEdges,
    selectedEdges,
    selectedNodes,
  ]);

  return (
    <Panel position="top-right">
      <div className="flex flex-col items-end justify-end pt-10">
        {selectedNodes.length > 0 && (
          <span className="text-xs">Selected: {selectedNodes.length}</span>
        )}
        {copiedNodes.length > 0 && (
          <span className="text-xs">
            Copied to clipboard: {copiedNodes.length}
          </span>
        )}
      </div>
    </Panel>
  );
};
export default SelectionDisplay;
