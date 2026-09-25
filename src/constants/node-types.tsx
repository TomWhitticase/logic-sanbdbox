import { NodeTypes } from "@xyflow/react";
import React from "react";
import { FaSquareFull } from "react-icons/fa6";
import { FiClock } from "react-icons/fi";
import { IoMdRadioButtonOn } from "react-icons/io";
import { IoBulbOutline } from "react-icons/io5";
import { PiToggleLeft } from "react-icons/pi";
import {
  TbLogicAnd,
  TbLogicNand,
  TbLogicNor,
  TbLogicOr,
  TbLogicXnor,
  TbLogicXor,
  TbSquareNumber0,
  TbSquareNumber0Filled,
} from "react-icons/tb";
import BufferIcon from "../assets/buffer-icon.svg";
import dFlipFlopIcon from "../assets/d-flip-flop-icon.svg";
import demultiplexerIcon from "../assets/demultiplexer-icon.svg";
import fullAdderIcon from "../assets/full-adder-icon.svg";
import multiplexerIcon from "../assets/multiplexer-icon.svg";
import NotIcon from "../assets/not-icon.svg";
import SevenSegmentDisplayIcon from "../assets/seven-segment-display-icon.svg";
import And from "../components/nodes/and";
import Buffer from "../components/nodes/buffer";
import Bulb from "../components/nodes/bulb";
import Clock from "../components/nodes/clock";
import DFlipFlop from "../components/nodes/d-flip-flop";
import Demultiplexer from "../components/nodes/demultiplexer";
import FullAdder from "../components/nodes/full-adder";
import HexDisplay from "../components/nodes/hex-display";
import HexInput from "../components/nodes/hex-input";
import Light from "../components/nodes/light";
import Multiplexer from "../components/nodes/multiplexer";
import Nand from "../components/nodes/nand";
import Nor from "../components/nodes/nor";
import Not from "../components/nodes/not";
import Or from "../components/nodes/or";
import PushButton from "../components/nodes/push-button";
import SevenSegmentDisplay from "../components/nodes/seven-segment-display";
import Switch from "../components/nodes/switch";
import Xnor from "../components/nodes/xnor";
import Xor from "../components/nodes/xor";
import { styleConstants } from "./style-constants";

export type NodeCategory = "Inputs" | "Outputs" | "Logic Gates" | "Advanced";
export const nodeCategories: NodeCategory[] = [
  "Inputs",
  "Outputs",
  "Logic Gates",
  "Advanced",
];

const svgIcon = (src: string) => (
  <img
    src={src}
    draggable={false}
    className="icon-img"
    style={{ width: styleConstants.nodeIconSize }}
  />
);

type NodeDefinition = {
  component: NodeTypes[string];
  displayName: string;
  category: NodeCategory;
  icon: React.ReactNode;
  description: React.ReactNode;
  /** Extra node data used when showing the component in the help modal */
  previewData?: Record<string, unknown>;
};

