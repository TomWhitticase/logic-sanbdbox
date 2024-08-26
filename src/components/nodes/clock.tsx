import { Node, NodeProps, Position, useReactFlow } from "@xyflow/react";
import { useEffect } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { FiClock } from "react-icons/fi";
import { styleConstants } from "../../constants/styleConstants";
import { useInputValue } from "../../hooks/use-target-handle-values";
import { useUpdateSourceHandleValues } from "../../hooks/use-update-source-handle-values";
import { NodeData } from "../../types/node-data";
import { Container } from "../common/container";
import NodeHandle from "../handles/node-handle";
import NodeWrapper from "./node-wrapper";

const Clock = (
  props: NodeProps<Node<NodeData & { intervalPeriod: number }>>
) => {
  const { id, data } = props;

  const { updateNodeData } = useReactFlow();

  const input = useInputValue("input");
  const isOn = !input;

  const intervalPeriod = data.intervalPeriod || 1000;

  const { updateSourceHandleValue } = useUpdateSourceHandleValues(id);

  const outputValue =
    data.sourceHandleValues.find((v) => v.id === "output")?.value ?? false;

  useEffect(() => {
    if (!isOn) {
      updateSourceHandleValue("output", false);
      return;
    }
    const intervalId = setInterval(() => {
      updateSourceHandleValue("output", !outputValue);
    }, intervalPeriod);

    return () => clearInterval(intervalId);
  }, [id, outputValue, intervalPeriod, isOn]);

  return (
    <NodeWrapper {...props}>
      <NodeHandle
        state={input}
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
        <div className="flex flex-col items-center justify-center">
          <FiClock
            size={styleConstants.nodeIconSize}
            color={
              isOn
                ? outputValue
                  ? styleConstants.activeColor
                  : styleConstants.inactiveColor
                : styleConstants.disabledColor
            }
          />
          <div className="flex items-center justify-center gap-1">
            <button
              onClick={() =>
                updateNodeData(id, () => ({
                  intervalPeriod: intervalPeriod + 100,
                }))
              }
              className="flex items-center justify-center w-4 h-4 border-2 rounded-md "
            >
              <FaPlus />
            </button>
            {intervalPeriod}
            <button
              onClick={() =>
                updateNodeData(id, () => ({
                  intervalPeriod:
                    intervalPeriod > 100
                      ? intervalPeriod - 100
                      : intervalPeriod,
                }))
              }
              className="flex items-center justify-center w-4 h-4 border-2 rounded-md"
            >
              <FaMinus />
            </button>
          </div>
        </div>
      </Container>
    </NodeWrapper>
  );
};
export default Clock;
