import { Node, NodeProps, Position } from "@xyflow/react";
import { PiToggleLeft, PiToggleRightFill } from "react-icons/pi";
import { styleConstants } from "../../constants/styleConstants";
import { useUpdateSourceHandleValues } from "../../hooks/use-update-source-handle-values";
import { NodeData } from "../../types/node-data";
import { Container } from "../common/container";
import NodeHandle from "../handles/node-handle";
import NodeWrapper from "./node-wrapper";

const Switch = (props: NodeProps<Node<NodeData>>) => {
  const { id, data } = props;

  const switchValue = data.sourceHandleValues.find(
    (v) => v.id == "switchValue"
  )?.value;

  const { updateSourceHandleValue } = useUpdateSourceHandleValues(id);

  const toggleSwitch = () => {
    updateSourceHandleValue("switchValue", !switchValue);
  };

  return (
    <NodeWrapper {...props}>
      <NodeHandle type="source" position={Position.Right} id={"switchValue"} />
      <Container>
        {switchValue ? (
          <PiToggleRightFill
            size={styleConstants.nodeIconSize}
            onClick={toggleSwitch}
          />
        ) : (
          <PiToggleLeft
            size={styleConstants.nodeIconSize}
            onClick={toggleSwitch}
          />
        )}
      </Container>
    </NodeWrapper>
  );
};

export default Switch;
