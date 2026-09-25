import { Node, NodeProps, Position } from "@xyflow/react";
import React, { useEffect } from "react";
import multiplexerIcon from "../../assets/multiplexer-icon.svg";
import { useInputValue } from "../../hooks/use-target-handle-values";
import { useUpdateSourceHandleValues } from "../../hooks/use-update-source-handle-values";
import { NodeData } from "../../types/node-data";
import { Chip } from "./chip";
import NodeWrapper from "./node-wrapper";

const Multiplexer: React.FC<NodeProps<Node<NodeData>>> = (props) => {
  const { id } = props;
  const inputs = [
    useInputValue("inputA"),
    useInputValue("inputB"),
    useInputValue("inputC"),
    useInputValue("inputD"),
  ];
  const inputControlA = useInputValue("inputControlA");
  const inputControlB = useInputValue("inputControlB");

  const { updateSourceHandleValue } = useUpdateSourceHandleValues(id);

  // Control A is the most significant select bit
  const selected = (inputControlA ? 2 : 0) + (inputControlB ? 1 : 0);
  const outputValue = inputs[selected];

  useEffect(() => {
    updateSourceHandleValue("output", outputValue);
  }, [outputValue, updateSourceHandleValue]);

  return (
    <NodeWrapper {...props}>
      <Chip
        iconSrc={multiplexerIcon}
        label="MUX"
        pins={[
          ...["A", "B", "C", "D"].map((name, i) => ({
            id: `input${name}`,
            type: "target" as const,
            side: Position.Left,
            at: 20 + i * 20,
            state: inputs[i],
            label: `${i}`,
          })),
          { id: "inputControlA", type: "target", side: Position.Bottom, at: 35, state: inputControlA },
          { id: "inputControlB", type: "target", side: Position.Bottom, at: 65, state: inputControlB },
          { id: "output", type: "source", side: Position.Right, at: 50, state: outputValue },
        ]}
      />
    </NodeWrapper>
  );
};

export default Multiplexer;
