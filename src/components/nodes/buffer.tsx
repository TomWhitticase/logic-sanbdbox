import { Node, NodeProps, Position } from "@xyflow/react";
import React, { useEffect } from "react";
import BufferIcon from "../../assets/buffer-icon.svg";
import { styleConstants } from "../../constants/styleConstants";
import { useTargetHandleValues } from "../../hooks/use-target-handle-values";
import { useUpdateSourceHandleValues } from "../../hooks/use-update-source-handle-values";
import { NodeData } from "../../types/node-data";
import { Container } from "../common/container";
import NodeHandle from "../handles/node-handle";
import NodeWrapper from "./node-wrapper";

const Buffer: React.FC<NodeProps<Node<NodeData>>> = (props) => {
  const { id } = props;

  const targetHandleValues = useTargetHandleValues("targetHandle");
  const inputValue = targetHandleValues.some((v) => v);

  const { updateSourceHandleValue } = useUpdateSourceHandleValues(id);

  useEffect(() => {
    updateSourceHandleValue("sourceHandle", inputValue);
  }, [inputValue]);

  return (
    <NodeWrapper {...props}>
      <NodeHandle type="target" position={Position.Left} id="targetHandle" />
      <Container>
        <img
          src={BufferIcon}
          alt="buffer-icon"
          style={{ width: styleConstants.nodeIconSize }}
        />
      </Container>
      <NodeHandle type="source" position={Position.Right} id="sourceHandle" />
    </NodeWrapper>
  );
};

export default Buffer;
