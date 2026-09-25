import React from "react";
import { nodeDefinitions, NodeType } from "../../constants/node-types";
import { PreviewContext } from "./preview-context";

type Props = {
  type: NodeType;
  data?: Record<string, unknown>;
};

/** Renders a node component outside of the canvas */
export const NodePreview = ({ type, data }: Props) => {
  const definition = nodeDefinitions[type];
  const Component = definition.component as React.ComponentType<
    Record<string, unknown>
  >;
  const previewData: Record<string, unknown> =
    "previewData" in definition ? definition.previewData : {};

  return (
    <PreviewContext.Provider value={true}>
      <Component
        id=""
        type={type}
        data={{ rotation: 0, sourceHandleValues: [], ...previewData, ...data }}
        dragging={false}
        zIndex={0}
        isConnectable={false}
        selectable={false}
        deletable={false}
        draggable={false}
        selected={false}
        positionAbsoluteX={0}
        positionAbsoluteY={0}
      />
    </PreviewContext.Provider>
  );
};
