import { TbLogicNand } from "react-icons/tb";
import { createTwoInputGate } from "./two-input-gate";

const Nand = createTwoInputGate("NAND", TbLogicNand, (a, b) => !(a && b));

export default Nand;
