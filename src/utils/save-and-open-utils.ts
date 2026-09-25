import { Edge, Node } from "@xyflow/react";
import saveAs from "file-saver";
import { savedCircuitSchema } from "../types/saved-circuit";

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

const fileName = "logic-sandbox-circuit.json";
const fileTypes: FilePickerAcceptType[] = [
  {
    description: "Logic Sandbox circuit",
    accept: { "application/json": [".json"] },
  },
];

const isAbortError = (error: unknown) =>
  (error as Error | undefined)?.name === "AbortError";

/** Resolves to true once saved, false if the user cancelled */
export const saveToDevice = async (dataToSave: {
  nodes: Node[];
  edges: Edge[];
}) => {
  const nodes = dataToSave.nodes.map((node) => ({
    ...node,
    selected: false,
    dragging: false,
  }));
  const jsonString = JSON.stringify({ ...dataToSave, nodes }, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });

  if (!window.showSaveFilePicker) {
    saveAs(blob, fileName);
    return true;
  }

  try {
    const fileHandle = await window.showSaveFilePicker({
      suggestedName: fileName,
      types: fileTypes,
    });
    const writableStream = await fileHandle.createWritable();
    await writableStream.write(blob);
    await writableStream.close();
    return true;
  } catch (error) {
    if (isAbortError(error)) return false;
    console.error("Error saving file, falling back to download:", error);
    saveAs(blob, fileName);
    return true;
  }
};

/** Opens a file with a classic <input type="file"> for browsers without the File System Access API */
const pickFileWithInput = () =>
  new Promise<File | null>((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json,application/json";
    input.addEventListener("change", () => resolve(input.files?.[0] ?? null));
    input.addEventListener("cancel", () => resolve(null));
    input.click();
  });

const pickFile = async () => {
  if (!window.showOpenFilePicker) return pickFileWithInput();
  const [fileHandle] = await window.showOpenFilePicker({
    types: fileTypes,
    excludeAcceptAllOption: true,
    multiple: false,
  });
  return fileHandle.getFile();
};

/**
 * Resolves to the circuit, or undefined if the user cancelled.
 * Throws if the file isn't a valid circuit.
 */
export const loadFromDevice = async () => {
  let file: File | null;
  try {
    file = await pickFile();
  } catch (error) {
    if (isAbortError(error)) return;
    throw error;
  }
  if (!file) return;

  const parsed = savedCircuitSchema.safeParse(JSON.parse(await file.text()));
  if (!parsed.success) {
    throw new Error("That file doesn't look like a Logic Sandbox circuit.");
  }
  return {
    nodes: parsed.data.nodes as Node[],
    edges: parsed.data.edges as Edge[],
  };
};
