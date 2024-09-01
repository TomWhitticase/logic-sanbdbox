import {
  NodeTypes,
  Panel,
  useEdges,
  useNodes,
  useReactFlow,
  useViewport,
} from "@xyflow/react";
import React, { useCallback, useEffect, useState } from "react";
import { FaRegSave } from "react-icons/fa";
import { FaRegFolderOpen } from "react-icons/fa6";
import { MdMenu, MdMenuOpen } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import {
  nodeDefinitionsArray,
  NodeType,
  nodeTypes,
} from "../../constants/node-types";
import { useMousePosition } from "../../hooks/use-mouse-position";
import { loadFromDevice, saveToDevice } from "../../utils/save-and-open-utils";
import { Button } from "../common/button";
import { Container } from "../common/container";
import { Title } from "../common/title";
import Tooltip from "../common/tooltip";

const inputComponents = nodeDefinitionsArray.filter((v) => {
  const inputTypes: NodeType[] = ["switch", "clock", "pushButton", "hexInput"];
  return inputTypes.some((type) => type === v.id);
});
const logicGateComponents = nodeDefinitionsArray.filter((v) => {
  const inputTypes: NodeType[] = [
    "buffer",
    "not",
    "and",
    "nand",
    "or",
    "nor",
    "xor",
    "xnor",
  ];
  return inputTypes.some((type) => type === v.id);
});
const outputComponents = nodeDefinitionsArray.filter((v) => {
  const inputTypes: NodeType[] = ["bulb", "SevenSegmentDisplay", "hexDisplay"];
  return inputTypes.some((type) => type === v.id);
});
const advancedComponents = nodeDefinitionsArray.filter((v) => {
  const inputTypes: NodeType[] = [
    "multiplexer",
    "demultiplexer",
    "fullAdder",
    "dFlipFlop",
  ];
  return inputTypes.some((type) => type === v.id);
});

const NodeMenu: React.FC = () => {
  const { addNodes, setNodes, setEdges, getNode, updateNode } = useReactFlow();
  const nodes = useNodes();
  const edges = useEdges();

  const { x, y, zoom } = useViewport();

  const [menuOpen, setMenuOpen] = React.useState(true);

  const { screenToFlowPosition } = useReactFlow();

  const addNode = useCallback(
    (nodeType: keyof NodeTypes, mousePos?: { x: number; y: number }) => {
      const pos = !mousePos
        ? {
            x: (window.innerWidth / 2 - x) / zoom,
            y: (window.innerHeight / 2 - y) / zoom,
          }
        : screenToFlowPosition({
            x: mousePos.x,
            y: mousePos.y,
          });

      const newId = `${nodeType}-${Date.now()}`;
      addNodes({
        id: newId,
        data: { sourceHandleValues: [], rotation: 0 },
        type: nodeType,
        position: { x: pos.x, y: pos.y },
        zIndex: nodes.length,
      });
    },
    [addNodes, getNode, nodes.length, screenToFlowPosition, updateNode]
  );

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

  const dragNDropRef = React.useRef<HTMLDivElement>(null);

  const mousePos = useMousePosition();

  const [nodeToAdd, setNodeToAdd] = useState<keyof NodeTypes | null>(null);

  useEffect(() => {
    const dragNDropElement = dragNDropRef.current;
    if (!dragNDropElement) return;
    dragNDropElement.style.left = `${mousePos.x}px`;
    dragNDropElement.style.top = `${mousePos.y}px`;
  }, [mousePos, nodeToAdd]);

  const handleMouseUp = useCallback(() => {
    if (nodeToAdd) addNode(nodeToAdd, mousePos);
    setNodeToAdd(null);
  }, [nodeToAdd, addNode, mousePos]);

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseUp]);

  return (
    <>
      {nodeToAdd && (
        <div
          ref={dragNDropRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1000,
            pointerEvents: "none",
          }}
        >
          {React.createElement(nodeTypes[nodeToAdd], {
            data: { sourceHandleValues: [], rotation: 0 },
            zIndex: 0,
            id: "drag-and-drop-node",
            type: nodeToAdd,
            dragging: false,
            isConnectable: false,
            positionAbsoluteX: 0,
            positionAbsoluteY: 0,
          })}
        </div>
      )}
      <Panel>
        <Container>
          {menuOpen ? (
            <div className="flex flex-col w-40">
              <div className="flex items-center justify-start">
                <button
                  className="p-2 border-0 rounded-full"
                  onClick={() => setMenuOpen(false)}
                >
                  <MdMenuOpen />
                </button>
              </div>
              <div className="flex flex-col gap-2 px-2 pb-2">
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
                <div className="flex flex-col">
                  <Title content="Components" />
                  <div className="overflow-y-scroll flex flex-col rounded gap-2 border-2 px-2 pb-2 overflow-x-visible overflow-visible max-h-[450px]">
                    <div className="flex flex-col">
                      <Title content="Inputs" variant="small" />
                      <div className="flex flex-wrap items-start justify-start gap-1">
                        {inputComponents.map(({ displayName, id, icon }) => (
                          <Tooltip label={displayName} key={id}>
                            <Button
                              variant="secondary"
                              onMouseDown={() => setNodeToAdd(id)}
                            >
                              {icon}
                            </Button>
                          </Tooltip>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <Title content="Outputs" variant="small" />
                      <div className="flex flex-wrap items-start justify-start gap-1">
                        {outputComponents.map(({ icon, id, displayName }) => (
                          <Tooltip label={displayName} key={id}>
                            <Button
                              variant="secondary"
                              onMouseDown={() => setNodeToAdd(id)}
                            >
                              {icon}
                            </Button>
                          </Tooltip>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <Title content="Logic Gates" variant="small" />
                      <div className="flex flex-wrap items-start justify-start gap-1">
                        {logicGateComponents.map(
                          ({ icon, id, displayName }) => (
                            <Tooltip label={displayName} key={id}>
                              <Button
                                variant="secondary"
                                onMouseDown={() => setNodeToAdd(id)}
                              >
                                {icon}
                              </Button>
                            </Tooltip>
                          )
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <Title content="Advanced" variant="small" />
                      <div className="flex flex-wrap items-start justify-start gap-1">
                        {advancedComponents.map(({ icon, id, displayName }) => (
                          <Tooltip label={displayName} key={id}>
                            <Button
                              variant="secondary"
                              onMouseDown={() => setNodeToAdd(id)}
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
    </>
  );
};

export default NodeMenu;
