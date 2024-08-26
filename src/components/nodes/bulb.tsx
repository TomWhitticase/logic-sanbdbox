import { Node, NodeProps, Position } from "@xyflow/react";
import React from "react";
import { IoBulbOutline } from "react-icons/io5";
import { styleConstants } from "../../constants/styleConstants";
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
        <div>
          <IoBulbOutline
            size={styleConstants.nodeIconSize}
            color={isOn ? "orange" : "black"}
          />
        </div>
      </Container>
    </NodeWrapper>
  );
};

export default Bulb;
