// NodeMenu.tsx
import {
  Panel,
  useEdges,
  useNodes,
  useReactFlow,
  useViewport,
} from "@xyflow/react";
import React from "react";
import { FaRegSave } from "react-icons/fa";
import { FaRegFolderOpen } from "react-icons/fa6";
import { FiClock } from "react-icons/fi";
import { IoMdRadioButtonOn } from "react-icons/io";
import { IoBulbOutline } from "react-icons/io5";
import { MdMenu, MdMenuOpen } from "react-icons/md";
import { PiToggleLeft } from "react-icons/pi";
import { RiDeleteBinLine } from "react-icons/ri";
import {
  TbLogicAnd,
  TbLogicNand,
  TbLogicNor,
  TbLogicOr,
  TbLogicXnor,
  TbLogicXor,
  TbSquareNumber0,
  TbSquareNumber0Filled,
} from "react-icons/tb";
import BufferIcon from "../../assets/buffer-icon.svg";
import NotIcon from "../../assets/not-icon.svg";
import nodeTypes from "../../constants/nodeTypes";
import demultiplexerIcon from "../../assets/demultiplexer-icon.svg";
import multiplexerIcon from "../../assets/multiplexer-icon.svg";
import dFlipFlopIcon from "../../assets/d-flip-flop-icon.svg";
import { styleConstants } from "../../constants/styleConstants";
import { loadFromDevice, saveToDevice } from "../../utils/save-and-open-utils";
import { Button } from "../common/button";
import { Container } from "../common/container";
import { Title } from "../common/title";
import Tooltip from "../common/tooltip";

