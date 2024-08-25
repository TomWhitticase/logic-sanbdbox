import { Node, NodeProps, Position } from "@xyflow/react";
import React from "react";
import { useTargetHandleValues } from "../../hooks/use-target-handle-values";
import { Container } from "../common/container";
import NodeHandle from "../handles/node-handle";
import NodeWrapper from "./node-wrapper";

const HexDisplay: React.FC<NodeProps<Node>> = (props) => {
  const targetHandleAValues = useTargetHandleValues("targetHandleA");
  const targetHandleBValues = useTargetHandleValues("targetHandleB");
  const targetHandleCValues = useTargetHandleValues("targetHandleC");
  const targetHandleDValues = useTargetHandleValues("targetHandleD");

  // Converting the node data to boolean values (true or false)
  const valueA = targetHandleAValues.some((v) => v) ? 1 : 0;
  const valueB = targetHandleBValues.some((v) => v) ? 1 : 0;
  const valueC = targetHandleCValues.some((v) => v) ? 1 : 0;
  const valueD = targetHandleDValues.some((v) => v) ? 1 : 0;

  // Convert the 4-bit binary input to a hexadecimal value
  const binaryString = `${valueA}${valueB}${valueC}${valueD}`;
  const displayValue = parseInt(binaryString, 2).toString(16).toUpperCase();

  return (
    <NodeWrapper {...props}>
      <div className="flex">
        <div className="relative flex flex-col">
          <div className="absolute top-[20%]">
            <NodeHandle
              type="target"
              position={Position.Left}
              id="targetHandleA"
            />
          </div>
          <div className="absolute top-[40%]">
            <NodeHandle
              type="target"
              position={Position.Left}
              id="targetHandleB"
            />
          </div>
          <div className="absolute top-[60%]">
            <NodeHandle
              type="target"
              position={Position.Left}
              id="targetHandleC"
            />
          </div>
          <div className="absolute top-[80%]">
            <NodeHandle
              type="target"
              position={Position.Left}
              id="targetHandleD"
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
