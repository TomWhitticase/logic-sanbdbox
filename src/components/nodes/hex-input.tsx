import { Node, NodeProps, Position, useReactFlow } from "@xyflow/react";
import React from "react";
import { NodeData } from "../../types/node-data";
import NodeHandle from "../handles/node-handle";
import NodeWrapper from "./node-wrapper";

const hexDigits = "0123456789ABCDEF";

// outputA is the most significant bit
const bits = [
  { id: "outputA", weight: 8 },
  { id: "outputB", weight: 4 },
  { id: "outputC", weight: 2 },
  { id: "outputD", weight: 1 },
];

const getSourceHandleValuesFromHexString = (value: string) => {
  const number = Math.max(0, hexDigits.indexOf(value));
  return bits.map((bit) => ({
    id: bit.id,
    value: (number & bit.weight) !== 0,
  }));
};

const HexInput: React.FC<
  NodeProps<
    Node<
      NodeData & {
        inputValue?: string;
      }
    >
  >
> = (props) => {
  const { id, data } = props;

  const { updateNodeData } = useReactFlow();

  const inputValue = data.inputValue || "";

  const setValue = (value: string) => {
    const digit = value.toUpperCase();
    if (!hexDigits.includes(digit) || digit.length !== 1) return;
    updateNodeData(id, {
      inputValue: digit,
      sourceHandleValues: getSourceHandleValuesFromHexString(digit),
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
    e.preventDefault();
    const current = Math.max(0, hexDigits.indexOf(inputValue));
    const next = (current + (e.key === "ArrowUp" ? 1 : 15)) % 16;
    setValue(hexDigits[next]);
  };

  const outputStates = bits.map(
    (bit) =>
      data.sourceHandleValues?.find((h) => h.id === bit.id)?.value ?? false
  );

  return (
    <NodeWrapper {...props}>
      <div className="node-card flex-row w-[84px] h-[92px] pl-2 pr-5">
        <input
          className="nodrag w-full h-[72px] rounded-lg bg-black/60 border border-white/5 text-center font-mono text-4xl font-bold text-emerald-300 caret-emerald-300 placeholder:text-emerald-300/30 outline-none focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20 [text-shadow:0_0_12px_rgba(52,211,153,0.7)]"
          value={inputValue}
          placeholder="0"
          type="text"
          inputMode="text"
          maxLength={2}
          aria-label="Hex digit"
          title="Type 0-F or use the arrow keys"
          onFocus={(e) => e.target.select()}
          onKeyDown={handleKeyDown}
          onChange={({ target }) => setValue(target.value.slice(-1))}
        />
        {bits.map((bit, i) => {
          const top = `${20 + i * 20}%`;
          return (
            <React.Fragment key={bit.id}>
              <div className="absolute right-0" style={{ top }}>
                <NodeHandle
                  state={outputStates[i]}
                  type="source"
                  position={Position.Right}
                  id={bit.id}
                />
              </div>
              <span
                className="absolute font-mono text-[7px] leading-none -translate-y-1/2 right-[7px] text-slate-500 pointer-events-none"
                style={{ top }}
              >
                {bit.weight}
              </span>
            </React.Fragment>
          );
        })}
      </div>
    </NodeWrapper>
  );
};

export default HexInput;
