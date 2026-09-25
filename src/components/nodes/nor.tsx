import { TbLogicNor } from "react-icons/tb";
import { createTwoInputGate } from "./two-input-gate";

const Nor = createTwoInputGate("NOR", TbLogicNor, (a, b) => !(a || b));

export default Nor;