const NodeMenu: React.FC = () => {
  const { addNodes, setNodes, setEdges } = useReactFlow();
  const nodes = useNodes();
  const edges = useEdges();

  const [menuOpen, setMenuOpen] = React.useState(true);

  const { x, y, zoom } = useViewport();

  const addNode = (type: string) => {
    const flowCenterX = (window.innerWidth / 2 - x) / zoom;
    const flowCenterY = (window.innerHeight / 2 - y) / zoom;
    addNodes({
      id: `${type}-${Date.now()}`,
      data: { sourceHandleValues: [], rotation: 0 },
      type,
      position: { x: flowCenterX, y: flowCenterY },
      zIndex: nodes.length,
    });
  };

  const handleReset = () => {
    setNodes([]);
    setEdges([]);
  };

  const handleSave = () => {
    saveToDevice({ nodes, edges });
  };

  const handleOpen = async () => {
    const data = await loadFromDevice();
    if (!data) return;
    const { nodes, edges } = data;
    setNodes(nodes);
    setEdges(edges);
  };

  return (
    <Panel>
      <Container>
        {menuOpen ? (
          <div className="flex flex-col w-36">
            <div className="flex items-center justify-start">
              <button
                className="p-2 border-0 rounded-full"
                onClick={() => setMenuOpen(false)}
              >
                <MdMenuOpen />
              </button>
            </div>

            <div className="flex flex-col gap-1 px-2 pb-2">
              <div className="flex flex-col gap-1">
                <Title content="Options" />
                <div className="flex flex-col items-start justify-center gap-1">
                  <Button variant="menu" onClick={() => handleReset()}>
                    <RiDeleteBinLine /> Reset
                  </Button>
                  <Button variant="menu" onClick={() => handleSave()}>
                    <FaRegSave /> Save
                  </Button>
                  <Button variant="menu" onClick={() => handleOpen()}>
                    <FaRegFolderOpen /> Open
                  </Button>
                </div>
              </div>
              <div className="overflow-y-scroll overflow-x-visible overflow-visible max-h-[500px]">
                <div className="flex flex-col">
                  <Title content="Inputs" />
                  <div className="flex flex-wrap items-start justify-start gap-1">
                    {[
                      {
                        name: "PushButton",
                        tooltipLabel: "Push Button",
                        type: nodeTypes.PushButton,
                        icon: (
                          <IoMdRadioButtonOn
                            size={styleConstants.nodeIconSize}
                          />
                        ),
                      },
                      {
                        name: "Switch",
                        tooltipLabel: "Toggle Switch",
                        type: nodeTypes.Switch,
                        icon: (
                          <PiToggleLeft size={styleConstants.nodeIconSize} />
                        ),
                      },
                      {
                        name: "Clock",
                        tooltipLabel: "Clock",
                        type: nodeTypes.Clock,
                        icon: <FiClock size={styleConstants.nodeIconSize} />,
                      },
                      {
                        name: "HexInput",
                        tooltipLabel: "Hex Input",
                        type: nodeTypes.HexInput,
                        icon: (
                          <TbSquareNumber0 size={styleConstants.nodeIconSize} />
                        ),
                      },
                    ].map(({ icon, name, tooltipLabel }) => (
                      <Tooltip label={tooltipLabel} key={name}>
                        <Button
                          variant="secondary"
                          onClick={() => addNode(name)}
                        >
                          {icon}
                        </Button>
                      </Tooltip>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col">
                  <Title content="Outputs" />
                  <div className="flex flex-wrap items-start justify-start gap-1">
                    {[
                      {
                        name: "Bulb",
                        tooltipLabel: "Bulb",
                        type: nodeTypes.Bulb,
                        icon: (
                          <IoBulbOutline size={styleConstants.nodeIconSize} />
                        ),
                      },
                      {
                        name: "HexDisplay",
                        tooltipLabel: "Hex Display",
                        type: nodeTypes.HexDisplay,
                        icon: (
                          <TbSquareNumber0Filled
                            size={styleConstants.nodeIconSize}
                          />
                        ),
                      },
                    ].map(({ icon, name, tooltipLabel }) => (
                      <Tooltip label={tooltipLabel} key={name}>
                        <Button
                          variant="secondary"
                          onClick={() => addNode(name)}
                        >
                          {icon}
                        </Button>
                      </Tooltip>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col">
                  <Title content="Logic Gates" />
                  <div className="flex flex-wrap items-start justify-start gap-1">
                    {[
                      {
                        name: "Buffer",
                        tooltipLabel: "Buffer",
                        type: nodeTypes.Buffer,
                        icon: (
                          <img
                            src={BufferIcon}
                            alt="buffer-icon"
                            style={{ width: styleConstants.nodeIconSize }}
                          />
                        ),
                      },
                      {
                        name: "Not",
                        tooltipLabel: "Not",
                        type: nodeTypes.Not,
                        icon: (
                          <img
                            src={NotIcon}
                            style={{ width: styleConstants.nodeIconSize }}
                          />
                        ),
                      },
                      {
                        name: "And",
                        tooltipLabel: "And",
                        type: nodeTypes.And,
                        icon: <TbLogicAnd size={styleConstants.nodeIconSize} />,
                      },
                      {
                        name: "Nand",
                        tooltipLabel: "Nand",
                        type: nodeTypes.Nand,
                        icon: (
                          <TbLogicNand size={styleConstants.nodeIconSize} />
                        ),
                      },
                      {
                        name: "Or",
                        tooltipLabel: "Or",
                        type: nodeTypes.Or,
                        icon: <TbLogicOr size={styleConstants.nodeIconSize} />,
                      },
                      {
                        name: "Xor",
                        tooltipLabel: "Xor",
                        type: nodeTypes.Xor,
                        icon: <TbLogicXor size={styleConstants.nodeIconSize} />,
                      },
                      {
                        name: "Nor",
                        tooltipLabel: "Nor",
                        type: nodeTypes.Nor,
                        icon: <TbLogicNor size={styleConstants.nodeIconSize} />,
                      },
                      {
                        name: "Xnor",
                        tooltipLabel: "Xnor",
                        type: nodeTypes.Xnor,
                        icon: (
                          <TbLogicXnor size={styleConstants.nodeIconSize} />
                        ),
                      },
                    ].map(({ icon, name, tooltipLabel }) => (
                      <Tooltip label={tooltipLabel} key={name}>
                        <Button
                          variant="secondary"
                          onClick={() => addNode(name)}
                        >
                          {icon}
                        </Button>
                      </Tooltip>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col">
                  <Title content="Advanced" />
                  <div className="flex flex-wrap items-start justify-start gap-1">
                    {[
                      {
                        name: "Multiplexer",
                        tooltipLabel: "Multiplexer",
                        type: nodeTypes.Multiplexer,
                        icon: (
                          <img
                            src={multiplexerIcon}
                            style={{ width: styleConstants.nodeIconSize }}
                          />
                        ),
                      },
                      {
                        name: "Demultiplexer",
                        tooltipLabel: "Demultiplexer",
                        type: nodeTypes.Demultiplexer,
                        icon: (
                          <img
                            src={demultiplexerIcon}
                            style={{ width: styleConstants.nodeIconSize }}
                          />
                        ),
                      },
                      {
                        name: "DFlipFlop",
                        tooltipLabel: "D Flip-Flop",
                        type: nodeTypes.DFlipFlop,
                        icon: (
                          <img
                            src={dFlipFlopIcon}
                            style={{ width: styleConstants.nodeIconSize }}
                          />
                        ),
                      },
                    ].map(({ icon, name, tooltipLabel }) => (
                      <Tooltip label={tooltipLabel} key={name}>
                        <Button
                          variant="secondary"
                          onClick={() => addNode(name)}
                        >
                          {icon}
                        </Button>
                      </Tooltip>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <button
            className="p-2 border-0 rounded-full"
            onClick={() => setMenuOpen(true)}
          >
            <MdMenu />
          </button>
        )}
      </Container>
    </Panel>
  );
};

export default NodeMenu;
