import { Node, NodeProps, Position } from "@xyflow/react";
import React, { useEffect } from "react";
import { IconType } from "react-icons";
import { styleConstants } from "../../constants/style-constants";
import { useInputValue } from "../../hooks/use-target-handle-values";
import { useUpdateSourceHandleValues } from "../../hooks/use-update-source-handle-values";
import { NodeData } from "../../types/node-data";
import { Container } from "../common/container";
import NodeHandle from "../handles/node-handle";
import NodeWrapper from "./node-wrapper";

export const createTwoInputGate = (
  label: string,
  Icon: IconType,
  evaluate: (a: boolean, b: boolean) => boolean
) => {
  const Gate: React.FC<NodeProps<Node<NodeData>>> = (props) => {
    const { id } = props;
    const { updateSourceHandleValue } = useUpdateSourceHandleValues(id);

    const inputA = useInputValue("inputA");
    const inputB = useInputValue("inputB");
    const outputValue = evaluate(inputA, inputB);

    useEffect(() => {
      updateSourceHandleValue("output", outputValue);
    }, [outputValue, updateSourceHandleValue]);

    return (
      <NodeWrapper {...props}>
        <div className="flex">
          <div className="relative flex flex-col">
            <div className="absolute top-3">
              <NodeHandle
                state={inputA}
                type="target"
                position={Position.Left}
                id="inputA"
              />
            </div>
            <div className="absolute bottom-3">
              <NodeHandle
                state={inputB}
                type="target"
                position={Position.Left}
                id="inputB"
              />
            </div>
          </div>
          <Container label={label}>
            <Icon
              size={styleConstants.nodeIconSize}
              className={outputValue ? "text-emerald-300" : "text-slate-200"}
            />
          </Container>
          <NodeHandle
            state={outputValue}
            type="source"
            position={Position.Right}
            id="output"
          />
        </div>
      </NodeWrapper>
    );
  };
  Gate.displayName = label;
  return Gate;
};
