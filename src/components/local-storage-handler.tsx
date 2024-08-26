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
    const storedNodes = localStorage.getItem(localStorageKeys.nodes);
    const storedEdges = localStorage.getItem(localStorageKeys.edges);

    if (storedNodes) {
      setNodes(JSON.parse(storedNodes));
    }
    if (storedEdges) {
      setEdges(JSON.parse(storedEdges));
    }
    setInitialised(true);
  }, [setNodes, setEdges]);

  useEffect(() => {
    if (!initialised) return;
    localStorage.setItem(localStorageKeys.nodes, JSON.stringify(nodes));
    localStorage.setItem(localStorageKeys.edges, JSON.stringify(edges));
  }, [nodes, edges, initialised]);

  return <></>;
};
