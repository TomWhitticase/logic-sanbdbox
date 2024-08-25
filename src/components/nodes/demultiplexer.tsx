import { Node, NodeProps, Position } from "@xyflow/react";
import React, { useEffect } from "react";
import demultiplexerIcon from "../../assets/demultiplexer-icon.svg";
import { styleConstants } from "../../constants/styleConstants";
import { useTargetHandleValues } from "../../hooks/use-target-handle-values";
import { Container } from "../common/container";
import NodeHandle from "../handles/node-handle";
import NodeWrapper from "./node-wrapper";
import { useUpdateSourceHandleValues } from "../../hooks/use-update-source-handle-values";

const Demultiplexer: React.FC<NodeProps<Node>> = (props) => {
  const { id } = props;
  const targetHandleAValues = useTargetHandleValues("targetHandle");

  const targetHandleControlAValues = useTargetHandleValues(
    "targetHandleControlA"
  );
  const targetHandleControlBValues = useTargetHandleValues(
    "targetHandleControlB"
  );

  const { updateSourceHandleValue } = useUpdateSourceHandleValues(id);

  // Get multiplexer output value based on control handle values
  const outputValues = {
    "false,false": [targetHandleAValues.some((v) => v), false, false, false],
    "false,true": [false, targetHandleAValues.some((v) => v), false, false],
    "true,false": [false, false, targetHandleAValues.some((v) => v), false],
    "true,true": [false, false, false, targetHandleAValues.some((v) => v)],
  }[
    [
      targetHandleControlAValues.some((v) => v),
      targetHandleControlBValues.some((v) => v),
    ].join(",")
  ];

  const outputValueA = outputValues && outputValues[0];
  const outputValueB = outputValues && outputValues[1];
  const outputValueC = outputValues && outputValues[2];
  const outputValueD = outputValues && outputValues[3];

  useEffect(() => {
    updateSourceHandleValue("sourceHandleA", !!outputValueA);
  }, [id, outputValueA]);
  useEffect(() => {
    updateSourceHandleValue("sourceHandleB", !!outputValueB);
  }, [id, outputValueB]);
  useEffect(() => {
    updateSourceHandleValue("sourceHandleC", !!outputValueC);
  }, [id, outputValueC]);
  useEffect(() => {
    updateSourceHandleValue("sourceHandleD", !!outputValueD);
  }, [id, outputValueD]);

  return (
    <NodeWrapper {...props}>
      <Container variant="no-padding">
        <div className="relative flex flex-col items-center justify-center w-14 h-14">
          <div className="absolute top-[20%] right-0">
            <NodeHandle
              type="source"
              position={Position.Right}
              id="sourceHandleA"
            />
          </div>
          <div className="absolute top-[40%] right-0">
            <NodeHandle
              type="source"
              position={Position.Right}
              id="sourceHandleB"
            />
          </div>
          <div className="absolute top-[60%] right-0">
            <NodeHandle
              type="source"
              position={Position.Right}
              id="sourceHandleC"
            />
          </div>
          <div className="absolute top-[80%] right-0">
            <NodeHandle
              type="source"
              position={Position.Right}
              id="sourceHandleD"
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
          <div className="absolute left-0 top-[50%]">
            <NodeHandle
              type="target"
              position={Position.Left}
              id="targetHandle"
            />
          </div>
          <img
            src={demultiplexerIcon}
            style={{ width: styleConstants.nodeIconSize }}
          />
        </div>
      </Container>
    </NodeWrapper>
  );
};

export default Demultiplexer;
