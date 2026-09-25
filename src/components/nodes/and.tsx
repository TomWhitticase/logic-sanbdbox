import { TbLogicAnd } from "react-icons/tb";
import { createTwoInputGate } from "./two-input-gate";

const And = createTwoInputGate("AND", TbLogicAnd, (a, b) => a && b);

export default And;
