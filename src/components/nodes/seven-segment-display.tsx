import { Node, NodeProps, Position } from "@xyflow/react";
import React from "react";
import { useInputValue } from "../../hooks/use-target-handle-values";
import { NodeData } from "../../types/node-data";
import NodeHandle from "../handles/node-handle";
import NodeWrapper from "./node-wrapper";
import { SevenSegmentGlyph } from "./seven-segment-glyph";

const pins = ["A", "B", "C", "D", "E", "F", "G", "Dp"] as const;

const SevenSegmentDisplay: React.FC<NodeProps<Node<NodeData>>> = (props) => {
  const values = {
    A: useInputValue("inputA"),
    B: useInputValue("inputB"),
    C: useInputValue("inputC"),
    D: useInputValue("inputD"),
    E: useInputValue("inputE"),
    F: useInputValue("inputF"),
    G: useInputValue("inputG"),
    Dp: useInputValue("inputDp"),
  };

  return (
    <NodeWrapper {...props}>
      <div className="node-card flex-row gap-0 w-[112px] h-[136px] pl-5 pr-2">
        {pins.map((pin, i) => {
          const top = `${10 + i * (80 / (pins.length - 1))}%`;
          return (
            <React.Fragment key={pin}>
              <div className="absolute left-0" style={{ top }}>
                <NodeHandle
                  state={values[pin]}
                  type="target"
                  position={Position.Left}
                  id={`input${pin}`}
                />
              </div>
              <span
                className="absolute font-mono text-[7px] leading-none -translate-y-1/2 left-[7px] text-slate-500 pointer-events-none"
                style={{ top }}
              >
                {pin.toLowerCase()}
              </span>
            </React.Fragment>
          );
        })}
        <div className="flex items-center justify-center flex-1 h-full p-2 rounded-lg bg-black/60 border border-white/5">
          <SevenSegmentGlyph
            className="w-full h-full"
            segments={{
              a: values.A,
              b: values.B,
              c: values.C,
              d: values.D,
              e: values.E,
              f: values.F,
              g: values.G,
              dp: values.Dp,
            }}
          />
        </div>
      </div>
    </NodeWrapper>
  );
};

export default SevenSegmentDisplay;
