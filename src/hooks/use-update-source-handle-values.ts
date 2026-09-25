import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import { scheduleSourceHandleValues } from "../simulation/scheduler";
import { SourceHandleValues } from "../types/node-data";

export const useUpdateSourceHandleValues = (nodeId: string) => {
  const { setNodes } = useReactFlow();

  const updateAllSourceHandleValues = useCallback(
    (sourceHandleValues: SourceHandleValues) =>
      scheduleSourceHandleValues(setNodes, nodeId, sourceHandleValues),
    [setNodes, nodeId]
  );

  const updateSourceHandleValue = useCallback(
    (id: string, value: boolean) =>
      scheduleSourceHandleValues(setNodes, nodeId, [{ id, value }]),
    [setNodes, nodeId]
  );

  return { updateAllSourceHandleValues, updateSourceHandleValue };
};
