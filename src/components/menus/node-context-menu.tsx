import { useReactFlow, useUpdateNodeInternals } from "@xyflow/react";
import { useCallback, useEffect } from "react";
import {
  LuCopy,
  LuInfo,
  LuRotateCcw,
  LuRotateCw,
  LuTrash2,
  LuUnlink,
} from "react-icons/lu";
import { useSearchParams } from "react-router-dom";
import { isNodeType, nodeDefinitions } from "../../constants/node-types";
import { MenuItem, MenuSeparator } from "../common/menu-item";

export type NodeContextMenuProps = {
  id: string;
  top: number | undefined;
  left: number | undefined;
  right: number | undefined;
  bottom: number | undefined;
  closeMenu: () => void;
};

const NodeContextMenu: React.FC<NodeContextMenuProps> = ({
  id,
  top,
  left,
  right,
  bottom,
  closeMenu,
}) => {
  const { getNode, setNodes, addNodes, setEdges, updateNodeData, deleteElements } =
    useReactFlow();
  const [, setSearchParams] = useSearchParams();
  const updateNodeInternals = useUpdateNodeInternals();
  const node = getNode(id);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeMenu]);

  const duplicateNode = useCallback(() => {
    if (!node) return;
    setNodes((nodes) =>
      nodes.map((n) => (n.selected ? { ...n, selected: false } : n))
    );
    addNodes({
      ...node,
      id: `${node.type}-${Date.now().toString(36)}`,
      // Keep settings like rotation and clock speed, not the live outputs
      data: { ...node.data, sourceHandleValues: [] },
      position: { x: node.position.x + 30, y: node.position.y + 30 },
      selected: true,
      dragging: false,
    });
    closeMenu();
  }, [node, addNodes, setNodes, closeMenu]);

  const deleteNode = useCallback(() => {
    deleteElements({ nodes: [{ id }] });
    closeMenu();
  }, [id, deleteElements, closeMenu]);

  const disconnectEdges = useCallback(() => {
    setEdges((edges) =>
      edges.filter((edge) => edge.target !== id && edge.source !== id)
    );
    closeMenu();
  }, [id, setEdges, closeMenu]);

  const rotate = useCallback(
    (degrees: number) => {
      const current = (getNode(id)?.data.rotation as number) || 0;
      updateNodeData(id, { rotation: (((current + degrees) % 360) + 360) % 360 });
      // Handle positions are measured from the DOM, so re-measure after render
      requestAnimationFrame(() => updateNodeInternals(id));
    },
    [id, getNode, updateNodeData, updateNodeInternals]
  );

  const handleHelpClicked = () => {
    setSearchParams({ help: node?.type ?? "about" });
    closeMenu();
  };

  const title = isNodeType(node?.type)
    ? nodeDefinitions[node.type].displayName
    : "Component";

  return (
    <div
      role="menu"
      className="absolute z-[1000] w-56 p-1.5 glass rounded-xl animate-pop-in"
      style={{ top, left, right, bottom }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="px-2.5 pt-1 pb-1.5 text-[10px] font-semibold tracking-[0.16em] uppercase text-slate-500">
        {title}
      </div>
      <MenuItem icon={<LuRotateCw size={14} />} onClick={() => rotate(90)}>
        Rotate right
      </MenuItem>
      <MenuItem icon={<LuRotateCcw size={14} />} onClick={() => rotate(-90)}>
        Rotate left
      </MenuItem>
      <MenuItem icon={<LuCopy size={14} />} onClick={duplicateNode}>
        Duplicate
      </MenuItem>
      <MenuItem icon={<LuUnlink size={14} />} onClick={disconnectEdges}>
        Remove connections
      </MenuItem>
      <MenuItem icon={<LuInfo size={14} />} onClick={handleHelpClicked}>
        How it works
      </MenuItem>
      <MenuSeparator />
      <MenuItem
        icon={<LuTrash2 size={14} />}
        destructive
        shortcut={<kbd className="kbd">Del</kbd>}
        onClick={deleteNode}
      >
        Delete
      </MenuItem>
    </div>
  );
};
export default NodeContextMenu;
