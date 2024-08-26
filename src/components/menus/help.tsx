import { Panel } from "@xyflow/react";
import { TbHelp } from "react-icons/tb";
import { styleConstants } from "../../constants/styleConstants";
import { useState } from "react";
import { VscClose } from "react-icons/vsc";
import Key from "../common/key";
import { localStorageKeys } from "../../constants/local-storage-keys";

export const Help = () => {
  const [modalOpen, setModalOpen] = useState(
    !(localStorage.getItem(localStorageKeys.readHelpBefore) === "true")
  );

  const handleCloseModal = () => {
    localStorage.setItem(localStorageKeys.readHelpBefore, "true");
    setModalOpen(false);
  };

  return (
    <>
      <Panel position="top-right">
        <TbHelp
          className="cursor-pointer"
          size={styleConstants.nodeIconSize}
          onClick={() => setModalOpen(true)}
        />
      </Panel>
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => handleCloseModal()}
        >
          <div className="relative max-w-lg p-6 mx-auto bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-xl font-bold">Welcome to Logic Sandbox</h2>
            <p className="mb-4 text-gray-700">
              This is a playground for creating interactive logic circuits.
            </p>
            <p className="mb-4 text-gray-700">
              Get started by adding nodes with the menu on the left. Connect
              them by dragging from the output of one node to the input of
              another.
            </p>
            <p className="mb-4 text-gray-700">
              Right click on a node to see more options.
            </p>
            <p className="mb-4 text-gray-700">
              To select multiple nodes, hold down the shift key while clicking
              and dragging. You can move around the selection or copy
              <Key keyboardKey="copy" />, cut <Key keyboardKey="cut" />, and
              paste
              <Key keyboardKey="paste" />.
            </p>
            <a href="https://tomwhitticase.com" className="text-blue-500">
              Created by Tom Whitticase
            </a>
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
