import React from "react";

const isMac =
  typeof navigator !== "undefined" &&
  /mac|iphone|ipad/i.test(navigator.userAgent);

const keyLabels = {
  copy: "C",
  cut: "X",
  paste: "V",
  selectAll: "A",
};

type Props = {
  keyboardKey: keyof typeof keyLabels;
};

/** A platform aware keyboard shortcut, e.g. ⌘ C or Ctrl C */
const Key: React.FC<Props> = ({ keyboardKey }) => (
  <kbd className="kbd">
    {isMac ? "⌘" : "Ctrl"} {keyLabels[keyboardKey]}
  </kbd>
);
export default Key;
