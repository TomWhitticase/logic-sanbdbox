import { TbLogicXnor } from "react-icons/tb";
import { createTwoInputGate } from "./two-input-gate";

const Xnor = createTwoInputGate("XNOR", TbLogicXnor, (a, b) => a === b);

export default Xnor;
