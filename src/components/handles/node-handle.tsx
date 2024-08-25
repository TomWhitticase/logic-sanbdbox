import { Handle, HandleProps } from "@xyflow/react";
import { styleConstants } from "../../constants/styleConstants";

const NodeHandle = (props: HandleProps) => {
  return (
    <Handle
      style={{
        width: styleConstants.handleConnectorWidth,
        height: styleConstants.handleConnectorWidth,
      }}
      {...props}
    />
  );
};
export default NodeHandle;
