import { createContext, useContext } from "react";

/**
 * True when a node component is rendered outside the canvas (help modal,
 * drag preview). Handles render as plain markers there, since React Flow
 * handles need a real parent node.
 */
export const PreviewContext = createContext(false);
export const useIsPreview = () => useContext(PreviewContext);
