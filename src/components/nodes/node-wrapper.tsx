import { Node, NodeProps } from "@xyflow/react";
import React from "react";

export const NodeWrapper: React.FC<
  {
    children: React.ReactNode;
  } & NodeProps<Node>
> = ({ children, data }) => {
  return (
    <div
      style={{
        transform: `rotate(${data.rotation}deg)`,
      }}
    >
      {children}
    </div>
  );
};
export default NodeWrapper;
