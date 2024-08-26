import { useHandleConnections, useNodesData } from "@xyflow/react";

export const useInputValue = (
  hanldeId: string | undefined,
  nodeId?: string
) => {
  const connections = useHandleConnections({
    type: "target",
    id: nodeId ?? hanldeId,
  });
  const connectedNodes = useNodesData(connections.map((c) => c.source));

  const connectedHandles = connections.map((c) => ({
    sourceHandle: c.sourceHandle,
    targetHandle: c.targetHandle,
    node: c.source,
    value: (() => {
      try {
        return (
          connectedNodes.find((n) => n.id === c.source)?.data
            .sourceHandleValues as { id: string; value: boolean }[]
        ).find((h) => h.id === c.sourceHandle)?.value;
      } catch (error) {
        console.log("Could not get value for handle:", c.sourceHandle, error);
        return false;
      }
    })(),
  }));

  return connectedHandles.map((h) => h.value || false).some((v) => v);
};
