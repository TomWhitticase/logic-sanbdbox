import { Node, NodeProps, Position } from "@xyflow/react";
import React, { useEffect } from "react";
import dFlipFlopIcon from "../../assets/d-flip-flop-icon.svg";
import { styleConstants } from "../../constants/styleConstants";
import { useTargetHandleValues } from "../../hooks/use-target-handle-values";
import { useUpdateSourceHandleValues } from "../../hooks/use-update-source-handle-values";
import { Container } from "../common/container";
import NodeHandle from "../handles/node-handle";
import NodeWrapper from "./node-wrapper";

const DFlipFlop: React.FC<NodeProps<Node>> = (props) => {
  const { id } = props;
  const { updateAllSourceHandleValues } = useUpdateSourceHandleValues(id);

  const dataInValues = useTargetHandleValues("dataIn");
  const clockInValues = useTargetHandleValues("clock");

  const dataIn = dataInValues.some((v) => v);
  const clockIn = clockInValues.some((v) => v);

  useEffect(() => {
    if (clockIn) {
      updateAllSourceHandleValues([
        { id: "q", value: dataIn },
        { id: "qNot", value: !dataIn },
      ]);
    }
  }, [clockIn]);

  return (
    <NodeWrapper {...props}>
      <Container variant="no-padding">
        <div className="relative flex flex-col items-center justify-center w-14 h-14">
          <div className="absolute top-[35%] left-0">
            <NodeHandle type="target" position={Position.Left} id="dataIn" />
          </div>
          <div className="absolute bottom-[35%] left-0">
            <NodeHandle type="target" position={Position.Left} id="clock" />
          </div>
          <div className="absolute top-[35%] right-0">
            <NodeHandle type="source" position={Position.Right} id="q" />
          </div>
          <div className="absolute bottom-[35%] right-0">
            <NodeHandle type="source" position={Position.Right} id="qNot" />
          </div>
          <img
            src={dFlipFlopIcon}
            style={{ width: styleConstants.nodeIconSize }}
          />
        </div>
      </Container>
    </NodeWrapper>
  );
};

export default DFlipFlop;
