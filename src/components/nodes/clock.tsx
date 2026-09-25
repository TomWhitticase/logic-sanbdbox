import { Node, NodeProps, Position, useReactFlow } from "@xyflow/react";
import { useEffect } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { FiClock } from "react-icons/fi";
import { styleConstants } from "../../constants/style-constants";
import { useInputValue } from "../../hooks/use-target-handle-values";
import { useUpdateSourceHandleValues } from "../../hooks/use-update-source-handle-values";
import { NodeData } from "../../types/node-data";
import { Container } from "../common/container";
import NodeHandle from "../handles/node-handle";
import NodeWrapper from "./node-wrapper";

const minPeriod = 100;
const periodStep = 100;

const Clock: React.FC<
  NodeProps<Node<NodeData & { intervalPeriod?: number }>>
> = (props) => {
  const { id, data } = props;

  const { updateNodeData } = useReactFlow();

  // A true signal on the input pauses the clock
  const paused = useInputValue("input");
  const running = !paused;

  const intervalPeriod = data.intervalPeriod || 1000;

  const { updateSourceHandleValue } = useUpdateSourceHandleValues(id);

  const outputValue =
    data.sourceHandleValues?.find((v) => v.id === "output")?.value ?? false;

  useEffect(() => {
    if (!running) {
      updateSourceHandleValue("output", false);
      return;
    }
    const timeoutId = setTimeout(() => {
      updateSourceHandleValue("output", !outputValue);
    }, intervalPeriod);

    return () => clearTimeout(timeoutId);
  }, [outputValue, intervalPeriod, running, updateSourceHandleValue]);

  const setPeriod = (period: number) =>
    updateNodeData(id, { intervalPeriod: Math.max(minPeriod, period) });

  const stepButton =
    "nodrag flex items-center justify-center w-5 h-5 rounded-md bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white transition-colors";

  return (
    <NodeWrapper {...props}>
      <NodeHandle
        state={paused}
        type="target"
        position={Position.Left}
        id="input"
      />
      <NodeHandle
        state={outputValue}
        type="source"
        position={Position.Right}
        id="output"
      />
      <Container>
        <FiClock
          size={styleConstants.nodeIconSize}
          color={
            running
              ? outputValue
                ? styleConstants.activeColor
                : "#e2e8f0"
              : styleConstants.disabledColor
          }
          style={
            running && outputValue
              ? { filter: `drop-shadow(0 0 6px ${styleConstants.activeColor})` }
              : undefined
          }
        />
        <div className="flex items-center justify-center gap-1.5">
          <button
            type="button"
            aria-label="Faster"
            onClick={() => setPeriod(intervalPeriod - periodStep)}
            className={stepButton}
          >
            <FaMinus size={8} />
          </button>
          <span className="font-mono text-[10px] text-slate-300 tabular-nums w-10 text-center">
            {intervalPeriod >= 1000
              ? `${(intervalPeriod / 1000).toFixed(1)}s`
              : `${intervalPeriod}ms`}
          </span>
          <button
            type="button"
            aria-label="Slower"
            onClick={() => setPeriod(intervalPeriod + periodStep)}
            className={stepButton}
          >
            <FaPlus size={8} />
          </button>
        </div>
      </Container>
    </NodeWrapper>
  );
};
export default Clock;
