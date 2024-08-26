import { Node, NodeProps, Position } from "@xyflow/react";
import React, { useEffect } from "react";
import demultiplexerIcon from "../../assets/demultiplexer-icon.svg";
import { styleConstants } from "../../constants/styleConstants";
import { useInputValue } from "../../hooks/use-target-handle-values";
import { Container } from "../common/container";
import NodeHandle from "../handles/node-handle";
import NodeWrapper from "./node-wrapper";
import { useUpdateSourceHandleValues } from "../../hooks/use-update-source-handle-values";

const Demultiplexer: React.FC<NodeProps<Node>> = (props) => {
  const { id } = props;
  const input = useInputValue("input");

  const inputControlA = useInputValue("inputControlA");
  const inputControlB = useInputValue("inputControlB");

  const { updateAllSourceHandleValues } = useUpdateSourceHandleValues(id);

  // Get multiplexer output value based on control handle values
  const outputValues = {
    "false,false": [input, false, false, false],
    "false,true": [false, input, false, false],
    "true,false": [false, false, input, false],
    "true,true": [false, false, false, input],
  }[[inputControlA, inputControlB].join(",")];

  const outputValueA = !!(outputValues && outputValues[0]);
  const outputValueB = !!(outputValues && outputValues[1]);
  const outputValueC = !!(outputValues && outputValues[2]);
  const outputValueD = !!(outputValues && outputValues[3]);

  useEffect(() => {
    updateAllSourceHandleValues([
      { id: "outputA", value: !!outputValueA },
      { id: "outputB", value: !!outputValueB },
      { id: "outputC", value: !!outputValueC },
      { id: "outputD", value: !!outputValueD },
    ]);
  }, [outputValueA, outputValueB, outputValueC, outputValueD]);

  return (
    <NodeWrapper {...props}>
      <Container variant="no-padding">
        <div className="relative flex flex-col items-center justify-center w-14 h-14">
          <div className="absolute top-[20%] right-0">
            <NodeHandle
              state={outputValueA}
              type="source"
              position={Position.Right}
              id="outputA"
            />
          </div>
          <div className="absolute top-[40%] right-0">
            <NodeHandle
              state={outputValueB}
              type="source"
              position={Position.Right}
              id="outputB"
            />
          </div>
          <div className="absolute top-[60%] right-0">
            <NodeHandle
              state={outputValueC}
              type="source"
              position={Position.Right}
              id="outputC"
            />
          </div>
          <div className="absolute top-[80%] right-0">
            <NodeHandle
              state={outputValueD}
              type="source"
              position={Position.Right}
              id="outputD"
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
          <div className="absolute left-0 top-[50%]">
            <NodeHandle
              state={input}
              type="target"
              position={Position.Left}
              id="input"
            />
          </div>
          <img
            src={demultiplexerIcon}
            style={{ width: styleConstants.nodeIconSize }}
          />
        </div>
      </Container>
    </NodeWrapper>
  );
};

export default Demultiplexer;
