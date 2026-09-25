import { Node, NodeProps, Position } from "@xyflow/react";
import React from "react";
import { useInputValue } from "../../hooks/use-target-handle-values";
import { NodeData } from "../../types/node-data";
import NodeHandle from "../handles/node-handle";
import NodeWrapper from "./node-wrapper";
import { hexToSegments } from "../../utils/seven-segment";
import { SevenSegmentGlyph } from "./seven-segment-glyph";

// inputA is the most significant bit
const bits = [
  { id: "inputA", weight: 8 },
  { id: "inputB", weight: 4 },
  { id: "inputC", weight: 2 },
  { id: "inputD", weight: 1 },
];

const HexDisplay: React.FC<NodeProps<Node<NodeData>>> = (props) => {
  const values = [
    useInputValue("inputA"),
    useInputValue("inputB"),
    useInputValue("inputC"),
    useInputValue("inputD"),
  ];

  const value = bits.reduce(
    (total, bit, i) => total + (values[i] ? bit.weight : 0),
    0
  );
  const displayValue = value.toString(16).toUpperCase();

  return (
    <NodeWrapper {...props}>
      <div className="node-card flex-row w-[88px] h-[92px] pl-5 pr-2">
        {bits.map((bit, i) => {
          const top = `${20 + i * 20}%`;
          return (
            <React.Fragment key={bit.id}>
              <div className="absolute left-0" style={{ top }}>
                <NodeHandle
                  state={values[i]}
                  type="target"
                  position={Position.Left}
                  id={bit.id}
                />
              </div>
              <span
                className="absolute font-mono text-[7px] leading-none -translate-y-1/2 left-[7px] text-slate-500 pointer-events-none"
                style={{ top }}
              >
                {bit.weight}
              </span>
            </React.Fragment>
          );
        })}
        <div className="flex items-center justify-center flex-1 h-[72px] p-2 rounded-lg bg-black/60 border border-white/5">
          <SevenSegmentGlyph
            className="w-full h-full"
            segments={hexToSegments(displayValue)}
          />
        </div>
      </div>
    </NodeWrapper>
  );
};

export default HexDisplay;
