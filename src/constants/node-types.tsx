import { NodeTypes } from "@xyflow/react";
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
import And from "../components/nodes/and";
import Buffer from "../components/nodes/buffer";
import Bulb from "../components/nodes/bulb";
import Clock from "../components/nodes/clock";
import DFlipFlop from "../components/nodes/d-flip-flop";
import Demultiplexer from "../components/nodes/demultiplexer";
import FullAdder from "../components/nodes/full-adder";
import HexDisplay from "../components/nodes/hex-display";
import HexInput from "../components/nodes/hex-input";
import Multiplexer from "../components/nodes/multiplexer";
import Nand from "../components/nodes/nand";
import Nor from "../components/nodes/nor";
import Not from "../components/nodes/not";
import Or from "../components/nodes/or";
import PushButton from "../components/nodes/push-button";
import SquareBulb from "../components/nodes/seven-segment-display";
import Switch from "../components/nodes/switch";
import Xnor from "../components/nodes/xnor";
import Xor from "../components/nodes/xor";
import { styleConstants } from "./style-constants";
import SevenSegmentDisplay from "../components/nodes/seven-segment-display";
import SevenSegmentDisplayIcon from "../assets/seven-segment-display-icon.svg";

export const nodeDefinitions = {
  bulb: {
    component: Bulb,
    displayName: "Bulb",
    icon: <IoBulbOutline size={styleConstants.nodeIconSize} />,
  },
  squareBulb: {
    component: SquareBulb,
    displayName: "Square Bulb",
    icon: <FaSquareFull size={styleConstants.nodeIconSize} />,
  },
  switch: {
    component: Switch,
    displayName: "Switch",
    icon: <PiToggleLeft size={styleConstants.nodeIconSize} />,
  },
  pushButton: {
    component: PushButton,
    displayName: "Push Button",
    icon: <IoMdRadioButtonOn size={styleConstants.nodeIconSize} />,
  },
  not: {
    component: Not,
    displayName: "Not",
    icon: (
      <img
        src={NotIcon}
        draggable={false}
        style={{ width: styleConstants.nodeIconSize }}
      />
    ),
  },
  and: {
    component: And,
    displayName: "And",
    icon: <TbLogicAnd size={styleConstants.nodeIconSize} />,
  },
  or: {
    component: Or,
    displayName: "Or",
    icon: <TbLogicOr size={styleConstants.nodeIconSize} />,
  },
  clock: {
    component: Clock,
    displayName: "Clock",
    icon: <FiClock size={styleConstants.nodeIconSize} />,
  },
  xor: {
    component: Xor,
    displayName: "Xor",
    icon: <TbLogicXor size={styleConstants.nodeIconSize} />,
  },
  nand: {
    component: Nand,
    displayName: "Nand",
    icon: <TbLogicNand size={styleConstants.nodeIconSize} />,
  },
  nor: {
    component: Nor,
    displayName: "Nor",
    icon: <TbLogicNor size={styleConstants.nodeIconSize} />,
  },
  xnor: {
    component: Xnor,
    displayName: "Xnor",
    icon: <TbLogicXnor size={styleConstants.nodeIconSize} />,
  },
  hexDisplay: {
    component: HexDisplay,
    displayName: "Hex Display",
    icon: <TbSquareNumber0Filled size={styleConstants.nodeIconSize} />,
  },
  buffer: {
    component: Buffer,
    displayName: "Buffer",
    icon: (
      <img
        src={BufferIcon}
        draggable={false}
        style={{ width: styleConstants.nodeIconSize }}
      />
    ),
  },
  hexInput: {
    component: HexInput,
    displayName: "Hex Input",
    icon: <TbSquareNumber0 size={styleConstants.nodeIconSize} />,
  },
  multiplexer: {
    component: Multiplexer,
    displayName: "Multiplexer",
    icon: (
      <img
        src={multiplexerIcon}
        draggable={false}
        style={{ width: styleConstants.nodeIconSize }}
      />
    ),
  },
  demultiplexer: {
    component: Demultiplexer,
    displayName: "Demultiplexer",
    icon: (
      <img
        src={demultiplexerIcon}
        draggable={false}
        style={{ width: styleConstants.nodeIconSize }}
      />
    ),
  },
  dFlipFlop: {
    component: DFlipFlop,
    displayName: "D Flip Flop",
    icon: (
      <img
        src={dFlipFlopIcon}
        draggable={false}
        style={{ width: styleConstants.nodeIconSize }}
      />
    ),
  },
  fullAdder: {
    component: FullAdder,
    displayName: "Full Adder",
    icon: (
      <img
        src={fullAdderIcon}
        draggable={false}
        style={{ width: styleConstants.nodeIconSize }}
      />
    ),
  },
  SevenSegmentDisplay: {
    component: SevenSegmentDisplay,
    displayName: "7 Segment Display",
    icon: (
      <img
        src={SevenSegmentDisplayIcon}
        draggable={false}
        style={{ width: styleConstants.nodeIconSize }}
      />
    ),
  },
} as const;

export type NodeType = keyof typeof nodeDefinitions;

export const nodeDefinitionsArray = Object.entries(nodeDefinitions).map(
  ([id, { component, displayName, icon }]) => ({
    id,
    component,
    displayName,
    icon,
  })
);

export const nodeTypes = Object.entries(nodeDefinitions).reduce(
  (acc, [id, { component }]) => {
    acc[id] = component;
    return acc;
  },
  {} as NodeTypes
);
