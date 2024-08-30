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
import Switch from "../components/nodes/switch";
import Xnor from "../components/nodes/xnor";
import Xor from "../components/nodes/xor";

export const nodeTypes = {
  Bulb,
  Switch,
  PushButton,
  Not,
  And,
  Or,
  Clock,
  Xor,
  Nand,
  Nor,
  Xnor,
  HexDisplay,
  Buffer,
  HexInput,
  Multiplexer,
  Demultiplexer,
  DFlipFlop,
  FullAdder,
} as const;

export type NodeType = keyof typeof nodeTypes;

export const nodeTypesArray = Object.entries(nodeTypes) as Array<
  [keyof typeof nodeTypes, React.ComponentType]
>;
