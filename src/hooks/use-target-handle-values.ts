import { useHandleConnections, useNodesData } from "@xyflow/react";
import { SourceHandleValues } from "../types/node-data";

/**
 * Returns the logic level on one of the current node's input handles.
 * Several wires on the same input behave like a wired-OR.
 */
export const useInputValue = (handleId: string) => {
  const connections = useHandleConnections({
    type: "target",
    id: handleId,
  });
  const connectedNodes = useNodesData(connections.map((c) => c.source));

  return connections.some((c) => {
    const values = connectedNodes.find((n) => n.id === c.source)?.data
      ?.sourceHandleValues as SourceHandleValues | undefined;
    return values?.find((h) => h.id === c.sourceHandle)?.value ?? false;
  });
};
