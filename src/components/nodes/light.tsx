import { Node, NodeProps, Position } from "@xyflow/react";
import { useInputValue } from "../../hooks/use-target-handle-values";
import { NodeData } from "../../types/node-data";
import { Container } from "../common/container";
import NodeHandle from "../handles/node-handle";
import NodeWrapper from "./node-wrapper";

/** A square indicator lamp, handy for building pixel grids */
const Light: React.FC<NodeProps<Node<NodeData>>> = (props) => {
  const isOn = useInputValue("input");
  return (
    <NodeWrapper {...props}>
      <NodeHandle
        state={isOn}
        type="target"
        position={Position.Left}
        id="input"
      />
      <Container variant="no-padding" className="p-1.5">
        <div
          className={`w-8 h-8 rounded-md border transition-all duration-150 ${
            isOn
              ? "bg-amber-300 border-amber-200 shadow-[0_0_18px_4px_rgba(251,191,36,0.55)]"
              : "bg-slate-800 border-white/5"
          }`}
        />
      </Container>
    </NodeWrapper>
  );
};

export default Light;
