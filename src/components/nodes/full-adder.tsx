import { Node, NodeProps, Position } from "@xyflow/react";
import React, { useEffect } from "react";
import fullAdderIcon from "../../assets/full-adder-icon.svg";
import { useInputValue } from "../../hooks/use-target-handle-values";
import { useUpdateSourceHandleValues } from "../../hooks/use-update-source-handle-values";
import { NodeData } from "../../types/node-data";
import { Chip } from "./chip";
import NodeWrapper from "./node-wrapper";

const FullAdder: React.FC<NodeProps<Node<NodeData>>> = (props) => {
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
      { id: "carryOut", value: carryOut },
    ]);
  }, [sum, carryOut, updateAllSourceHandleValues]);

  return (
    <NodeWrapper {...props}>
      <Chip
        iconSrc={fullAdderIcon}
        label="ADD"
        pins={[
          { id: "inputA", type: "target", side: Position.Left, at: 25, state: inputA, label: "A" },
          { id: "inputB", type: "target", side: Position.Left, at: 50, state: inputB, label: "B" },
          { id: "carryIn", type: "target", side: Position.Left, at: 75, state: carryIn, label: "Cin" },
          { id: "sum", type: "source", side: Position.Right, at: 35, state: sum, label: "S" },
          { id: "carryOut", type: "source", side: Position.Right, at: 65, state: carryOut, label: "Co" },
        ]}
      />
    </NodeWrapper>
  );
};

export default FullAdder;
