import { Edge, Node, Panel, useReactFlow, useStore } from "@xyflow/react";
import { useCallback, useEffect, useRef } from "react";
import { useUiStore } from "../../stores/ui-store";

const isEditableTarget = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.isContentEditable ||
    ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));

/**
 * Copy, cut and paste for the selection, plus a status bar showing the
 * circuit size, the selection and short notifications.
 */
const SelectionDisplay = () => {
  const { getNodes, getEdges, setNodes, addNodes, addEdges, deleteElements, screenToFlowPosition } =
    useReactFlow();
  const { toast, copiedCount, showToast, setCopiedCount } = useUiStore();

  const nodeCount = useStore((s) => s.nodes.length);
  const edgeCount = useStore((s) => s.edges.length);
  const selectedCount = useStore(
    (s) => s.nodes.filter((n) => n.selected).length
  );

  const clipboard = useRef<{
    nodes: Node[];
    edges: Edge[];
    origin: { x: number; y: number };
  } | null>(null);
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const copy = useCallback(() => {
    const nodes = getNodes().filter((n) => n.selected);
    if (nodes.length === 0) return false;
    const ids = new Set(nodes.map((n) => n.id));
    // Only keep wires that are fully inside the selection
    const edges = getEdges().filter(
      (e) => ids.has(e.source) && ids.has(e.target)
    );
    clipboard.current = {
      nodes: structuredClone(nodes),
      edges: structuredClone(edges),
      origin: screenToFlowPosition(mouse.current),
    };
    setCopiedCount(nodes.length);
    return true;
  }, [getNodes, getEdges, screenToFlowPosition, setCopiedCount]);

  const paste = useCallback(() => {
    const data = clipboard.current;
    if (!data) return;
    const suffix = Date.now().toString(36);
    const newId = (id: string) => `${id}-${suffix}`;
    const position = screenToFlowPosition(mouse.current);

    setNodes((nodes) =>
      nodes.map((n) => (n.selected ? { ...n, selected: false } : n))
    );
    addNodes(
      data.nodes.map((node) => ({
        ...node,
        id: newId(node.id),
        selected: true,
        dragging: false,
        position: {
          x: node.position.x - data.origin.x + position.x,
          y: node.position.y - data.origin.y + position.y,
        },
      }))
    );
    addEdges(
      data.edges.map((edge) => ({
        ...edge,
        id: newId(edge.id),
        source: newId(edge.source),
        target: newId(edge.target),
        selected: false,
      }))
    );
    showToast(
      `Pasted ${data.nodes.length} component${data.nodes.length === 1 ? "" : "s"}`
    );
  }, [addEdges, addNodes, setNodes, screenToFlowPosition, showToast]);

  useEffect(() => {
    const onCopy = (e: ClipboardEvent) => {
      if (isEditableTarget(e.target)) return;
      if (copy()) {
        e.preventDefault();
        const count = useUiStore.getState().copiedCount;
        showToast(`Copied ${count} component${count === 1 ? "" : "s"}`);
      }
    };
    const onCut = (e: ClipboardEvent) => {
      if (isEditableTarget(e.target)) return;
      if (copy()) {
        e.preventDefault();
        const selected = getNodes().filter((n) => n.selected);
        deleteElements({ nodes: selected.map(({ id }) => ({ id })) });
        showToast(`Cut ${selected.length} component${selected.length === 1 ? "" : "s"}`);
      }
    };
    const onPaste = (e: ClipboardEvent) => {
      if (isEditableTarget(e.target)) return;
      e.preventDefault();
      paste();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (isEditableTarget(e.target)) return;
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "a") {
        e.preventDefault();
        setNodes((nodes) => nodes.map((n) => ({ ...n, selected: true })));
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("copy", onCopy);
    window.addEventListener("cut", onCut);
    window.addEventListener("paste", onPaste);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("copy", onCopy);
      window.removeEventListener("cut", onCut);
      window.removeEventListener("paste", onPaste);
    };
  }, [copy, paste, getNodes, setNodes, deleteElements, showToast]);

  const stats = [
    `${nodeCount} component${nodeCount === 1 ? "" : "s"}`,
    `${edgeCount} wire${edgeCount === 1 ? "" : "s"}`,
    selectedCount > 0 && `${selectedCount} selected`,
    copiedCount > 0 && `${copiedCount} on clipboard`,
  ].filter(Boolean);

  return (
    <Panel position="bottom-center" className="!mb-4 pointer-events-none">
      <div className="flex flex-col items-center gap-2">
        {toast && (
          <div
            key={toast.id}
            role="status"
            className="px-3.5 py-2 text-[13px] font-medium text-white glass rounded-xl animate-pop-in"
          >
            {toast.message}
          </div>
        )}
        {nodeCount > 0 && (
          <div className="flex items-center gap-2 px-3 py-1.5 text-[11px] font-mono text-slate-400 glass rounded-full whitespace-nowrap">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full opacity-60 animate-ping bg-emerald-400" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-400" />
            </span>
            {stats.map((stat, i) => (
              <span
                key={i}
                className={`items-center gap-2 ${i > 1 ? "hidden sm:flex" : "flex"}`}
              >
                {i > 0 && <span className="text-slate-600">·</span>}
                {stat}
              </span>
            ))}
          </div>
        )}
      </div>
    </Panel>
  );
};
export default SelectionDisplay;
