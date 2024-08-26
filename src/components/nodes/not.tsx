import { Node, NodeProps, Position } from "@xyflow/react";
import React, { useEffect } from "react";
import NotIcon from "../../assets/not-icon.svg";
import { styleConstants } from "../../constants/styleConstants";
import { useInputValue } from "../../hooks/use-target-handle-values";
import { useUpdateSourceHandleValues } from "../../hooks/use-update-source-handle-values";
import { Container } from "../common/container";
import NodeHandle from "../handles/node-handle";
import NodeWrapper from "./node-wrapper";

const Not: React.FC<NodeProps<Node>> = (props) => {
  const { id } = props;

  const input = useInputValue("inputA");

  const { updateSourceHandleValue } = useUpdateSourceHandleValues(id);

  useEffect(() => {
    updateSourceHandleValue("sourceHandle", !input);
  }, [input]);

  return (
    <NodeWrapper {...props}>
      <NodeHandle
        state={input}
        type="target"
        position={Position.Left}
        id="targetHandle"
      />
      <Container>
        <img src={NotIcon} style={{ width: styleConstants.nodeIconSize }} />
      </Container>
      <NodeHandle
        state={!input}
        type="source"
        position={Position.Right}
        id="sourceHandle"
      />
    </NodeWrapper>
  );
};

export default Not;
