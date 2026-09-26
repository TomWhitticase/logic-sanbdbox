import { Edge, Node } from "@xyflow/react";
import { NodeType } from "./node-types";

export type ExampleLevel = "Basics" | "Bigger builds";
export const exampleLevels: ExampleLevel[] = ["Basics", "Bigger builds"];

export type ExampleCircuit = {
  id: string;
  name: string;
  description: string;
  level: ExampleLevel;
  /** Shown as a quick start on the empty canvas */
  featured?: boolean;
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

// 4-bit handles are ordered most significant bit first (8, 4, 2, 1)
const hexOutputs = ["outputA", "outputB", "outputC", "outputD"];
const hexDisplayInputs = ["inputA", "inputB", "inputC", "inputD"];
/** The handle for bit `i` (0 = least significant) of a 4-bit bus */
const bit = (handles: string[], i: number) => handles[3 - i];

const hexInputData = (digit: string) => {
  const value = parseInt(digit, 16);
  return {
    inputValue: digit,
    sourceHandleValues: hexOutputs.map((id, i) => ({
      id,
      value: (value & (8 >> i)) !== 0,
    })),
  };
};

const range = (n: number) => Array.from({ length: n }, (_, i) => i);

export const examples: ExampleCircuit[] = [
  {
    id: "blinker",
    name: "Blinker",
    description: "A clock and a NOT gate alternate two bulbs",
    level: "Basics",
    featured: true,
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
    id: "half-adder",
    name: "Half adder",
    description: "Add two bits with an XOR and an AND gate",
    level: "Basics",
    featured: true,
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
    id: "sr-latch",
    name: "SR latch",
    description: "Two cross-coupled NOR gates remember one bit",
    level: "Basics",
    nodes: [
      node("reset", "pushButton", 0, 0),
      node("set", "pushButton", 0, 180),
      // Start in a stable "reset" state: Q = 0, Q' = 1
      node("norQ", "nor", 220, -6, {
        sourceHandleValues: [{ id: "output", value: false }],
      }),
      node("norQNot", "nor", 220, 174, {
        sourceHandleValues: [{ id: "output", value: true }],
      }),
      node("q", "bulb", 420, 0),
      node("qNot", "bulb", 420, 180),
    ],
    edges: [
      wire("reset", "outputValue", "norQ", "inputA"),
      wire("norQNot", "output", "norQ", "inputB"),
      wire("norQ", "output", "norQNot", "inputA"),
      wire("set", "outputValue", "norQNot", "inputB"),
      wire("norQ", "output", "q", "input"),
      wire("norQNot", "output", "qNot", "input"),
    ],
  },
  {
    id: "hex",
    name: "Hex decoder",
    description: "Type a digit and watch the bits light up",
    level: "Basics",
    featured: true,
    nodes: [
      node("in", "hexInput", 0, 40, hexInputData("A")),
      ...range(4).map((i) =>
        node(`bit${i}`, "squareBulb", 170 + i * 70, -110)
      ),
      node("display", "hexDisplay", 470, 40),
    ],
    edges: hexOutputs.flatMap((handle, i) => [
      wire("in", handle, `bit${i}`, "input"),
      wire("in", handle, "display", hexDisplayInputs[i]),
    ]),
  },
  {
    id: "mux",
    name: "Data selector",
    description: "Two select switches route one of four inputs to a bulb",
    level: "Basics",
    nodes: [
      ...range(4).map((i) =>
        node(`data${i}`, "switch", 0, i * 90, i === 2
          ? { sourceHandleValues: [{ id: "switchValue", value: true }] }
          : {})
      ),
      node("select1", "switch", 180, 420, {
        sourceHandleValues: [{ id: "switchValue", value: true }],
      }),
      node("select0", "switch", 300, 420),
      node("mux", "multiplexer", 240, 120),
      node("out", "bulb", 440, 136),
    ],
    edges: [
      ...["inputA", "inputB", "inputC", "inputD"].map((handle, i) =>
        wire(`data${i}`, "switchValue", "mux", handle)
      ),
      wire("select1", "switchValue", "mux", "inputControlA"),
      wire("select0", "switchValue", "mux", "inputControlB"),
      wire("mux", "output", "out", "input"),
    ],
  },
  {
    id: "adder",
    name: "4-bit adder",
    description: "Four chained full adders add two hex digits",
    level: "Bigger builds",
    featured: true,
    nodes: [
      node("a", "hexInput", 0, 40, hexInputData("5")),
      node("b", "hexInput", 0, 300, hexInputData("9")),
      // Bit 3 (most significant) at the top
      ...range(4).map((i) => node(`fa${i}`, "fullAdder", 300, (3 - i) * 120)),
      node("carry", "bulb", 560, -60),
      node("sum", "hexDisplay", 560, 150),
    ],
    edges: range(4).flatMap((i) => [
      wire("a", bit(hexOutputs, i), `fa${i}`, "inputA"),
      wire("b", bit(hexOutputs, i), `fa${i}`, "inputB"),
      wire(`fa${i}`, "sum", "sum", bit(hexDisplayInputs, i)),
      i < 3
        ? wire(`fa${i}`, "carryOut", `fa${i + 1}`, "carryIn")
        : wire(`fa${i}`, "carryOut", "carry", "input"),
    ]),
  },
  {
    id: "counter",
    name: "4-bit counter",
    description: "A ripple counter built from D flip-flops",
    level: "Bigger builds",
    featured: true,
    nodes: [
      node("clock", "clock", -40, 150, { intervalPeriod: 500 }),
      ...range(4).flatMap((i) => [
        node(`ff${i}`, "dFlipFlop", 160 + i * 150, 150, resetFlipFlop),
        node(`light${i}`, "squareBulb", 170 + i * 150, 20),
      ]),
      node("display", "hexDisplay", 760, 250),
    ],
    edges: [
      wire("clock", "output", "ff0", "clock"),
      ...range(4).flatMap((i) => [
        wire(`ff${i}`, "qNot", `ff${i}`, "dataIn"),
        wire(`ff${i}`, "q", `light${i}`, "input"),
        wire(`ff${i}`, "q", "display", bit(hexDisplayInputs, i)),
        ...(i < 3 ? [wire(`ff${i}`, "qNot", `ff${i + 1}`, "clock")] : []),
      ]),
    ],
  },
  {
    id: "sequencer",
    name: "Light sequencer",
    description: "A 2-bit counter drives a demultiplexer to step through lights",
    level: "Bigger builds",
    nodes: [
      node("clock", "clock", -60, 110, { intervalPeriod: 400 }),
      node("ff0", "dFlipFlop", 150, 100, resetFlipFlop),
      node("ff1", "dFlipFlop", 300, 100, resetFlipFlop),
      // A NOT gate with nothing on its input is a constant "high"
      node("high", "not", 330, 330),
      node("demux", "demultiplexer", 500, 140),
      ...range(4).map((i) => node(`light${i}`, "bulb", 700, 30 + i * 80)),
    ],
    edges: [
      wire("clock", "output", "ff0", "clock"),
      wire("ff0", "qNot", "ff0", "dataIn"),
      wire("ff0", "qNot", "ff1", "clock"),
      wire("ff1", "qNot", "ff1", "dataIn"),
      wire("ff1", "q", "demux", "inputControlA"),
      wire("ff0", "q", "demux", "inputControlB"),
      wire("high", "output", "demux", "input"),
      ...["outputA", "outputB", "outputC", "outputD"].map((handle, i) =>
        wire("demux", handle, `light${i}`, "input")
      ),
    ],
  },
  {
    id: "chaser",
    name: "Light chaser",
    description: "A Johnson counter: four flip-flops shifting in a ring",
    level: "Bigger builds",
    nodes: [
      node("clock", "clock", -60, 200, { intervalPeriod: 300 }),
      ...range(4).flatMap((i) => [
        node(`ff${i}`, "dFlipFlop", 140 + i * 160, 180, resetFlipFlop),
        node(`light${i}`, "squareBulb", 150 + i * 160, 40),
      ]),
    ],
    edges: [
      ...range(4).flatMap((i) => [
        wire("clock", "output", `ff${i}`, "clock"),
        wire(`ff${i}`, "q", `light${i}`, "input"),
        i < 3
          ? wire(`ff${i}`, "q", `ff${i + 1}`, "dataIn")
          : wire(`ff${i}`, "qNot", "ff0", "dataIn"),
      ]),
    ],
  },
];
