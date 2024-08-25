import { useReactFlow, useUpdateNodeInternals } from "@xyflow/react";
import { useCallback } from "react";
import { FaArrowRotateLeft, FaArrowRotateRight } from "react-icons/fa6";
import { IoDuplicateOutline } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { TbUnlink } from "react-icons/tb";
import { Button } from "../common/button";
import { Container } from "../common/container";

export type NodeContextMenuProps = {
  id: string;
  top: number | undefined;
  left: number | undefined;
  right: number | undefined;
  bottom: number | undefined;
};
const NodeContextMenu: React.FC<NodeContextMenuProps> = ({
  id,
  top,
  left,
  right,
  bottom,
  ...props
}) => {
  const { getNode, setNodes, addNodes, setEdges, updateNode } = useReactFlow();
  const updateNodeInternals = useUpdateNodeInternals();
  const node = getNode(id);

  const duplicateNode = useCallback(() => {
    if (!node) {
      console.error(`Node with id ${id} not found`);
      return;
    }
    const position = {
      x: node!.position.x + 5,
      y: node!.position.y + 5,
    };

    addNodes({
      ...node,
      id: `${node.id}-${Date.now()}`,
      data: { value: false, rotation: 0, sourceHandleValues: [] },
      position,
    });
  }, [id, getNode, addNodes, node]);

  const deleteNode = useCallback(() => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id));
  }, [id, setNodes, setEdges]);

  const disconnectEdges = useCallback(() => {
    // remove source edges
    setEdges((edges) =>
      edges.filter((edge) => edge.target !== id && edge.source !== id)
    );
  }, [id, setEdges]);

  const rotate = useCallback(
    (degrees: number) => {
      updateNode(id, (node) => {
        let newRotation = ((node.data.rotation || 0) as number) + degrees;
        if (newRotation >= 360) {
          newRotation -= 360;
        } else if (newRotation < 0) {
          newRotation += 360;
        }
        return {
          ...node,
          data: {
            ...node.data,
            rotation: newRotation,
          },
        };
      });
      updateNodeInternals(id);
    },

    [updateNode, id, updateNodeInternals]
  );

  return (
    <div
      style={{
        top,
        left,
        right,
        bottom,
        zIndex: 1000,
        position: "absolute",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
      {...props}
    >
      <Container variant="menu">
        <Button variant="menu" onClick={() => rotate(90)}>
          <div className="flex items-center gap-2">
            <FaArrowRotateRight /> Rotate 90°
          </div>
        </Button>
        <Button variant="menu" onClick={() => rotate(-90)}>
          <div className="flex items-center gap-2">
            <FaArrowRotateLeft /> Rotate -90°
          </div>
        </Button>
        <Button variant={"menu"} onClick={() => duplicateNode()}>
          <div className="flex items-center gap-2">
            <IoDuplicateOutline />
            Duplicate
          </div>
        </Button>
        <Button variant={"menu"} onClick={() => deleteNode()}>
          <div className="flex items-center gap-2">
            <RiDeleteBinLine />
            Delete
          </div>
        </Button>
        <Button variant={"menu"} onClick={() => disconnectEdges()}>
          <div className="flex items-center gap-2">
            <TbUnlink />
            Remove connections
          </div>
        </Button>
      </Container>
    </div>
  );
};
export default NodeContextMenu;
