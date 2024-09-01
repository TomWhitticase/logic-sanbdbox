import { Node, NodeProps, Position } from "@xyflow/react";
import React from "react";
import { useInputValue } from "../../hooks/use-target-handle-values";
import { NodeData } from "../../types/node-data";
import { Container } from "../common/container";
import NodeHandle from "../handles/node-handle";
import NodeWrapper from "./node-wrapper";

const SevenSegmentDisplay: React.FC<NodeProps<Node<NodeData>>> = (props) => {
  const inputA = useInputValue("inputA");
  const inputB = useInputValue("inputB");
  const inputC = useInputValue("inputC");
  const inputD = useInputValue("inputD");
  const inputE = useInputValue("inputE");
  const inputF = useInputValue("inputF");
  const inputG = useInputValue("inputG");
  const inputDp = useInputValue("inputDp");

  return (
    <NodeWrapper {...props}>
      <div className="flex">
        <div className="relative flex flex-col">
          <div className="absolute top-[10%]">
            <NodeHandle
              state={inputA}
              type="target"
              position={Position.Left}
              id="inputA"
            />
          </div>
          <div className="absolute top-[20%]">
            <NodeHandle
              state={inputB}
              type="target"
              position={Position.Left}
              id="inputB"
            />
          </div>
          <div className="absolute top-[30%]">
            <NodeHandle
              state={inputC}
              type="target"
              position={Position.Left}
              id="inputC"
            />
          </div>
          <div className="absolute top-[40%]">
            <NodeHandle
              state={inputD}
              type="target"
              position={Position.Left}
              id="inputD"
            />
          </div>
          <div className="absolute top-[50%]">
            <NodeHandle
              state={inputE}
              type="target"
              position={Position.Left}
              id="inputE"
            />
          </div>
          <div className="absolute top-[60%]">
            <NodeHandle
              state={inputF}
              type="target"
              position={Position.Left}
              id="inputF"
            />
          </div>
          <div className="absolute top-[70%]">
            <NodeHandle
              state={inputG}
              type="target"
              position={Position.Left}
              id="inputG"
            />
          </div>
          <div className="absolute top-[80%]">
            <NodeHandle
              state={inputG}
              type="target"
              position={Position.Left}
              id="inputG"
            />
          </div>
          <div className="absolute top-[90%]">
            <NodeHandle
              state={inputDp}
              type="target"
              position={Position.Left}
              id="inputDp"
            />
          </div>
        </div>
        <Container>
          <div className="p-1">
            <span className="flex items-center justify-center w-28 h-28">
              <svg
                stroke="currentColor"
                fill="none"
                stroke-width="2"
                viewBox="0 0 24 24"
                transform="skewX(-5)"
                stroke-linecap="round"
                stroke-linejoin="round"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="8"
                  y="2"
                  width="6"
                  height="0.1"
                  stroke={inputA ? "black" : "#ddd"}
                />
                <rect
                  x="17"
                  y="4"
                  width="0.1"
                  height="6"
                  stroke={inputB ? "black" : "#ddd"}
                />
                <rect
                  x="17"
                  y="14"
                  width="0.1"
                  height="6"
                  stroke={inputC ? "black" : "#ddd"}
                />
                <rect
                  x="8"
                  y="22"
                  width="6"
                  height="0.1"
                  stroke={inputD ? "black" : "#ddd"}
                />
                <rect
                  x="5"
                  y="14"
                  width="0.1"
                  height="6"
                  stroke={inputE ? "black" : "#ddd"}
                />
                <rect
                  x="5"
                  y="4"
                  width="0.1"
                  height="6"
                  stroke={inputF ? "black" : "#ddd"}
                />
                <rect
                  x="8"
                  y="12"
                  width="6"
                  height="0.1"
                  stroke={inputG ? "black" : "#ddd"}
                />
                <circle
                  cx="21"
                  cy="21"
                  r="0.5"
                  stroke={inputDp ? "black" : "#ddd"}
                  fill={inputDp ? "black" : "#ddd"}
                />
              </svg>
            </span>
          </div>
        </Container>
      </div>
    </NodeWrapper>
  );
};

export default SevenSegmentDisplay;
