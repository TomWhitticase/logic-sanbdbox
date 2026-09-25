import { Node, NodeProps, Position } from "@xyflow/react";
import { useUpdateSourceHandleValues } from "../../hooks/use-update-source-handle-values";
import { NodeData } from "../../types/node-data";
import { Container } from "../common/container";
import NodeHandle from "../handles/node-handle";
import NodeWrapper from "./node-wrapper";

const Switch: React.FC<NodeProps<Node<NodeData>>> = (props) => {
  const { id, data } = props;

  const switchValue =
    data.sourceHandleValues?.find((v) => v.id === "switchValue")?.value ??
    false;

  const { updateSourceHandleValue } = useUpdateSourceHandleValues(id);

  const toggleSwitch = () => {
    updateSourceHandleValue("switchValue", !switchValue);
  };

  return (
    <NodeWrapper {...props}>
      <NodeHandle
        state={switchValue}
        type="source"
        position={Position.Right}
        id={"switchValue"}
      />
      <Container label={switchValue ? "ON" : "OFF"}>
        <button
          type="button"
          role="switch"
          aria-checked={switchValue}
          aria-label="Toggle switch"
          onClick={toggleSwitch}
          className={`nodrag relative w-10 h-6 rounded-full border transition-colors duration-150 ${
            switchValue
              ? "bg-emerald-400/90 border-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.6)]"
              : "bg-slate-700 border-white/10"
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-[18px] h-[18px] rounded-full bg-white shadow transition-transform duration-150 ${
              switchValue ? "translate-x-4" : ""
            }`}
          />
        </button>
      </Container>
    </NodeWrapper>
  );
};

export default Switch;
