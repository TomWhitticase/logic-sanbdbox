import { Node, NodeProps, Position } from "@xyflow/react";
import { IoMdRadioButtonOn } from "react-icons/io";
import { styleConstants } from "../../constants/style-constants";
import { useUpdateSourceHandleValues } from "../../hooks/use-update-source-handle-values";
import { NodeData } from "../../types/node-data";
import { Container } from "../common/container";
import NodeHandle from "../handles/node-handle";
import NodeWrapper from "./node-wrapper";

const pushButtonTime = 200;

const PushButton: React.FC<NodeProps<Node<NodeData>>> = (props) => {
  const { id, data } = props;

  const buttonValue =
    data.sourceHandleValues.find((v) => v.id == "outputValue")?.value ?? false;

  const { updateSourceHandleValue } = useUpdateSourceHandleValues(id);

  const handlePushButton = () => {
    updateSourceHandleValue("outputValue", true);
    setTimeout(() => {
      updateSourceHandleValue("outputValue", false);
    }, pushButtonTime);
  };

  return (
    <NodeWrapper {...props}>
      <NodeHandle
        state={buttonValue}
        type="source"
        position={Position.Right}
        id={"outputValue"}
      />
      <Container>
        <IoMdRadioButtonOn
          color={
            buttonValue
              ? styleConstants.activeColor
              : styleConstants.inactiveColor
          }
          size={styleConstants.nodeIconSize}
          onClick={buttonValue ? undefined : () => handlePushButton()}
        />
      </Container>
    </NodeWrapper>
  );
};

export default PushButton;
