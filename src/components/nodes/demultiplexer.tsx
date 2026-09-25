import { Node, NodeProps, Position } from "@xyflow/react";
import React, { useEffect } from "react";
import demultiplexerIcon from "../../assets/demultiplexer-icon.svg";
import { useInputValue } from "../../hooks/use-target-handle-values";
import { useUpdateSourceHandleValues } from "../../hooks/use-update-source-handle-values";
import { NodeData } from "../../types/node-data";
import { Chip } from "./chip";
import NodeWrapper from "./node-wrapper";

const outputNames = ["A", "B", "C", "D"];

const Demultiplexer: React.FC<NodeProps<Node<NodeData>>> = (props) => {
  const { id } = props;
  const input = useInputValue("input");
  const inputControlA = useInputValue("inputControlA");
  const inputControlB = useInputValue("inputControlB");

  const { updateAllSourceHandleValues } = useUpdateSourceHandleValues(id);

  // Control A is the most significant select bit
  const selected = (inputControlA ? 2 : 0) + (inputControlB ? 1 : 0);
  const outputs = outputNames.map((_, i) => input && i === selected);
  const outputsKey = outputs.join(",");

  useEffect(() => {
    updateAllSourceHandleValues(
      outputsKey
        .split(",")
        .map((v, i) => ({ id: `output${outputNames[i]}`, value: v === "true" }))
    );
  }, [outputsKey, updateAllSourceHandleValues]);

  return (
    <NodeWrapper {...props}>
      <Chip
        iconSrc={demultiplexerIcon}
        label="DEMUX"
        pins={[
          { id: "input", type: "target", side: Position.Left, at: 50, state: input },
          ...outputNames.map((name, i) => ({
            id: `output${name}`,
            type: "source" as const,
            side: Position.Right,
            at: 20 + i * 20,
            state: outputs[i],
            label: `${i}`,
          })),
          { id: "inputControlA", type: "target", side: Position.Bottom, at: 35, state: inputControlA },
          { id: "inputControlB", type: "target", side: Position.Bottom, at: 65, state: inputControlB },
        ]}
      />
    </NodeWrapper>
  );
};

export default Demultiplexer;
