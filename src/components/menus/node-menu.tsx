import { Panel, useReactFlow } from "@xyflow/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { LuPanelLeftClose, LuPanelLeftOpen, LuSearch } from "react-icons/lu";
import {
  nodeCategories,
  nodeDefinitionsArray,
  NodeType,
} from "../../constants/node-types";
import { NodePreview } from "../common/node-preview";

const dragThreshold = 4;

type DragState = {
  type: NodeType;
  startX: number;
  startY: number;
  dragging: boolean;
};

const Logo = () => (
  <svg viewBox="0 0 32 32" className="w-8 h-8 shrink-0" aria-hidden>
    <rect width="32" height="32" rx="9" fill="url(#logo-bg)" />
    <defs>
      <linearGradient id="logo-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#34d399" />
        <stop offset="1" stopColor="#0ea5e9" />
      </linearGradient>
    </defs>
    <path
      d="M10 9h5.5a7 7 0 0 1 0 14H10z"
      fill="none"
      stroke="#04121a"
      strokeWidth="2.4"
      strokeLinejoin="round"
    />
    <path
      d="M5 13h5M5 19h5M22.5 16H27"
      stroke="#04121a"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
  </svg>
);

const NodeMenu: React.FC = () => {
  const { addNodes, setNodes, screenToFlowPosition, getViewport } =
    useReactFlow();

  // Start collapsed on small screens so the canvas stays usable
  const [menuOpen, setMenuOpen] = useState(() => window.innerWidth >= 768);
  const [search, setSearch] = useState("");
  const [drag, setDrag] = useState<DragState | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const addNode = useCallback(
    (type: NodeType, screenPosition?: { x: number; y: number }) => {
      let position;
      if (screenPosition) {
        // Centre the new node on the cursor, like the drag preview
        const rect = previewRef.current?.getBoundingClientRect();
        position = screenToFlowPosition({
          x: screenPosition.x - (rect?.width ?? 0) / 2,
          y: screenPosition.y - (rect?.height ?? 0) / 2,
        });
      } else {
        const jitter = () => (Math.random() - 0.5) * 60;
        position = screenToFlowPosition({
          x: window.innerWidth / 2 + jitter(),
          y: window.innerHeight / 2 + jitter(),
        });
      }

      const id = `${type}-${Date.now().toString(36)}-${Math.random()
        .toString(36)
        .slice(2, 6)}`;
      // Deselect everything so the new node is the only selection
      setNodes((nodes) =>
        nodes.map((n) => (n.selected ? { ...n, selected: false } : n))
      );
      addNodes({
        id,
        type,
        data: { sourceHandleValues: [], rotation: 0 },
        position,
        selected: true,
      });
    },
    [addNodes, setNodes, screenToFlowPosition]
  );

  const movePreview = (x: number, y: number) => {
    const preview = previewRef.current;
    if (!preview) return;
    preview.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${
      getViewport().zoom
    })`;
  };

  useEffect(() => {
    if (!drag) return;

    const handleMove = (e: PointerEvent) => {
      const moved =
        Math.abs(e.clientX - drag.startX) > dragThreshold ||
        Math.abs(e.clientY - drag.startY) > dragThreshold;
      if (moved && !drag.dragging) {
        setDrag({ ...drag, dragging: true });
      }
      movePreview(e.clientX, e.clientY);
    };

    const handleUp = (e: PointerEvent) => {
      if (!drag.dragging) {
        // A plain click adds the node to the middle of the screen
        addNode(drag.type);
      } else {
        const dropTarget = document.elementFromPoint(e.clientX, e.clientY);
        // Anywhere on the canvas counts, just not on top of a panel or menu
        const overCanvas =
          !!dropTarget?.closest(".react-flow") &&
          !dropTarget.closest(".react-flow__panel, [role=menu], [role=dialog]");
        if (overCanvas) addNode(drag.type, { x: e.clientX, y: e.clientY });
      }
      setDrag(null);
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrag(null);
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
      window.removeEventListener("keydown", handleKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drag, addNode]);

  const startDrag = (type: NodeType, e: React.PointerEvent) => {
    if (e.button !== 0) return;
    e.preventDefault();
    window.getSelection()?.removeAllRanges();
    setDrag({ type, startX: e.clientX, startY: e.clientY, dragging: false });
  };

  const query = search.trim().toLowerCase();
  const filtered = nodeDefinitionsArray.filter(
    (definition) =>
      !query ||
      definition.displayName.toLowerCase().includes(query) ||
      definition.category.toLowerCase().includes(query)
  );

  return (
    <>
      {drag?.dragging && (
        <div
          ref={(el) => {
            (previewRef as React.MutableRefObject<HTMLDivElement | null>).current =
              el;
            if (el) movePreview(drag.startX, drag.startY);
          }}
          className="fixed top-0 left-0 opacity-80 pointer-events-none z-[1000] origin-center"
          style={{ filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.6))" }}
        >
          <NodePreview type={drag.type} />
        </div>
      )}
      <Panel position="top-left" className="!m-3">
        {menuOpen ? (
          <aside className="glass flex flex-col select-none w-[268px] max-h-[calc(100vh-24px)] rounded-2xl animate-pop-in">
            <header className="flex items-center gap-3 px-4 pt-4 pb-3">
              <Logo />
              <div className="flex-1 min-w-0">
                <h1 className="text-sm font-semibold leading-tight text-white">
                  Logic Sandbox
                </h1>
                <p className="text-[11px] text-slate-400 leading-tight">
                  Build &amp; simulate circuits
                </p>
              </div>
              <button
                type="button"
                aria-label="Collapse component panel"
                title="Collapse"
                className="p-1.5 transition-colors rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
                onClick={() => setMenuOpen(false)}
              >
                <LuPanelLeftClose size={16} />
              </button>
            </header>

            <div className="px-4 pb-3">
              <label className="flex items-center gap-2 px-3 py-2 transition-colors border rounded-xl bg-black/20 border-white/10 focus-within:border-emerald-400/50 focus-within:ring-2 focus-within:ring-emerald-400/10">
                <LuSearch size={14} className="text-slate-500" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search components"
                  className="w-full text-sm bg-transparent outline-none placeholder:text-slate-500"
                />
              </label>
            </div>

            <div className="flex flex-col flex-1 min-h-0 gap-4 px-4 pb-4 overflow-y-auto">
              {nodeCategories.map((category) => {
                const items = filtered.filter((d) => d.category === category);
                if (items.length === 0) return null;
                return (
                  <section key={category}>
                    <h2 className="mb-2 text-[10px] font-semibold tracking-[0.16em] uppercase text-slate-500">
                      {category}
                    </h2>
                    <div className="grid grid-cols-3 gap-1.5">
                      {items.map(({ id, displayName, icon }) => (
                        <button
                          key={id}
                          type="button"
                          title={`Drag or click to add ${displayName}`}
                          onPointerDown={(e) => startDrag(id, e)}
                          className="group flex flex-col items-center justify-center gap-1.5 h-[68px] px-1 rounded-xl border border-white/5 bg-white/[0.03] text-slate-300 cursor-grab active:cursor-grabbing select-none transition-all hover:bg-white/[0.07] hover:border-emerald-400/30 hover:text-white hover:-translate-y-px"
                        >
                          <span className="flex items-center justify-center h-7 transition-transform group-hover:scale-110 [&_img]:!w-6 [&_svg]:w-6 [&_svg]:h-6">
                            {icon}
                          </span>
                          <span className="text-[10.5px] font-medium leading-none text-center">
                            {displayName}
                          </span>
                        </button>
                      ))}
                    </div>
                  </section>
                );
              })}
              {filtered.length === 0 && (
                <p className="py-6 text-sm text-center text-slate-500">
                  No components match “{search}”
                </p>
              )}
            </div>

            <footer className="px-4 py-3 text-[11px] border-t text-slate-500 border-white/5">
              Drag onto the canvas, or click to drop in the centre.
            </footer>
          </aside>
        ) : (
          <button
            type="button"
            aria-label="Open component panel"
            title="Components"
            className="flex items-center gap-2 py-2 pl-2 pr-3 text-sm font-medium transition-colors glass rounded-xl text-slate-200 hover:text-white animate-pop-in"
            onClick={() => setMenuOpen(true)}
          >
            <Logo />
            <LuPanelLeftOpen size={16} className="text-slate-400" />
          </button>
        )}
      </Panel>
    </>
  );
};

export default NodeMenu;
