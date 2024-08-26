import { Handle, HandleProps } from "@xyflow/react";
import { styleConstants } from "../../constants/styleConstants";

const NodeHandle = (props: HandleProps & { state: boolean }) => {
  return (
    <Handle
      style={{
        backgroundColor: props.state
          ? styleConstants.activeColor
          : styleConstants.inactiveColor,
        width: styleConstants.handleConnectorWidth,
        height: styleConstants.handleConnectorWidth,
      }}
      {...props}
    />
  );
};
export default NodeHandle;
