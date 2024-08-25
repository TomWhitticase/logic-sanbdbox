import React, { useState, useEffect, useRef, ReactNode } from "react";
import ReactDOM from "react-dom";

interface TooltipPortalProps {
  label: string;
  anchorRef: React.RefObject<HTMLDivElement>;
}

const TooltipPortal: React.FC<TooltipPortalProps> = ({ label, anchorRef }) => {
  const [position, setPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (anchorRef.current && tooltipRef.current) {
      const anchorRect = anchorRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      setPosition({
        top: anchorRect.top - tooltipRect.height - 10, // Adjust vertical position
        left: anchorRect.left + anchorRect.width / 2 - tooltipRect.width / 2, // Center horizontally
      });
    }
  }, [anchorRef]);

  return ReactDOM.createPortal(
    <div
      ref={tooltipRef}
      style={{ top: position.top, left: position.left }}
      className="pointer-events-none absolute z-[1000] px-2 py-1 text-sm text-white bg-gray-700 rounded whitespace-nowrap"
    >
      {label}
    </div>,
    document.body
  );
};

interface TooltipProps {
  label: string;
  children: ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ label, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      ref={anchorRef}
    >
      {isVisible && anchorRef.current && (
        <TooltipPortal label={label} anchorRef={anchorRef} />
      )}
      {children}
    </div>
  );
};

export default Tooltip;
