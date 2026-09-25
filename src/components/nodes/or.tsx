import { TbLogicOr } from "react-icons/tb";
import { createTwoInputGate } from "./two-input-gate";

const Or = createTwoInputGate("OR", TbLogicOr, (a, b) => a || b);

export default Or;
