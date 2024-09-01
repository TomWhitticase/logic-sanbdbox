import { Node, NodeProps, Position } from "@xyflow/react";
import React, { useEffect } from "react";
import NotIcon from "../../assets/not-icon.svg";
import { styleConstants } from "../../constants/style-constants";
import { useInputValue } from "../../hooks/use-target-handle-values";
import { useUpdateSourceHandleValues } from "../../hooks/use-update-source-handle-values";
import { Container } from "../common/container";
import NodeHandle from "../handles/node-handle";
import NodeWrapper from "./node-wrapper";
import { NodeData } from "../../types/node-data";

const Not: React.FC<NodeProps<Node<NodeData>>> = (props) => {
  const { id } = props;

  const input = useInputValue("input");

  const { updateSourceHandleValue } = useUpdateSourceHandleValues(id);

  useEffect(() => {
    updateSourceHandleValue("output", !input);
  }, [input]);

  return (
    <NodeWrapper {...props}>
      <NodeHandle
        state={input}
        type="target"
        position={Position.Left}
        id="input"
      />
      <Container>
        <img src={NotIcon} style={{ width: styleConstants.nodeIconSize }} />
      </Container>
      <NodeHandle
        state={!input}
        type="source"
        position={Position.Right}
        id="output"
      />
    </NodeWrapper>
  );
};

export default Not;
