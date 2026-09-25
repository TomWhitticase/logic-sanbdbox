import { Panel, useReactFlow } from "@xyflow/react";
import React, { useEffect, useRef, useState } from "react";
import {
  LuChevronDown,
  LuHelpCircle,
  LuFilePlus2,
  LuFolderOpen,
  LuSave,
  LuSparkles,
} from "react-icons/lu";
import { useSearchParams } from "react-router-dom";
import { examples } from "../../constants/examples";
import { useLoadCircuit } from "../../hooks/use-load-circuit";
import { useUiStore } from "../../stores/ui-store";
import { loadFromDevice, saveToDevice } from "../../utils/save-and-open-utils";

const ToolbarButton = ({
  icon,
  label,
  showLabel = true,
  children,
  ...props
}: {
  icon: React.ReactNode;
  label: string;
  showLabel?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    type="button"
    title={label}
    aria-label={label}
    className="flex items-center gap-1.5 h-8 px-2.5 text-[13px] font-medium rounded-lg text-slate-300 transition-colors hover:text-white hover:bg-white/[0.07]"
    {...props}
  >
    {icon}
    {showLabel && <span className="hidden lg:inline">{label}</span>}
    {children}
  </button>
);

export const ExamplesMenu = ({ onClose }: { onClose: () => void }) => {
  const loadCircuit = useLoadCircuit();
  return (
    <div
      role="menu"
      className="absolute right-0 p-1.5 mt-2 w-72 glass rounded-xl top-full animate-pop-in z-10"
    >
      {examples.map((example) => (
        <button
          key={example.id}
          type="button"
          role="menuitem"
          className="flex flex-col w-full px-3 py-2 text-left transition-colors rounded-lg hover:bg-white/[0.07]"
          onClick={() => {
            loadCircuit(example, { confirm: true, message: `Loaded “${example.name}”` });
            onClose();
          }}
        >
          <span className="text-[13px] font-medium text-slate-100">
            {example.name}
          </span>
          <span className="text-xs text-slate-400">{example.description}</span>
        </button>
      ))}
    </div>
  );
};

export const Toolbar = () => {
  const { getNodes, getEdges } = useReactFlow();
  const loadCircuit = useLoadCircuit();
  const showToast = useUiStore((s) => s.showToast);
  const [, setSearchParams] = useSearchParams();
  const [examplesOpen, setExamplesOpen] = useState(false);
  const examplesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!examplesOpen) return;
    const close = (e: PointerEvent) => {
      if (!examplesRef.current?.contains(e.target as globalThis.Node))
        setExamplesOpen(false);
    };
    window.addEventListener("pointerdown", close);
    return () => window.removeEventListener("pointerdown", close);
  }, [examplesOpen]);

  const handleNew = () =>
    loadCircuit({ nodes: [], edges: [] }, { confirm: true, message: "Canvas cleared" });

  const handleSave = async () => {
    const saved = await saveToDevice({ nodes: getNodes(), edges: getEdges() });
    if (saved) showToast("Circuit saved");
  };

  const handleOpen = async () => {
    try {
      const data = await loadFromDevice();
      if (data) loadCircuit(data, { message: "Circuit opened" });
    } catch (error) {
      console.error("Error opening file:", error);
      showToast(
        error instanceof Error && error.message.includes("Logic Sandbox")
          ? error.message
          : "Couldn't open that file"
      );
    }
  };

  return (
    <Panel position="top-right" className="!m-3">
      <div className="flex items-center gap-0.5 p-1 glass rounded-xl">
        <div className="relative" ref={examplesRef}>
          <ToolbarButton
            icon={<LuSparkles size={15} className="text-emerald-300" />}
            label="Examples"
            aria-haspopup="menu"
            aria-expanded={examplesOpen}
            onClick={() => setExamplesOpen((open) => !open)}
          >
            <LuChevronDown
              size={12}
              className={`hidden lg:block text-slate-500 transition-transform ${
                examplesOpen ? "rotate-180" : ""
              }`}
            />
          </ToolbarButton>
          {examplesOpen && (
            <ExamplesMenu onClose={() => setExamplesOpen(false)} />
          )}
        </div>
        <div className="w-px h-5 mx-1 bg-white/10" />
        <ToolbarButton icon={<LuFilePlus2 size={15} />} label="New" onClick={handleNew} />
        <ToolbarButton icon={<LuFolderOpen size={15} />} label="Open" onClick={handleOpen} />
        <ToolbarButton icon={<LuSave size={15} />} label="Save" onClick={handleSave} />
        <div className="w-px h-5 mx-1 bg-white/10" />
        <ToolbarButton
          icon={<LuHelpCircle size={16} />}
          label="Help"
          showLabel={false}
          onClick={() => setSearchParams({ help: "about" })}
        />
      </div>
    </Panel>
  );
};

export default Toolbar;
