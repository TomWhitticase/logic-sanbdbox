import { Panel } from "@xyflow/react";
import { TbHelp } from "react-icons/tb";
import { VscClose } from "react-icons/vsc";
import { useSearchParams } from "react-router-dom";
import { localStorageKeys } from "../../constants/local-storage-keys";
import { styleConstants } from "../../constants/style-constants";
import Key from "../common/key";
import { ReactNode, useEffect } from "react";
import { nodeTypes } from "../../constants/node-types";
import Bulb from "../nodes/bulb";
import And from "../nodes/and";
import Buffer from "../nodes/buffer";
import Clock from "../nodes/clock";
import DFlipFlop from "../nodes/d-flip-flop";
import Demultiplexer from "../nodes/demultiplexer";
import FullAdder from "../nodes/full-adder";
import HexDisplay from "../nodes/hex-display";
import HexInput from "../nodes/hex-input";
import Multiplexer from "../nodes/multiplexer";
import Nand from "../nodes/nand";
import Nor from "../nodes/nor";
import Not from "../nodes/not";
import Or from "../nodes/or";
import PushButton from "../nodes/push-button";
import Switch from "../nodes/switch";
import Xnor from "../nodes/xnor";
import Xor from "../nodes/xor";
import SevenSegmentDisplay from "../nodes/seven-segment-display";

const emptyNodeProps = {
  id: "",
  data: {
    rotation: 0,
    sourceHandleValues: [],
  },
  type: "",
  dragging: false,
  zIndex: 0,
  isConnectable: false,
  positionAbsoluteX: 0,
  positionAbsoluteY: 0,
};

