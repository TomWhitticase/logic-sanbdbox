import React, { useEffect, useState } from "react";
type Props = {
  keyboardKey: "copy" | "cut" | "paste";
};
const Key: React.FC<Props> = ({ keyboardKey }) => {
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    const userAgentData = navigator.userAgent;
    setIsMac(userAgentData.toLocaleLowerCase().includes("mac"));
  }, []);

  const prefix = isMac ? "⌘" : "Ctrl";

  const text = `${prefix} ${
    {
      copy: "C",
      cut: "X",
      paste: "V",
    }[keyboardKey]
  }`;

  return (
    <kbd className="px-1 mx-1 rounded bg-slate-200 text-nowrap">{text}</kbd>
  );
};
export default Key;
