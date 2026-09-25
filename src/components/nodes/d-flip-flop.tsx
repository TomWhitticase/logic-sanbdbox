import { Node, NodeProps, Position } from "@xyflow/react";
import React, { useEffect, useRef } from "react";
import dFlipFlopIcon from "../../assets/d-flip-flop-icon.svg";
import { useInputValue } from "../../hooks/use-target-handle-values";
import { useUpdateSourceHandleValues } from "../../hooks/use-update-source-handle-values";
import { NodeData } from "../../types/node-data";
import { Chip } from "./chip";
import NodeWrapper from "./node-wrapper";

const DFlipFlop: React.FC<NodeProps<Node<NodeData>>> = (props) => {
  const { id, data } = props;
  const { updateAllSourceHandleValues } = useUpdateSourceHandleValues(id);

  const storedQ = data.sourceHandleValues?.find((h) => h.id === "q");
  const q = storedQ?.value ?? false;

  const dataIn = useInputValue("dataIn");
  const clockIn = useInputValue("clock");

  // Capture D only on a rising clock edge
  const previousClock = useRef(clockIn);
  useEffect(() => {
    const risingEdge = clockIn && !previousClock.current;
    previousClock.current = clockIn;
    if (risingEdge) {
      updateAllSourceHandleValues([
        { id: "q", value: dataIn },
        { id: "qNot", value: !dataIn },
      ]);
    }
  }, [clockIn, dataIn, updateAllSourceHandleValues]);

  // A fresh flip-flop starts reset: Q = 0, Q' = 1
  useEffect(() => {
    if (!storedQ) {
      updateAllSourceHandleValues([
        { id: "q", value: false },
        { id: "qNot", value: true },
      ]);
    }
  }, [storedQ, updateAllSourceHandleValues]);

  return (
    <NodeWrapper {...props}>
      <Chip
        iconSrc={dFlipFlopIcon}
        label="D FF"
        pins={[
          { id: "dataIn", type: "target", side: Position.Left, at: 35, state: dataIn, label: "D" },
          { id: "clock", type: "target", side: Position.Left, at: 65, state: clockIn, label: "CLK" },
          { id: "q", type: "source", side: Position.Right, at: 35, state: q, label: "Q" },
          { id: "qNot", type: "source", side: Position.Right, at: 65, state: !q, label: "Q'" },
        ]}
      />
    </NodeWrapper>
  );
};

export default DFlipFlop;
