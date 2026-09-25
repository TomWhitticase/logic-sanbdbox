import BufferIcon from "../../assets/buffer-icon.svg";
import { createSingleInputGate } from "./single-input-gate";

const Buffer = createSingleInputGate("BUF", BufferIcon, (input) => input);

export default Buffer;
