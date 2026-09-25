import { Edge, Node, useEdges, useNodes, useReactFlow } from "@xyflow/react";
import { useEffect, useState } from "react";
import { localStorageKeys } from "../constants/local-storage-keys";
import { useFitCircuit } from "../hooks/use-fit-circuit";
import { savedCircuitSchema } from "../types/saved-circuit";

const saveDelayMs = 300;

// headless component for syncing react-flow state with local storage
export const LocalStorageHandler: React.FC = () => {
  const nodes = useNodes();
  const edges = useEdges();
  const [initialised, setInitialised] = useState(false);

  const { setNodes, setEdges } = useReactFlow();
  const fitCircuit = useFitCircuit();

  useEffect(() => {
    try {
      const storedFlow = localStorage.getItem(localStorageKeys.flow);
      const parsed = savedCircuitSchema.safeParse(
        JSON.parse(storedFlow ?? "null")
      );
      if (parsed.success) {
        setNodes(parsed.data.nodes as Node[]);
        setEdges(parsed.data.edges as Edge[]);
        if (parsed.data.nodes.length > 0) {
          setTimeout(() => fitCircuit(), 50);
        }
      }
    } catch (error) {
      console.error("Could not restore the saved circuit:", error);
    }

    setInitialised(true);
  }, [setNodes, setEdges, fitCircuit]);

  useEffect(() => {
    if (!initialised) return;
    const timeout = setTimeout(() => {
      try {
        localStorage.setItem(
          localStorageKeys.flow,
          JSON.stringify({ nodes, edges })
        );
      } catch (error) {
        console.error("Could not save the circuit:", error);
      }
    }, saveDelayMs);
    return () => clearTimeout(timeout);
  }, [nodes, edges, initialised]);

  return null;
};
