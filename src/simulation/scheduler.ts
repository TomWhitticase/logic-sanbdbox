import { Node } from "@xyflow/react";
import { SourceHandleValues } from "../types/node-data";

type SetNodes = (updater: (nodes: Node[]) => Node[]) => void;

/**
 * Output updates are collected and applied together on the next macrotask.
 * Besides batching many gate updates into one render, this acts like a small
 * propagation delay: circuits with feedback (oscillators, latches) now tick
 * over time instead of recursing synchronously and freezing the page.
 */
const pending = new Map<string, SourceHandleValues>();
let scheduled = false;
let setNodesRef: SetNodes | null = null;

const sameValues = (a: SourceHandleValues | undefined, b: SourceHandleValues) =>
  !!a &&
  a.length === b.length &&
  a.every((v, i) => v.id === b[i].id && v.value === b[i].value);

const flush = () => {
  scheduled = false;
  if (!setNodesRef || pending.size === 0) return;
  const updates = new Map(pending);
  pending.clear();

  setNodesRef((nodes) => {
    let changed = false;
    const next = nodes.map((node) => {
      const values = updates.get(node.id);
      if (!values) return node;
      const current = node.data?.sourceHandleValues as
        | SourceHandleValues
        | undefined;
      if (sameValues(current, values)) return node;
      changed = true;
      return { ...node, data: { ...node.data, sourceHandleValues: values } };
    });
    return changed ? next : nodes;
  });
};

export const scheduleSourceHandleValues = (
  setNodes: SetNodes,
  nodeId: string,
  values: SourceHandleValues
) => {
  // Preview nodes (help modal, drag preview) have no real id
  if (!nodeId) return;
  setNodesRef = setNodes;
  pending.set(nodeId, values);
  if (scheduled) return;
  scheduled = true;
  setTimeout(flush, 0);
};