export const nodeDefinitions = {
  switch: {
    component: Switch,
    displayName: "Switch",
    category: "Inputs",
    icon: <PiToggleLeft size={styleConstants.nodeIconSize} />,
    description: (
      <>
        A switch that can be toggled between <strong>on</strong> and{" "}
        <strong>off</strong>. Click it to flip the signal on its output.
      </>
    ),
  },
  pushButton: {
    component: PushButton,
    displayName: "Push Button",
    category: "Inputs",
    icon: <IoMdRadioButtonOn size={styleConstants.nodeIconSize} />,
    description: (
      <>
        A momentary button. Its output is <strong>true</strong> while you hold
        it down and returns to <strong>false</strong> when released.
      </>
    ),
  },
  clock: {
    component: Clock,
    displayName: "Clock",
    category: "Inputs",
    icon: <FiClock size={styleConstants.nodeIconSize} />,
    description: (
      <>
        Generates a square wave, useful for timing and driving sequential
        circuits. Use <strong>−</strong> and <strong>+</strong> to change the
        half-period. A <strong>true</strong> signal on its input pauses it.
      </>
    ),
    previewData: { intervalPeriod: 1000 },
  },
  hexInput: {
    component: HexInput,
    displayName: "Hex Input",
    category: "Inputs",
    icon: <TbSquareNumber0 size={styleConstants.nodeIconSize} />,
    description: (
      <>
        Type a hexadecimal digit (0–F), or use the arrow keys, and its 4-bit
        binary value appears on the outputs. The top output is the most
        significant bit (8), the bottom the least (1).
      </>
    ),
    previewData: { inputValue: "5" },
  },
  bulb: {
    component: Bulb,
    displayName: "Bulb",
    category: "Outputs",
    icon: <IoBulbOutline size={styleConstants.nodeIconSize} />,
    description: (
      <>
        A bulb that lights up when its input is <strong>true</strong>.
      </>
    ),
  },
  squareBulb: {
    component: Light,
    displayName: "Light",
    category: "Outputs",
    icon: <FaSquareFull size={styleConstants.nodeIconSize - 6} />,
    description: (
      <>
        A square indicator light that glows when its input is{" "}
        <strong>true</strong>. Line several up to build pixel displays.
      </>
    ),
  },
  SevenSegmentDisplay: {
    component: SevenSegmentDisplay,
    displayName: "7-Segment",
    category: "Outputs",
    icon: svgIcon(SevenSegmentDisplayIcon),
    description: (
      <>
        A seven segment display with one input per segment (<em>a</em> to{" "}
        <em>g</em>, top to bottom) plus one for the decimal point.
      </>
    ),
  },
  hexDisplay: {
    component: HexDisplay,
    displayName: "Hex Display",
    category: "Outputs",
    icon: <TbSquareNumber0Filled size={styleConstants.nodeIconSize} />,
    description: (
      <>
        Reads four binary inputs and shows their value as a hexadecimal digit.
        The top input is the most significant bit (8), the bottom the least (1).
      </>
    ),
  },
  buffer: {
    component: Buffer,
    displayName: "Buffer",
    category: "Logic Gates",
    icon: svgIcon(BufferIcon),
    description: <>Outputs its input signal unchanged.</>,
  },
  not: {
    component: Not,
    displayName: "NOT",
    category: "Logic Gates",
    icon: svgIcon(NotIcon),
    description: (
      <>
        Inverts its input: <strong>true</strong> becomes <strong>false</strong>{" "}
        and vice versa.
      </>
    ),
  },
  and: {
    component: And,
    displayName: "AND",
    category: "Logic Gates",
    icon: <TbLogicAnd size={styleConstants.nodeIconSize} />,
    description: (
      <>
        Outputs <strong>true</strong> only when both inputs are{" "}
        <strong>true</strong>.
      </>
    ),
  },
  nand: {
    component: Nand,
    displayName: "NAND",
    category: "Logic Gates",
    icon: <TbLogicNand size={styleConstants.nodeIconSize} />,
    description: (
      <>
        Outputs <strong>false</strong> only when both inputs are{" "}
        <strong>true</strong>. Every other gate can be built from NANDs.
      </>
    ),
  },
  or: {
    component: Or,
    displayName: "OR",
    category: "Logic Gates",
    icon: <TbLogicOr size={styleConstants.nodeIconSize} />,
    description: (
      <>
        Outputs <strong>true</strong> when at least one input is{" "}
        <strong>true</strong>.
      </>
    ),
  },
  nor: {
    component: Nor,
    displayName: "NOR",
    category: "Logic Gates",
    icon: <TbLogicNor size={styleConstants.nodeIconSize} />,
    description: (
      <>
        Outputs <strong>true</strong> only when both inputs are{" "}
        <strong>false</strong>.
      </>
    ),
  },
  xor: {
    component: Xor,
    displayName: "XOR",
    category: "Logic Gates",
    icon: <TbLogicXor size={styleConstants.nodeIconSize} />,
    description: (
      <>
        Outputs <strong>true</strong> when exactly one input is{" "}
        <strong>true</strong>.
      </>
    ),
  },
  xnor: {
    component: Xnor,
    displayName: "XNOR",
    category: "Logic Gates",
    icon: <TbLogicXnor size={styleConstants.nodeIconSize} />,
    description: (
      <>
        Outputs <strong>true</strong> when both inputs are the same.
      </>
    ),
  },
  multiplexer: {
    component: Multiplexer,
    displayName: "Multiplexer",
    category: "Advanced",
    icon: svgIcon(multiplexerIcon),
    description: (
      <>
        Forwards one of its four inputs (0–3, top to bottom) to the output. The
        two select inputs on the bottom choose which: the left one is the most
        significant bit.
      </>
    ),
  },
  demultiplexer: {
    component: Demultiplexer,
    displayName: "Demultiplexer",
    category: "Advanced",
    icon: svgIcon(demultiplexerIcon),
    description: (
      <>
        Routes its input to one of four outputs (0–3, top to bottom). The two
        select inputs on the bottom choose which: the left one is the most
        significant bit.
      </>
    ),
  },
  dFlipFlop: {
    component: DFlipFlop,
    displayName: "D Flip-Flop",
    category: "Advanced",
    icon: svgIcon(dFlipFlopIcon),
    description: (
      <>
        Stores a single bit. On the rising edge of <strong>CLK</strong> the
        value on <strong>D</strong> is captured and held on <strong>Q</strong>
        ; <strong>Q'</strong> is always its inverse.
      </>
    ),
  },
  fullAdder: {
    component: FullAdder,
    displayName: "Full Adder",
    category: "Advanced",
    icon: svgIcon(fullAdderIcon),
    description: (
      <>
        Adds three bits (<strong>A</strong>, <strong>B</strong> and a carry
        in) and outputs the <strong>sum</strong> and a{" "}
        <strong>carry out</strong>. Chain them to add multi-bit numbers.
      </>
    ),
  },
} satisfies Record<string, NodeDefinition>;

export type NodeType = keyof typeof nodeDefinitions;

export const isNodeType = (type: string | undefined): type is NodeType =>
  !!type && type in nodeDefinitions;

export const nodeDefinitionsArray = (
  Object.entries(nodeDefinitions) as [NodeType, NodeDefinition][]
).map(([id, definition]) => ({ id, ...definition }));

export const nodeTypes = Object.fromEntries(
  Object.entries(nodeDefinitions).map(([id, { component }]) => [id, component])
) as NodeTypes;
