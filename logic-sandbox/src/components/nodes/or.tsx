import { Node, NodeProps, Position } from "@xyflow/react";
import React, { useEffect } from "react";
import { TbLogicOr } from "react-icons/tb";
import { styleConstants } from "../../constants/styleConstants";
import { useTargetHandleValues } from "../../hooks/use-target-handle-values";
import { useUpdateSourceHandleValues } from "../../hooks/use-update-source-handle-values";
import { Container } from "../common/container";
import NodeHandle from "../handles/node-handle";
import NodeWrapper from "./node-wrapper";

const Or: React.FC<NodeProps<Node>> = (props) => {
  const { id } = props;

  const { updateSourceHandleValue } = useUpdateSourceHandleValues(id);
  const targetHandleAValues = useTargetHandleValues("targetHandleA");
  const targetHandleBValues = useTargetHandleValues("targetHandleB");

  const outputValue =
    targetHandleAValues.some((v) => v) || targetHandleBValues.some((v) => v);

  useEffect(() => {
    updateSourceHandleValue("sourceHandle", outputValue);
  }, [outputValue, id]);

  return (
    <NodeWrapper {...props}>
      <div className="flex">
        <div className="relative flex flex-col">
          <div className="absolute top-3">
            <NodeHandle
              type="target"
              position={Position.Left}
              id="targetHandleA"
            />
          </div>
          <div className="absolute bottom-3">
            <NodeHandle
              type="target"
              position={Position.Left}
              id="targetHandleB"
            />
          </div>
        </div>
        <Container>
          <TbLogicOr size={styleConstants.nodeIconSize} />
        </Container>
        <NodeHandle type="source" position={Position.Right} id="sourceHandle" />
      </div>
    </NodeWrapper>
  );
};

export default Or;
