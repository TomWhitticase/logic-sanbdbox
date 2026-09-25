import { TbLogicXor } from "react-icons/tb";
import { createTwoInputGate } from "./two-input-gate";

const Xor = createTwoInputGate("XOR", TbLogicXor, (a, b) => a !== b);

export default Xor;
