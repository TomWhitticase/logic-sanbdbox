import { Node, NodeProps } from "@xyflow/react";
import React from "react";

type Props = {
  children: React.ReactNode;
} & NodeProps<Node>;

export const NodeWrapper = ({ children, data }: Props) => {
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
