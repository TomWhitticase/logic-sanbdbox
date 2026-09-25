import { Edge, Node } from "@xyflow/react";
import { NodeType } from "./node-types";

export type ExampleCircuit = {
  id: string;
  name: string;
  description: string;
  nodes: Node[];
  edges: Edge[];
};

const node = (
  id: string,
  type: NodeType,
  x: number,
  y: number,
  data: Record<string, unknown> = {}
): Node => ({
  id,
  type,
  position: { x, y },
  data: { rotation: 0, sourceHandleValues: [], ...data },
});

const wire = (
  source: string,
  sourceHandle: string,
  target: string,
  targetHandle: string
): Edge => ({
  id: `${source}.${sourceHandle}->${target}.${targetHandle}`,
  source,
  sourceHandle,
  target,
  targetHandle,
  type: "wire",
});

const resetFlipFlop = {
  sourceHandleValues: [
    { id: "q", value: false },
    { id: "qNot", value: true },
  ],
};

export const examples: ExampleCircuit[] = [
  {
    id: "half-adder",
    name: "Half adder",
    description: "Add two bits with an XOR and an AND gate",
    nodes: [
      node("a", "switch", 0, 0),
      node("b", "switch", 0, 140),
      node("xor", "xor", 200, -6),
      node("and", "and", 200, 134),
      node("sum", "bulb", 380, 0),
      node("carry", "bulb", 380, 140),
    ],
    edges: [
      wire("a", "switchValue", "xor", "inputA"),
      wire("b", "switchValue", "xor", "inputB"),
      wire("a", "switchValue", "and", "inputA"),
      wire("b", "switchValue", "and", "inputB"),
      wire("xor", "output", "sum", "input"),
      wire("and", "output", "carry", "input"),
    ],
  },
  {
    id: "counter",
    name: "4-bit counter",
    description: "A ripple counter built from D flip-flops",
    nodes: [
      node("clock", "clock", -40, 150, { intervalPeriod: 500 }),
      ...[0, 1, 2, 3].flatMap((i) => [
        node(`ff${i}`, "dFlipFlop", 160 + i * 150, 150, resetFlipFlop),
        node(`light${i}`, "squareBulb", 170 + i * 150, 20),
      ]),
      node("display", "hexDisplay", 760, 250),
    ],
    edges: [
      wire("clock", "output", "ff0", "clock"),
      ...[0, 1, 2, 3].flatMap((i) => [
        wire(`ff${i}`, "qNot", `ff${i}`, "dataIn"),
        wire(`ff${i}`, "q", `light${i}`, "input"),
        wire(`ff${i}`, "q", "display", ["inputD", "inputC", "inputB", "inputA"][i]),
        ...(i < 3 ? [wire(`ff${i}`, "qNot", `ff${i + 1}`, "clock")] : []),
      ]),
    ],
  },
  {
    id: "blinker",
    name: "Blinker",
    description: "A clock and a NOT gate alternate two bulbs",
    nodes: [
      node("clock", "clock", 0, 60, { intervalPeriod: 600 }),
      node("not", "not", 200, 140),
      node("left", "bulb", 380, 0),
      node("right", "bulb", 380, 138),
    ],
    edges: [
      wire("clock", "output", "left", "input"),
      wire("clock", "output", "not", "input"),
      wire("not", "output", "right", "input"),
    ],
  },
  {
    id: "hex",
    name: "Hex decoder",
    description: "Type a digit and watch the bits light up",
    nodes: [
      node("in", "hexInput", 0, 40, {
        inputValue: "A",
        sourceHandleValues: [
          { id: "outputA", value: true },
          { id: "outputB", value: false },
          { id: "outputC", value: true },
          { id: "outputD", value: false },
        ],
      }),
      ...[0, 1, 2, 3].map((i) => node(`bit${i}`, "squareBulb", 170 + i * 70, -110)),
      node("display", "hexDisplay", 470, 40),
    ],
    edges: ["outputA", "outputB", "outputC", "outputD"].flatMap((handle, i) => [
      wire("in", handle, `bit${i}`, "input"),
      wire("in", handle, "display", ["inputA", "inputB", "inputC", "inputD"][i]),
    ]),
  },
];
