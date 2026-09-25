import { Edge, Node, useReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import { useUiStore } from "../stores/ui-store";
import { useFitCircuit } from "./use-fit-circuit";

/** Replaces the whole canvas with a circuit and frames it */
export const useLoadCircuit = () => {
  const { setNodes, setEdges, getNodes } = useReactFlow();
  const fitCircuit = useFitCircuit();
  const showToast = useUiStore((s) => s.showToast);

  return useCallback(
    (
      circuit: { nodes: Node[]; edges: Edge[] },
      options: { confirm?: boolean; message?: string } = {}
    ) => {
      if (
        options.confirm &&
        getNodes().length > 0 &&
        !window.confirm("Replace the current circuit? Unsaved changes will be lost.")
      ) {
        return false;
      }
      // Deep copy so examples can be loaded more than once
      const copy = structuredClone(circuit);
      setEdges([]);
      setNodes(copy.nodes);
      setEdges(copy.edges);
      if (copy.nodes.length > 0) {
        // Wait a moment so the new nodes have been measured
        setTimeout(() => fitCircuit({ duration: 400 }), 50);
      }
      if (options.message) showToast(options.message);
      return true;
    },
    [setNodes, setEdges, getNodes, fitCircuit, showToast]
  );
};
