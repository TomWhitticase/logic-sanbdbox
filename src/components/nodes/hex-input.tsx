import { Node, NodeProps, Position, useReactFlow } from "@xyflow/react";
import React from "react";
import { NodeData } from "../../types/node-data";
import { Container } from "../common/container";
import NodeHandle from "../handles/node-handle";
import NodeWrapper from "./node-wrapper";

const getSourceHanldeValuesFromHexString = (value: string) => {
  const map: Record<string, [boolean, boolean, boolean, boolean]> = {
    "0": [false, false, false, false],
    "1": [false, false, false, true],
    "2": [false, false, true, false],
    "3": [false, false, true, true],
    "4": [false, true, false, false],
    "5": [false, true, false, true],
    "6": [false, true, true, false],
    "7": [false, true, true, true],
    "8": [true, false, false, false],
    "9": [true, false, false, true],
    A: [true, false, true, false],
    B: [true, false, true, true],
    C: [true, true, false, false],
    D: [true, true, false, true],
    E: [true, true, true, false],
    F: [true, true, true, true],
  };
  const valuesArray = map[value] ?? [false, false, false, false];
  return [
    { id: "outputA", value: valuesArray[0] },
    { id: "outputB", value: valuesArray[1] },
    { id: "outputC", value: valuesArray[2] },
    { id: "outputD", value: valuesArray[3] },
  ];
};

const HexInput: React.FC<
  NodeProps<
    Node<
      NodeData & {
        inputValue?: string;
      }
    >
  >
> = (props) => {
  const { id, data } = props;

  const { updateNodeData } = useReactFlow();

  const inputValue = data.inputValue || "";

  const handleInputChange = (InputValue: string) => {
    const value = InputValue[InputValue.length - 1] ?? "";
    if (!value.match(/[0-9A-Fa-f]/)) return;
    updateNodeData(id, () => ({
      inputValue: value.toUpperCase(),
      sourceHandleValues: getSourceHanldeValuesFromHexString(
        value.toUpperCase()
      ),
    }));
  };

  const outputStates = data.sourceHandleValues.map((h) => h.value);

  return (
    <NodeWrapper {...props}>
      <div className="flex">
        <Container>
          <div className="p-1">
            <input
              className="flex items-center justify-center w-12 h-12 text-2xl font-bold text-center border-2 border-black rounded"
              value={inputValue}
              type="string"
              onChange={({ target }) => handleInputChange(target.value)}
            />
          </div>
        </Container>
        <div className="relative flex flex-col">
          <div className="absolute top-[20%]">
            <NodeHandle
              state={outputStates[0]}
              type="source"
              position={Position.Right}
              id="outputA"
            />
          </div>
          <div className="absolute top-[40%]">
            <NodeHandle
              state={outputStates[1]}
              type="source"
              position={Position.Right}
              id="outputB"
            />
          </div>
          <div className="absolute top-[60%]">
            <NodeHandle
              state={outputStates[2]}
              type="source"
              position={Position.Right}
              id="outputC"
            />
          </div>
          <div className="absolute top-[80%]">
            <NodeHandle
              state={outputStates[3]}
              type="source"
              position={Position.Right}
              id="outputD"
            />
          </div>
        </div>
      </div>
    </NodeWrapper>
  );
};

export default HexInput;
