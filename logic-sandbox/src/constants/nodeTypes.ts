import { NodeTypes } from "@xyflow/react";
import And from "../components/nodes/and";
import Buffer from "../components/nodes/buffer";
import Bulb from "../components/nodes/bulb";
import Clock from "../components/nodes/clock";
import HexDisplay from "../components/nodes/hex-display";
import Nand from "../components/nodes/nand";
import Not from "../components/nodes/not";
import Or from "../components/nodes/or";
import Switch from "../components/nodes/switch";
import Xor from "../components/nodes/xor";
import Nor from "../components/nodes/nor";
import Xnor from "../components/nodes/xnor";
import HexInput from "../components/nodes/hex-input";
import Multiplexer from "../components/nodes/multiplexer";
import Demultiplexer from "../components/nodes/demultiplexer";
import PushButton from "../components/nodes/push-button";
import DFlipFlop from "../components/nodes/d-flip-flop";

const nodeTypes: NodeTypes = {
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
} as const;
export default nodeTypes;