const nodeHelp: { [K in keyof typeof nodeTypes]: ReactNode } = {
  Bulb: (
    <>
      <h2 className="mb-4 text-xl font-bold">Bulb</h2>
      <p className="mb-4 text-gray-700">
        A bulb that lights up when the input signal is <strong>true</strong>.
        <div className="flex items-center justify-center gap-4 p-2">
          <Bulb {...emptyNodeProps} />
        </div>
      </p>
    </>
  ),
  Switch: (
    <>
      <h2 className="mb-4 text-xl font-bold">Switch</h2>
      <p className="mb-4 text-gray-700">
        A switch that can be toggled between <strong>on</strong> and{" "}
        <strong>off</strong> states to control the flow of a signal.
        <div className="flex items-center justify-center gap-4 p-2">
          <Switch {...emptyNodeProps} />
        </div>
      </p>
    </>
  ),
  PushButton: (
    <>
      <h2 className="mb-4 text-xl font-bold">PushButton</h2>
      <p className="mb-4 text-gray-700">
        A push button that sends a signal when pressed. The signal returns to
        its default state when released.
        <div className="flex items-center justify-center gap-4 p-2">
          <PushButton {...emptyNodeProps} />
        </div>
      </p>
    </>
  ),
  Not: (
    <>
      <h2 className="mb-4 text-xl font-bold">Not</h2>
      <p className="mb-4 text-gray-700">
        A NOT gate that inverts the input signal. If the input is{" "}
        <strong>true</strong>, the output will be <strong>false</strong>, and
        vice versa.
        <div className="flex items-center justify-center gap-4 p-2">
          <Not {...emptyNodeProps} />
        </div>
      </p>
    </>
  ),
  And: (
    <>
      <h2 className="mb-4 text-xl font-bold">And</h2>
      <p className="mb-4 text-gray-700">
        An AND gate that outputs <strong>true</strong> only when both of its
        inputs are <strong>true</strong>.
        <div className="flex items-center justify-center gap-4 p-2">
          <And {...emptyNodeProps} />
        </div>
      </p>
    </>
  ),
  Or: (
    <>
      <h2 className="mb-4 text-xl font-bold">Or</h2>
      <p className="mb-4 text-gray-700">
        An OR gate that outputs <strong>true</strong> when at least one of its
        inputs is <strong>true</strong>.
        <div className="flex items-center justify-center gap-4 p-2">
          <Or {...emptyNodeProps} />
        </div>
      </p>
    </>
  ),
  Clock: (
    <>
      <h2 className="mb-4 text-xl font-bold">Clock</h2>
      <p className="mb-4 text-gray-700">
        A clock that generates a periodic square wave signal, useful for timing
        and synchronization.
        <div className="flex items-center justify-center gap-4 p-2">
          <Clock
            {...{
              ...emptyNodeProps,
              data: {
                ...emptyNodeProps.data,
                intervalPeriod: 1000,
              },
            }}
          />
        </div>
      </p>
    </>
  ),
  Xor: (
    <>
      <h2 className="mb-4 text-xl font-bold">Xor</h2>
      <p className="mb-4 text-gray-700">
        An XOR gate that outputs <strong>true</strong> when exactly one of its
        inputs is <strong>true</strong>.
        <div className="flex items-center justify-center gap-4 p-2">
          <Xor {...emptyNodeProps} />
        </div>
      </p>
    </>
  ),
  Nand: (
    <>
      <h2 className="mb-4 text-xl font-bold">Nand</h2>
      <p className="mb-4 text-gray-700">
        A NAND gate that outputs <strong>false</strong> only when both inputs
        are <strong>true</strong>.
        <div className="flex items-center justify-center gap-4 p-2">
          <Nand {...emptyNodeProps} />
        </div>
      </p>
    </>
  ),
  Nor: (
    <>
      <h2 className="mb-4 text-xl font-bold">Nor</h2>
      <p className="mb-4 text-gray-700">
        A NOR gate that outputs <strong>false</strong> when at least one of its
        inputs is <strong>true</strong>.
        <div className="flex items-center justify-center gap-4 p-2">
          <Nor {...emptyNodeProps} />
        </div>
      </p>
    </>
  ),
  Xnor: (
    <>
      <h2 className="mb-4 text-xl font-bold">Xnor</h2>
      <p className="mb-4 text-gray-700">
        An XNOR gate that outputs <strong>true</strong> when both inputs are
        either <strong>true</strong> or <strong>false</strong> (i.e., they are
        the same).
        <div className="flex items-center justify-center gap-4 p-2">
          <Xnor {...emptyNodeProps} />
        </div>
      </p>
    </>
  ),
  HexDisplay: (
    <>
      <h2 className="mb-4 text-xl font-bold">Hex Display</h2>
      <p className="mb-4 text-gray-700">
        A display that received four binary inputs and shows the equivalent
        hexadecimal value.
        <div className="flex items-center justify-center gap-4 p-2">
          <HexDisplay {...emptyNodeProps} />
        </div>
      </p>
    </>
  ),
  Buffer: (
    <>
      <h2 className="mb-4 text-xl font-bold">Buffer</h2>
      <p className="mb-4 text-gray-700">
        A buffer that outputs the input signal without any change.
        <div className="flex items-center justify-center gap-4 p-2">
          <Buffer {...emptyNodeProps} />
        </div>
      </p>
    </>
  ),
  HexInput: (
    <>
      <h2 className="mb-4 text-xl font-bold">Hex Input</h2>
      <p className="mb-4 text-gray-700">
        An input component that allows users enter a hexadecimal value and
        outputs the binary equivalent on four output lines.
        <div className="flex items-center justify-center gap-4 p-2">
          <HexInput
            {...{
              ...emptyNodeProps,
              data: {
                ...emptyNodeProps.data,
                inputValue: "5",
              },
            }}
          />
        </div>
      </p>
    </>
  ),
  Multiplexer: (
    <>
      <h2 className="mb-4 text-xl font-bold">Multiplexer</h2>
      <p className="mb-4 text-gray-700">
        A multiplexer that selects one of several input signals based on a
        control signal and forwards the chosen input to the output.
        <div className="flex items-center justify-center gap-4 p-2">
          <Multiplexer {...emptyNodeProps} />
        </div>
      </p>
    </>
  ),
  Demultiplexer: (
    <>
      <h2 className="mb-4 text-xl font-bold">Demultiplexer</h2>
      <p className="mb-4 text-gray-700">
        A demultiplexer that takes a single input signal and routes it to one of
        several outputs based on a control signal.
        <div className="flex items-center justify-center gap-4 p-2">
          <Demultiplexer {...emptyNodeProps} />
        </div>
      </p>
    </>
  ),
  DFlipFlop: (
    <>
      <h2 className="mb-4 text-xl font-bold">D Flip-Flop</h2>
      <p className="mb-4 text-gray-700">
        A D flip-flop that captures and holds a single bit of data based on a
        clock signal, providing stable data storage. The left inputs from top to
        bottom are D, CLK, and the right outputs are Q and Q'. When CLK changes
        to true (rising edge), the value of D is captured and stored in Q.
        <div className="flex items-center justify-center gap-4 p-2">
          <DFlipFlop {...emptyNodeProps} />
        </div>
      </p>
    </>
  ),
  FullAdder: (
    <>
      <h2 className="mb-4 text-xl font-bold">FullAdder</h2>
      <p className="mb-4 text-gray-700">
        A full adder that adds three input bits (two significant bits and a
        carry-in bit) and produces a sum and carry-out.
        <div className="flex items-center justify-center gap-4 p-2">
          <FullAdder {...emptyNodeProps} />
        </div>
      </p>
    </>
  ),
  SevenSegmentDisplay: (
    <>
      <h2 className="mb-4 text-xl font-bold">Seven Segment Display</h2>
      <p className="mb-4 text-gray-700">
        A display that shows decimal digits using seven segments. There is an
        input for each segement and an additional input for the decimal point.
        <div className="flex items-center justify-center gap-4 p-2">
          <SevenSegmentDisplay {...emptyNodeProps} />
        </div>
      </p>
    </>
  ),
};

