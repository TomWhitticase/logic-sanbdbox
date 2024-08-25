import { Node, NodeProps, Position } from "@xyflow/react";
import React, { useEffect } from "react";
import multiplexerIcon from "../../assets/multiplexer-icon.svg";
import { styleConstants } from "../../constants/styleConstants";
import { useTargetHandleValues } from "../../hooks/use-target-handle-values";
import { Container } from "../common/container";
import NodeHandle from "../handles/node-handle";
import NodeWrapper from "./node-wrapper";
import { useUpdateSourceHandleValues } from "../../hooks/use-update-source-handle-values";

const Multiplexer: React.FC<NodeProps<Node>> = (props) => {
  const { id } = props;
  const targetHandleAValues = useTargetHandleValues("targetHandleA");
  const targetHandleBValues = useTargetHandleValues("targetHandleB");
  const targetHandleCValues = useTargetHandleValues("targetHandleC");
  const targetHandleDValues = useTargetHandleValues("targetHandleD");

  const targetHandleControlAValues = useTargetHandleValues(
    "targetHandleControlA"
  );
  const targetHandleControlBValues = useTargetHandleValues(
    "targetHandleControlB"
  );

  const { updateSourceHandleValue } = useUpdateSourceHandleValues(id);

  // Get multiplexer output value based on control handle values
  const outputValue = {
    "false,false": targetHandleAValues.some((v) => v),
    "false,true": targetHandleBValues.some((v) => v),
    "true,false": targetHandleCValues.some((v) => v),
    "true,true": targetHandleDValues.some((v) => v),
  }[
    [
      targetHandleControlAValues.some((v) => v),
      targetHandleControlBValues.some((v) => v),
    ].join(",")
  ];

  useEffect(() => {
    updateSourceHandleValue("sourceHandle", outputValue ?? false);
  }, [outputValue, id]);

  return (
    <NodeWrapper {...props}>
      <Container variant="no-padding">
        <div className="relative flex flex-col items-center justify-center w-14 h-14">
          <div className="absolute top-[20%] left-0">
            <NodeHandle
              type="target"
              position={Position.Left}
              id="targetHandleA"
            />
          </div>
          <div className="absolute top-[40%] left-0">
            <NodeHandle
              type="target"
              position={Position.Left}
              id="targetHandleB"
            />
          </div>
          <div className="absolute top-[60%] left-0">
            <NodeHandle
              type="target"
              position={Position.Left}
              id="targetHandleC"
            />
          </div>
          <div className="absolute top-[80%] left-0">
            <NodeHandle
              type="target"
              position={Position.Left}
              id="targetHandleD"
            />
          </div>
          <div className={`absolute left-[35%] bottom-0`}>
            <NodeHandle
              type="target"
              position={Position.Bottom}
              id="targetHandleControlA"
            />
          </div>
          <div className="absolute right-[35%] bottom-0">
            <NodeHandle
              type="target"
              position={Position.Bottom}
              id="targetHandleControlB"
            />
          </div>
          <div className="absolute right-0 top-[50%]">
            <NodeHandle
              type="source"
              position={Position.Right}
              id="sourceHandle"
            />
          </div>
          <img
            src={multiplexerIcon}
            style={{ width: styleConstants.nodeIconSize }}
          />
        </div>
      </Container>
    </NodeWrapper>
  );
};

export default Multiplexer;
