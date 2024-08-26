import { useEdges, useNodes, useReactFlow } from "@xyflow/react";
import { useEffect, useState } from "react";
import { localStorageKeys } from "../constants/local-storage-keys";

// headless component for syncing react-flow state with local storage
export const LocalStorageHandler: React.FC = () => {
  const nodes = useNodes();
  const edges = useEdges();
  const [initialised, setInitialised] = useState(false);

  const { setNodes, setEdges } = useReactFlow();

  useEffect(() => {
    const storedFlow = localStorage.getItem(localStorageKeys.flow);

    if (storedFlow) {
      const parsedFlow = JSON.parse(storedFlow);
      setNodes(parsedFlow.nodes);
      setEdges(parsedFlow.edges);
    }

    setInitialised(true);
  }, [setNodes, setEdges]);

  useEffect(() => {
    if (!initialised) return;
    localStorage.setItem(
      localStorageKeys.flow,
      JSON.stringify({ nodes, edges })
    );
  }, [nodes, edges, initialised]);

  return <></>;
};
