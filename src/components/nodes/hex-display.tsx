import { Node, NodeProps, Position } from "@xyflow/react";
import React from "react";
import { useInputValue } from "../../hooks/use-target-handle-values";
import { Container } from "../common/container";
import NodeHandle from "../handles/node-handle";
import NodeWrapper from "./node-wrapper";
import { NodeData } from "../../types/node-data";

const HexDisplay: React.FC<NodeProps<Node<NodeData>>> = (props) => {
  const inputA = useInputValue("inputA");
  const inputB = useInputValue("inputB");
  const inputC = useInputValue("inputC");
  const inputD = useInputValue("inputD");

  // Converting the node data to boolean values (true or false)
  const inputABinary = inputA ? 1 : 0;
  const inputBBinary = inputB ? 1 : 0;
  const inoutCBinary = inputC ? 1 : 0;
  const inputDBinary = inputD ? 1 : 0;

  // Convert the 4-bit binary input to a hexadecimal value
  const binaryString = `${inputABinary}${inputBBinary}${inoutCBinary}${inputDBinary}`;
  const displayValue = parseInt(binaryString, 2).toString(16).toUpperCase();

  return (
    <NodeWrapper {...props}>
      <div className="flex">
        <div className="relative flex flex-col">
          <div className="absolute top-[20%]">
            <NodeHandle
              state={inputA}
              type="target"
              position={Position.Left}
              id="inputA"
            />
          </div>
          <div className="absolute top-[40%]">
            <NodeHandle
              state={inputB}
              type="target"
              position={Position.Left}
              id="inputB"
            />
          </div>
          <div className="absolute top-[60%]">
            <NodeHandle
              state={inputC}
              type="target"
              position={Position.Left}
              id="inputC"
            />
          </div>
          <div className="absolute top-[80%]">
            <NodeHandle
              state={inputD}
              type="target"
              position={Position.Left}
              id="inputD"
            />
          </div>
        </div>
        <Container>
          <div className="p-1">
            <span className="flex items-center justify-center w-12 h-12 text-2xl font-bold text-white border-2 border-black rounded bg-gradient-to-r from-gray-600 to-gray-800">
              {displayValue}
            </span>
          </div>
        </Container>
      </div>
    </NodeWrapper>
  );
};

export default HexDisplay;
