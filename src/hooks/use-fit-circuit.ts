import {
  getNodesBounds,
  getViewportForBounds,
  useReactFlow,
} from "@xyflow/react";
import { useCallback } from "react";

// Width reserved on the left for the component panel when it is docked open
const paletteSpace = 300;

/**
 * Like fitView, but frames the circuit in the space to the right of the
 * component panel so nothing ends up hidden underneath it.
 */
export const useFitCircuit = () => {
  const { getNodes, setViewport } = useReactFlow();

  return useCallback(
    (options: { duration?: number } = {}) => {
      const nodes = getNodes();
      if (nodes.length === 0) return;
      const offset = window.innerWidth >= 900 ? paletteSpace : 0;
      const viewport = getViewportForBounds(
        getNodesBounds(nodes),
        window.innerWidth - offset,
        window.innerHeight,
        0.2,
        1.25,
        0.15
      );
      setViewport(
        { ...viewport, x: viewport.x + offset },
        { duration: options.duration }
      );
    },
    [getNodes, setViewport]
  );
};
