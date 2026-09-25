import { Node, NodeProps, Position } from "@xyflow/react";
import { IoBulb, IoBulbOutline } from "react-icons/io5";
import { styleConstants } from "../../constants/style-constants";
import { useInputValue } from "../../hooks/use-target-handle-values";
import { NodeData } from "../../types/node-data";
import { Container } from "../common/container";
import NodeHandle from "../handles/node-handle";
import NodeWrapper from "./node-wrapper";

const Bulb: React.FC<NodeProps<Node<NodeData>>> = (props) => {
  const isOn = useInputValue("input");
  return (
    <NodeWrapper {...props}>
      <NodeHandle
        state={isOn}
        type="target"
        position={Position.Left}
        id="input"
      />
      <Container>
        <div
          className="flex items-center justify-center w-9 h-9 transition-all duration-150 rounded-full"
          style={{
            background: isOn
              ? "radial-gradient(circle, rgba(251,191,36,0.35) 0%, rgba(251,191,36,0) 70%)"
              : undefined,
          }}
        >
          {isOn ? (
            <IoBulb
              size={styleConstants.nodeIconSize}
              color={styleConstants.lampColor}
              style={{
                filter: `drop-shadow(0 0 8px ${styleConstants.lampColor})`,
              }}
            />
          ) : (
            <IoBulbOutline
              size={styleConstants.nodeIconSize}
              className="text-slate-500"
            />
          )}
        </div>
      </Container>
    </NodeWrapper>
  );
};

export default Bulb;
