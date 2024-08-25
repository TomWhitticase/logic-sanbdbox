import { Node, NodeProps, Position } from "@xyflow/react";
import { IoMdRadioButtonOn } from "react-icons/io";
import { styleConstants } from "../../constants/styleConstants";
import { useUpdateSourceHandleValues } from "../../hooks/use-update-source-handle-values";
import { NodeData } from "../../types/node-data";
import { Container } from "../common/container";
import NodeHandle from "../handles/node-handle";
import NodeWrapper from "./node-wrapper";

const pushButtonTime = 200;

const PushButton = (props: NodeProps<Node<NodeData>>) => {
  const { id, data } = props;

  const switchValue = data.sourceHandleValues.find(
    (v) => v.id == "switchValue"
  )?.value;

  const { updateSourceHandleValue } = useUpdateSourceHandleValues(id);

  const handlePushButton = () => {
    updateSourceHandleValue("switchValue", true);
    setTimeout(() => {
      updateSourceHandleValue("switchValue", false);
    }, pushButtonTime);
  };

  return (
    <NodeWrapper {...props}>
      <NodeHandle type="source" position={Position.Right} id={"switchValue"} />
      <Container>
        <IoMdRadioButtonOn
          color={switchValue ? "orange" : "black"}
          size={styleConstants.nodeIconSize}
          onClick={switchValue ? undefined : () => handlePushButton()}
        />
      </Container>
    </NodeWrapper>
  );
};

export default PushButton;
