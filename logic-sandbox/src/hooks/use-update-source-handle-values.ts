import { useReactFlow } from "@xyflow/react";

export const useUpdateSourceHandleValues = (nodeId: string) => {
  const { updateNodeData } = useReactFlow();

  const updateAllSourceHandleValues = (
    sourceHandleValues: { id: string; value: boolean }[]
  ) => {
    updateNodeData(nodeId, () => ({
      sourceHandleValues,
    }));
  };

  const updateSourceHandleValue = (id: string, value: boolean) => {
    console.log("Updating node data", nodeId, id, value);
    updateNodeData(nodeId, (node) => {
      return {
        ...node.data,
        sourceHandleValues: [{ id, value }],
      };
    });
  };

  return { updateAllSourceHandleValues, updateSourceHandleValue };
};
