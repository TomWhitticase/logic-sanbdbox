import {
  BaseEdge,
  Edge,
  EdgeProps,
  getSmoothStepPath,
  Node,
  Position,
  useNodesData,
} from "@xyflow/react";
import React from "react";
import { styleConstants } from "../../constants/style-constants";
import { NodeData } from "../../types/node-data";

const positionOrder = [
  Position.Top,
  Position.Right,
  Position.Bottom,
  Position.Left,
];

/** Where a handle actually faces once its node has been rotated */
const adjustPositionForRotation = (
  position: Position,
  rotation: number
): Position => {
  const steps = Math.round((((rotation % 360) + 360) % 360) / 90);
  const index = positionOrder.indexOf(position);
  return positionOrder[(index + steps) % 4];
};

const half = styleConstants.handleConnectorWidth / 2;

/**
 * React Flow places edge ends on the outer edge of a handle, based on the
 * handle's unrotated position. Move them to the handle's centre so wires meet
 * the pins cleanly however the node is rotated.
 */
const toHandleCentre = (x: number, y: number, position: Position) => {
  switch (position) {
    case Position.Left:
      return { x: x + half, y };
    case Position.Right:
      return { x: x - half, y };
    case Position.Top:
      return { x, y: y + half };
    case Position.Bottom:
      return { x, y: y - half };
  }
};

const Wire: React.FC<EdgeProps<Edge>> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  source,
  target,
  sourcePosition,
  targetPosition,
  sourceHandleId,
  selected,
}) => {
  const sourceNode = useNodesData<Node<NodeData>>(source);
  const targetNode = useNodesData<Node<NodeData>>(target);
  const sourceRotation = sourceNode?.data.rotation || 0;
  const targetRotation = targetNode?.data.rotation || 0;

  const start = toHandleCentre(sourceX, sourceY, sourcePosition);
  const end = toHandleCentre(targetX, targetY, targetPosition);

  const [edgePath] = getSmoothStepPath({
    sourceX: start.x,
    sourceY: start.y,
    targetX: end.x,
    targetY: end.y,
    sourcePosition: adjustPositionForRotation(sourcePosition, sourceRotation),
    targetPosition: adjustPositionForRotation(targetPosition, targetRotation),
    borderRadius: 8,
    offset: 16,
  });

  const isOn = !!sourceNode?.data.sourceHandleValues?.find(
    (v) => v.id === sourceHandleId
  )?.value;

  return (
    <>
      {isOn && (
        <path
          d={edgePath}
          fill="none"
          stroke={styleConstants.activeColor}
          strokeWidth={8}
          strokeOpacity={0.18}
          style={{ filter: "blur(3px)" }}
        />
      )}
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          stroke: isOn
            ? styleConstants.activeColor
            : selected
            ? "#94a3b8"
            : "#3b4658",
          strokeWidth: selected ? 3 : 2,
          transition: "stroke 120ms",
        }}
      />
      {isOn && (
        <path
          d={edgePath}
          fill="none"
          stroke="#d1fae5"
          strokeWidth={2}
          strokeLinecap="round"
          className="wire-flow"
          style={{ pointerEvents: "none" }}
        />
      )}
    </>
  );
};
export default Wire;
