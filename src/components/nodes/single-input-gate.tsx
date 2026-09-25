import { Node, NodeProps, Position } from "@xyflow/react";
import React, { useEffect } from "react";
import { styleConstants } from "../../constants/style-constants";
import { useInputValue } from "../../hooks/use-target-handle-values";
import { useUpdateSourceHandleValues } from "../../hooks/use-update-source-handle-values";
import { NodeData } from "../../types/node-data";
import { Container } from "../common/container";
import NodeHandle from "../handles/node-handle";
import NodeWrapper from "./node-wrapper";

export const createSingleInputGate = (
  label: string,
  iconSrc: string,
  evaluate: (input: boolean) => boolean
) => {
  const Gate: React.FC<NodeProps<Node<NodeData>>> = (props) => {
    const { id } = props;
    const { updateSourceHandleValue } = useUpdateSourceHandleValues(id);

    const input = useInputValue("input");
    const outputValue = evaluate(input);

    useEffect(() => {
      updateSourceHandleValue("output", outputValue);
    }, [outputValue, updateSourceHandleValue]);

    return (
      <NodeWrapper {...props}>
        <NodeHandle
          state={input}
          type="target"
          position={Position.Left}
          id="input"
        />
        <Container label={label}>
          <img
            src={iconSrc}
            alt={label}
            draggable={false}
            className="icon-img"
            style={{ width: styleConstants.nodeIconSize }}
          />
        </Container>
        <NodeHandle
          state={outputValue}
          type="source"
          position={Position.Right}
          id="output"
        />
      </NodeWrapper>
    );
  };
  Gate.displayName = label;
  return Gate;
};
