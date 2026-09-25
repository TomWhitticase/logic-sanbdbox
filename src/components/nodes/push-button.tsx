import { Node, NodeProps, Position } from "@xyflow/react";
import { useRef } from "react";
import { useUpdateSourceHandleValues } from "../../hooks/use-update-source-handle-values";
import { NodeData } from "../../types/node-data";
import { Container } from "../common/container";
import NodeHandle from "../handles/node-handle";
import NodeWrapper from "./node-wrapper";

// Shortest pulse a quick click produces, so it is always visible downstream
const minPulseMs = 150;

/** Momentary button: outputs true while it is held down */
const PushButton: React.FC<NodeProps<Node<NodeData>>> = (props) => {
  const { id, data } = props;

  const buttonValue =
    data.sourceHandleValues?.find((v) => v.id === "outputValue")?.value ??
    false;

  const { updateSourceHandleValue } = useUpdateSourceHandleValues(id);

  const pressedAt = useRef(0);

  const press = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    pressedAt.current = Date.now();
    updateSourceHandleValue("outputValue", true);
  };
  const release = () => {
    const remaining = minPulseMs - (Date.now() - pressedAt.current);
    setTimeout(
      () => updateSourceHandleValue("outputValue", false),
      Math.max(0, remaining)
    );
  };

  return (
    <NodeWrapper {...props}>
      <NodeHandle
        state={buttonValue}
        type="source"
        position={Position.Right}
        id={"outputValue"}
      />
      <Container label="PUSH">
        <button
          type="button"
          aria-label="Push button"
          onPointerDown={press}
          onPointerUp={release}
          onPointerCancel={release}
          className="flex items-center justify-center rounded-full nodrag w-9 h-9 bg-slate-800 border border-white/10 shadow-inner"
        >
          <span
            className={`block w-6 h-6 rounded-full transition-all duration-100 ${
              buttonValue
                ? "bg-emerald-400 scale-90 shadow-[0_0_14px_rgba(52,211,153,0.8)]"
                : "bg-gradient-to-b from-rose-400 to-rose-600 shadow-[0_2px_0_#7f1d1d]"
            }`}
          />
        </button>
      </Container>
    </NodeWrapper>
  );
};

export default PushButton;
