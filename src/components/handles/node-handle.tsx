import { Handle, HandleProps } from "@xyflow/react";
import { useIsPreview } from "../common/preview-context";

type Props = HandleProps & { state?: boolean };

const NodeHandle = ({ state, className, ...props }: Props) => {
  const isPreview = useIsPreview();
  const classes = `logic-handle ${state ? "on" : ""} ${className ?? ""}`;

  if (isPreview) {
    return (
      <div
        className={`react-flow__handle react-flow__handle-${props.position} ${classes}`}
      />
    );
  }

  return <Handle className={classes} {...props} />;
};
export default NodeHandle;
