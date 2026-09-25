import NotIcon from "../../assets/not-icon.svg";
import { createSingleInputGate } from "./single-input-gate";

const Not = createSingleInputGate("NOT", NotIcon, (input) => !input);

export default Not;
