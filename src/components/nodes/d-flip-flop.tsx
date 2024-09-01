import { Node, NodeProps, Position } from "@xyflow/react";
import React, { useEffect } from "react";
import dFlipFlopIcon from "../../assets/d-flip-flop-icon.svg";
import { styleConstants } from "../../constants/style-constants";
import { useInputValue } from "../../hooks/use-target-handle-values";
import { useUpdateSourceHandleValues } from "../../hooks/use-update-source-handle-values";
import { NodeData } from "../../types/node-data";
import { Container } from "../common/container";
import NodeHandle from "../handles/node-handle";
import NodeWrapper from "./node-wrapper";

const DFlipFlop: React.FC<NodeProps<Node<NodeData>>> = (props) => {
  const { id, data } = props;
  const { updateAllSourceHandleValues } = useUpdateSourceHandleValues(id);

  const q = data.sourceHandleValues.find((h) => h.id === "q")?.value ?? false;
  const qNot =
    data.sourceHandleValues.find((h) => h.id === "qNot")?.value ?? false;

  const dataIn = useInputValue("dataIn");
  const clockIn = useInputValue("clock");

  useEffect(() => {
    if (clockIn) {
      updateAllSourceHandleValues([
        { id: "q", value: dataIn },
        { id: "qNot", value: !dataIn },
      ]);
    }
  }, [clockIn]);

  // esnure that the initial values are set correctly
  useEffect(() => {
    if (q === qNot) {
      updateAllSourceHandleValues([
        { id: "q", value: q },
        { id: "qNot", value: qNot },
      ]);
    }
  }, []);

  return (
    <NodeWrapper {...props}>
      <Container variant="no-padding">
        <div className="relative flex flex-col items-center justify-center w-14 h-14">
          <div className="absolute top-[35%] left-0">
            <NodeHandle
              state={dataIn}
              type="target"
              position={Position.Left}
              id="dataIn"
            />
          </div>
          <div className="absolute bottom-[35%] left-0">
            <NodeHandle
              state={clockIn}
              type="target"
              position={Position.Left}
              id="clock"
            />
          </div>
          <div className="absolute top-[35%] right-0">
            <NodeHandle
              state={q}
              type="source"
              position={Position.Right}
              id="q"
            />
          </div>
          <div className="absolute bottom-[35%] right-0">
            <NodeHandle
              state={qNot}
              type="source"
              position={Position.Right}
              id="qNot"
            />
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
