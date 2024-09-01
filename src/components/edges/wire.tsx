import {
  Node,
  BaseEdge,
  Edge,
  EdgeProps,
  getSmoothStepPath,
  Position,
  useNodesData,
} from "@xyflow/react";
import React from "react";
import { styleConstants } from "../../constants/style-constants";
import { NodeData } from "../../types/node-data";

const adjustPositionForRotation = (
  position: Position,
  rotation: number
): Position => {
  const positionMap: Record<number, Record<Position, Position>> = {
    0: {
      [Position.Top]: Position.Top,
      [Position.Right]: Position.Right,
      [Position.Bottom]: Position.Bottom,
      [Position.Left]: Position.Left,
    },
    90: {
      [Position.Top]: Position.Right,
      [Position.Right]: Position.Bottom,
      [Position.Bottom]: Position.Left,
      [Position.Left]: Position.Top,
    },
    180: {
      [Position.Top]: Position.Bottom,
      [Position.Right]: Position.Left,
      [Position.Bottom]: Position.Top,
      [Position.Left]: Position.Right,
    },
    270: {
      [Position.Top]: Position.Left,
      [Position.Right]: Position.Top,
      [Position.Bottom]: Position.Right,
      [Position.Left]: Position.Bottom,
    },
  };
  return (positionMap[rotation] || positionMap[0])[position];
};

const xOffset = styleConstants.handleConnectorWidth / 2;

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
}) => {
  const sourceNode = useNodesData<Node<NodeData>>(source);
  const targetNode = useNodesData<Node<NodeData>>(target);
  const sourceRotation = sourceNode?.data.rotation || 0;
  const targetRotation = targetNode?.data.rotation || 0;

  const [edgePath] = getSmoothStepPath({
    sourceX: sourceX - xOffset,
    sourceY,
    targetX: targetX + xOffset,
    targetY,
    sourcePosition: adjustPositionForRotation(sourcePosition, sourceRotation),
    targetPosition: adjustPositionForRotation(targetPosition, targetRotation),
    borderRadius: 4,
  });

  const isOn = sourceNode?.data.sourceHandleValues.find(
    (v) => v.id === sourceHandleId
  )?.value;

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          stroke: isOn
            ? styleConstants.activeColor
            : styleConstants.inactiveColor,
          strokeWidth: 2,
        }}
      />
      {/* <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            background: "#ffcc00",
            padding: 10,
            borderRadius: 5,
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          {isOn ? "1" : "0"}
          {sourcePosition}
          {targetPosition}
        </div>
      </EdgeLabelRenderer> */}
    </>
  );
};
export default Wire;
