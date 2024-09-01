import { NodeProps, Position, Node } from "@xyflow/react";
import { useEffect } from "react";
import BufferIcon from "../../assets/buffer-icon.svg";
import { styleConstants } from "../../constants/style-constants";
import { useInputValue } from "../../hooks/use-target-handle-values";
import { useUpdateSourceHandleValues } from "../../hooks/use-update-source-handle-values";
import { NodeData } from "../../types/node-data";
import { Container } from "../common/container";
import NodeHandle from "../handles/node-handle";
import NodeWrapper from "./node-wrapper";

const Buffer: React.FC<NodeProps<Node<NodeData>>> = (props) => {
  const { id } = props;

  const inputValue = useInputValue("input");

  const { updateSourceHandleValue } = useUpdateSourceHandleValues(id);

  useEffect(() => {
    updateSourceHandleValue("output", inputValue);
  }, [inputValue]);

  return (
    <NodeWrapper {...props}>
      <NodeHandle
        state={inputValue}
        type="target"
        position={Position.Left}
        id="input"
      />
      <Container>
        <img
          src={BufferIcon}
          alt="buffer-icon"
          style={{ width: styleConstants.nodeIconSize }}
        />
      </Container>
      <NodeHandle
        state={inputValue}
        type="source"
        position={Position.Right}
        id="output"
      />
    </NodeWrapper>
  );
};

export default Buffer;
