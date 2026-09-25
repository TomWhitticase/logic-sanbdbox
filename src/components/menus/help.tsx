import { useEffect } from "react";
import { LuX } from "react-icons/lu";
import { useSearchParams } from "react-router-dom";
import { localStorageKeys } from "../../constants/local-storage-keys";
import {
  isNodeType,
  nodeDefinitions,
  NodeType,
} from "../../constants/node-types";
import Key from "../common/key";
import { NodePreview } from "../common/node-preview";

const shortcuts = [
  { keys: [<kbd className="kbd">Drag</kbd>], action: "Add a component from the panel" },
  { keys: [<kbd className="kbd">Drag</kbd>], action: "Wire an output to an input" },
  { keys: [<kbd className="kbd">Right click</kbd>], action: "Rotate, duplicate, delete…" },
  { keys: [<kbd className="kbd">Shift</kbd>, <kbd className="kbd">Drag</kbd>], action: "Select several components" },
  { keys: [<Key keyboardKey="selectAll" />], action: "Select everything" },
  { keys: [<Key keyboardKey="copy" />, <Key keyboardKey="paste" />], action: "Copy and paste at the cursor" },
  { keys: [<Key keyboardKey="cut" />], action: "Cut the selection" },
  { keys: [<kbd className="kbd">Del</kbd>], action: "Delete the selection" },
];

const MainHelp = () => (
  <>
    <div className="flex items-center gap-2 mb-1 text-[11px] font-semibold tracking-[0.16em] uppercase text-emerald-300">
      Welcome
    </div>
    <h2 className="mb-3 text-2xl font-semibold tracking-tight text-white">
      Logic Sandbox
    </h2>
    <p className="mb-5 leading-relaxed text-slate-300">
      A playground for building interactive digital circuits. Drop in switches,
      gates and displays, wire them up and watch the signals flow in real time.
      Not sure where to start? Try one of the <strong>Examples</strong> in the
      toolbar.
    </p>
    <div className="mb-5 overflow-hidden border rounded-xl border-white/5">
      {shortcuts.map(({ keys, action }, i) => (
        <div
          key={i}
          className="flex items-center justify-between gap-4 px-3 py-2 text-sm odd:bg-white/[0.02]"
        >
          <span className="text-slate-300">{action}</span>
          <span className="flex gap-1 shrink-0">
            {keys.map((key, j) => (
              <span key={j}>{key}</span>
            ))}
          </span>
        </div>
      ))}
    </div>
    <p className="text-sm text-slate-400">
      Your circuit is saved in this browser automatically. Created by{" "}
      <a
        href="https://tomwhitticase.com"
        target="_blank"
        rel="noreferrer"
        className="font-medium text-emerald-300 hover:text-emerald-200 hover:underline"
      >
        Tom Whitticase
      </a>
      .
    </p>
  </>
);

const NodeHelp = ({ type }: { type: NodeType }) => {
  const { displayName, category, description } = nodeDefinitions[type];
  return (
    <>
      <div className="mb-1 text-[11px] font-semibold tracking-[0.16em] uppercase text-emerald-300">
        {category}
      </div>
      <h2 className="mb-3 text-2xl font-semibold tracking-tight text-white">
        {displayName}
      </h2>
      <p className="mb-5 leading-relaxed text-slate-300 [&_strong]:text-white [&_strong]:font-semibold">
        {description}
      </p>
      <div
        className="flex items-center justify-center py-10 border rounded-xl border-white/5 bg-black/30"
        style={{
          backgroundImage:
            "radial-gradient(rgba(148,163,184,0.15) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      >
        <div className="scale-125">
          <NodePreview type={type} />
        </div>
      </div>
    </>
  );
};

export const Help = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Show help modal on first visit
  useEffect(() => {
    if (localStorage.getItem(localStorageKeys.readHelpBefore) !== "true")
      setSearchParams({ help: "about" }, { replace: true });
  }, [setSearchParams]);

  const help = searchParams.get("help");

  const handleCloseModal = () => {
    localStorage.setItem(localStorageKeys.readHelpBefore, "true");
    setSearchParams({});
  };

  useEffect(() => {
    if (!help) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        localStorage.setItem(localStorageKeys.readHelpBefore, "true");
        setSearchParams({});
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [help, setSearchParams]);

  if (!help) return null;

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={handleCloseModal}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-lg p-7 glass rounded-2xl animate-pop-in max-h-[calc(100vh-32px)] overflow-y-auto"
        style={{ background: "rgba(13, 18, 30, 0.96)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {isNodeType(help) ? <NodeHelp type={help} /> : <MainHelp />}
        <button
          type="button"
          aria-label="Close"
          onClick={handleCloseModal}
          className="absolute p-1.5 transition-colors rounded-lg top-4 right-4 text-slate-400 hover:text-white hover:bg-white/5"
        >
          <LuX size={18} />
        </button>
        <div className="flex justify-end mt-6">
          <button
            type="button"
            onClick={handleCloseModal}
            className="px-4 py-2 text-sm font-semibold transition-all rounded-xl text-emerald-950 bg-gradient-to-b from-emerald-300 to-emerald-400 hover:from-emerald-200 hover:to-emerald-300 shadow-lg shadow-emerald-500/20"
          >
            {help === "about" ? "Start building" : "Got it"}
          </button>
        </div>
      </div>
    </div>
  );
};
