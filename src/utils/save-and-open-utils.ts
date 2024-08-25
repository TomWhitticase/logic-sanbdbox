import { Edge, Node } from "@xyflow/react";
import saveAs from "file-saver";

// File System Access API types
interface FilePickerAcceptType {
  description?: string;
  accept: Record<string, string[]>;
}
interface SaveFilePickerOptions {
  suggestedName?: string;
  types?: FilePickerAcceptType[];
  excludeAcceptAllOption?: boolean;
}
interface OpenFilePickerOptions {
  multiple?: boolean;
  types?: FilePickerAcceptType[];
  excludeAcceptAllOption?: boolean;
}
// Enable the File System Access API in the global window object
declare global {
  interface Window {
    showSaveFilePicker?: (
      options?: SaveFilePickerOptions
    ) => Promise<FileSystemFileHandle>;
    showOpenFilePicker?: (
      options?: OpenFilePickerOptions
    ) => Promise<FileSystemFileHandle[]>;
  }
}

export const saveToDevice = async (dataToSave: {
  nodes: Node[];
  edges: Edge[];
}) => {
  const jsonString = JSON.stringify(dataToSave);
  const blob = new Blob([jsonString], { type: "application/json" });

  try {
    if (!window.showSaveFilePicker) {
      throw new Error(
        "File System Access API is not supported in this browser."
      );
    }

    const fileHandle = await window.showSaveFilePicker({
      suggestedName: "logic-sandbox-circuit.json",
      types: [
        {
          description: "JSON Files",
          accept: { "application/json": [".json"] },
        },
      ],
    });

    const writableStream = await fileHandle.createWritable();
    await writableStream.write(blob);
    await writableStream.close();
  } catch (error) {
    if ((error as Error).name === "AbortError") {
      return;
    }
    console.error("Error saving file:", error);
    // Fallback to file-saver if File System Access API is not supported
    saveAs(blob, "flow-data.json");
  }
};

export const loadFromDevice = async () => {
  try {
    if (!window.showOpenFilePicker) {
      throw new Error(
        "File System Access API is not supported in this browser."
      );
    }

    const options = {
      types: [
        {
          description: "JSON Files",

          accept: { "application/json": [".json"] },
        },
      ],
      excludeAcceptAllOption: true,
      multiple: false,
    };

    const [fileHandle] = await window.showOpenFilePicker(options);
    const file = await fileHandle.getFile();
    const fileContent = await file.text();
    const data = JSON.parse(fileContent);

    return { nodes: data.nodes, edges: data.edges };
  } catch (error) {
    if ((error as Error).name === "AbortError") {
      return;
    }
    console.error("Error opening file:", error);
  }
};
