import { Node, NodeProps, Position } from "@xyflow/react";
import React, { useEffect } from "react";
import fullAdderIcon from "../../assets/full-adder-icon.svg";
import { styleConstants } from "../../constants/styleConstants";
import { useInputValue } from "../../hooks/use-target-handle-values";
import { useUpdateSourceHandleValues } from "../../hooks/use-update-source-handle-values";
import { Container } from "../common/container";
import NodeHandle from "../handles/node-handle";
import NodeWrapper from "./node-wrapper";

const FullAdder: React.FC<NodeProps<Node>> = (props) => {
  const { id } = props;
  const { updateAllSourceHandleValues } = useUpdateSourceHandleValues(id);

  const inputA = useInputValue("inputA");
  const inputB = useInputValue("inputB");
  const carryIn = useInputValue("carryIn");

  const sum = (inputA !== inputB) !== carryIn;
  const carryOut =
    (inputA && inputB) || (inputB && carryIn) || (inputA && carryIn);

  useEffect(() => {
    updateAllSourceHandleValues([
      { id: "sum", value: sum },
      {
        id: "carryOut",
        value: carryOut,
      },
    ]);
  }, [inputA, inputB, carryIn]);

  return (
    <NodeWrapper {...props}>
      <Container variant="no-padding">
        <div className="relative flex flex-col items-center justify-center w-14 h-14">
          <div className="absolute top-[25%] left-0">
            <NodeHandle
              state={inputA}
              type="target"
              position={Position.Left}
              id="inputA"
            />
          </div>
          <div className="absolute top-[50%] left-0">
            <NodeHandle
              state={inputB}
              type="target"
              position={Position.Left}
              id="inputB"
            />
          </div>
          <div className="absolute top-[75%] left-0">
            <NodeHandle
              state={carryIn}
              type="target"
              position={Position.Left}
              id="carryIn"
            />
          </div>
          <div className="absolute top-[35%] right-0">
            <NodeHandle
              state={sum}
              type="source"
              position={Position.Right}
              id="sum"
            />
          </div>
          <div className="absolute bottom-[35%] right-0">
            <NodeHandle
              state={carryOut}
              type="source"
              position={Position.Right}
              id="carryOut"
            />
          </div>
          <img
            src={fullAdderIcon}
            style={{ width: styleConstants.nodeIconSize }}
          />
        </div>
      </Container>
    </NodeWrapper>
  );
};

export default FullAdder;
