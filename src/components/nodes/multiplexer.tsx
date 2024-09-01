import { Node, NodeProps, Position } from "@xyflow/react";
import React, { useEffect } from "react";
import multiplexerIcon from "../../assets/multiplexer-icon.svg";
import { styleConstants } from "../../constants/style-constants";
import { useInputValue } from "../../hooks/use-target-handle-values";
import { Container } from "../common/container";
import NodeHandle from "../handles/node-handle";
import NodeWrapper from "./node-wrapper";
import { useUpdateSourceHandleValues } from "../../hooks/use-update-source-handle-values";
import { NodeData } from "../../types/node-data";

const Multiplexer: React.FC<NodeProps<Node<NodeData>>> = (props) => {
  const { id } = props;
  const inputA = useInputValue("inputA");
  const inputB = useInputValue("inputB");
  const inputC = useInputValue("inputC");
  const inputD = useInputValue("inputD");

  const inputControlA = useInputValue("inputControlA");
  const inputControlB = useInputValue("inputControlB");

  const { updateSourceHandleValue } = useUpdateSourceHandleValues(id);

  // Get multiplexer output value based on control handle values
  const outputValue =
    {
      "false,false": inputA,
      "false,true": inputB,
      "true,false": inputC,
      "true,true": inputD,
    }[[inputControlA, inputControlB].join(",")] ?? false;

  useEffect(() => {
    updateSourceHandleValue("output", outputValue);
  }, [outputValue, id]);

  return (
    <NodeWrapper {...props}>
      <Container variant="no-padding">
        <div className="relative flex flex-col items-center justify-center w-14 h-14">
          <div className="absolute top-[20%] left-0">
            <NodeHandle
              state={inputA}
              type="target"
              position={Position.Left}
              id="inputA"
            />
          </div>
          <div className="absolute top-[40%] left-0">
            <NodeHandle
              state={inputB}
              type="target"
              position={Position.Left}
              id="inputB"
            />
          </div>
          <div className="absolute top-[60%] left-0">
            <NodeHandle
              state={inputC}
              type="target"
              position={Position.Left}
              id="inputC"
            />
          </div>
          <div className="absolute top-[80%] left-0">
            <NodeHandle
              state={inputD}
              type="target"
              position={Position.Left}
              id="inputD"
            />
          </div>
          <div className={`absolute left-[35%] bottom-0`}>
            <NodeHandle
              state={inputControlA}
              type="target"
              position={Position.Bottom}
              id="inputControlA"
            />
          </div>
          <div className="absolute right-[35%] bottom-0">
            <NodeHandle
              state={inputControlB}
              type="target"
              position={Position.Bottom}
              id="inputControlB"
            />
          </div>
          <div className="absolute right-0 top-[50%]">
            <NodeHandle
              state={outputValue}
              type="source"
              position={Position.Right}
              id="output"
            />
          </div>
          <img
            src={multiplexerIcon}
            style={{ width: styleConstants.nodeIconSize }}
          />
        </div>
      </Container>
    </NodeWrapper>
  );
};

export default Multiplexer;
