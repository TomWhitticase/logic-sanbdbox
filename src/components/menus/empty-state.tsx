import { useStore } from "@xyflow/react";
import { LuMousePointerClick, LuSparkles } from "react-icons/lu";
import { examples } from "../../constants/examples";
import { useLoadCircuit } from "../../hooks/use-load-circuit";

/** Shown in the middle of the canvas while it has no components */
export const EmptyState = () => {
  const isEmpty = useStore((s) => s.nodes.length === 0);
  const loadCircuit = useLoadCircuit();

  if (!isEmpty) return null;

  return (
    <div className="absolute inset-0 z-[4] flex items-center justify-center p-6 pointer-events-none">
      <div className="flex flex-col items-center max-w-md text-center animate-fade-in">
        <div className="flex items-center justify-center mb-5 border w-14 h-14 rounded-2xl border-emerald-400/20 bg-emerald-400/10 text-emerald-300 shadow-[0_0_40px_rgba(52,211,153,0.15)]">
          <LuMousePointerClick size={26} />
        </div>
        <h2 className="mb-2 text-xl font-semibold tracking-tight text-white">
          Start building a circuit
        </h2>
        <p className="mb-6 text-sm leading-relaxed text-slate-400">
          Drag components from the panel onto the canvas, then connect an
          output to an input to wire them together. Or begin from an example:
        </p>
        <div className="flex flex-wrap justify-center gap-2 pointer-events-auto">
          {examples.map((example) => (
            <button
              key={example.id}
              type="button"
              onClick={() =>
                loadCircuit(example, { message: `Loaded “${example.name}”` })
              }
              className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium transition-all border rounded-full text-slate-200 border-white/10 bg-white/[0.04] hover:border-emerald-400/40 hover:bg-emerald-400/10 hover:text-white"
            >
              <LuSparkles size={13} className="text-emerald-300" />
              {example.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
