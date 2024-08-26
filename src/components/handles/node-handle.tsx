import { Handle, HandleProps } from "@xyflow/react";
import { styleConstants } from "../../constants/styleConstants";

const NodeHandle = (props: HandleProps & { state: boolean }) => {
  return (
    <>
      <Handle
        style={{
          backgroundColor: props.state ? "orange" : "black",
          width: styleConstants.handleConnectorWidth,
          height: styleConstants.handleConnectorWidth,
        }}
        {...props}
      />
    </>
  );
};
export default NodeHandle;