const MainHelp = () => (
  <>
    <h2 className="mb-4 text-xl font-bold">Welcome to Logic Sandbox</h2>
    <p className="mb-4 text-gray-700">
      This is a playground for creating interactive logic circuits.
    </p>
    <p className="mb-4 text-gray-700">
      Get started by adding nodes with the menu on the left. Connect them by
      dragging from the output of one node to the input of another.
    </p>
    <p className="mb-4 text-gray-700">
      Right click on a node to see more options.
    </p>
    <p className="mb-4 text-gray-700">
      To select multiple nodes, hold down the shift key while clicking and
      dragging. You can move around the selection or copy
      <Key keyboardKey="copy" />, cut <Key keyboardKey="cut" />, and paste
      <Key keyboardKey="paste" />.
    </p>
    <a href="https://tomwhitticase.com" className="text-blue-500">
      Created by Tom Whitticase
    </a>
  </>
);

export const Help = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Show help modal on first visit
  useEffect(() => {
    if (localStorage.getItem(localStorageKeys.readHelpBefore) !== "true")
      setSearchParams({ help: "about" });
  }, []);

  const help = searchParams.get("help");
  const helpOpen = !!searchParams.get("help");

  const handleCloseModal = () => {
    localStorage.setItem(localStorageKeys.readHelpBefore, "true");
    setSearchParams({});
  };

  const handleOpenModal = () => {
    setSearchParams({ help: "about" });
  };

  return (
    <>
      <Panel position="top-right">
        <TbHelp
          className="p-1 bg-white border-2 rounded-full cursor-pointer"
          size={styleConstants.nodeIconSize}
          onClick={() => handleOpenModal()}
        />
      </Panel>
      {helpOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-25"
          onClick={() => handleCloseModal()}
        >
          <div
            className="relative max-w-lg p-6 mx-auto bg-white border-2 rounded-md shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {help === "about" ? (
              <MainHelp />
            ) : (
              nodeHelp[help as keyof typeof nodeTypes]
            )}
            <button
              onClick={() => handleCloseModal()}
              className="absolute text-gray-400 top-2 right-2 hover:text-gray-600"
            >
              <VscClose size={styleConstants.nodeIconSize} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
