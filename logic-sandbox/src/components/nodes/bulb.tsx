import { Node, NodeProps, Position } from "@xyflow/react";
import React from "react";
import { IoBulbOutline } from "react-icons/io5";
import { styleConstants } from "../../constants/styleConstants";
import { useTargetHandleValues } from "../../hooks/use-target-handle-values";
import { NodeData } from "../../types/node-data";
import { Container } from "../common/container";
import NodeHandle from "../handles/node-handle";
import NodeWrapper from "./node-wrapper";

const Bulb: React.FC<NodeProps<Node<NodeData>>> = (props) => {
  const handleValues = useTargetHandleValues("targetHandle");

  const isOn = handleValues.some((h) => h);

  return (
    <NodeWrapper {...props}>
      <NodeHandle type="target" position={Position.Left} id="targetHandle" />
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
