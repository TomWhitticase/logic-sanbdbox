import { Position } from "@xyflow/react";
import React from "react";
import { styleConstants } from "../../constants/style-constants";
import NodeHandle from "../handles/node-handle";

export type ChipPin = {
  id: string;
  type: "source" | "target";
  side: Position;
  /** Offset along the side, in percent */
  at: number;
  state: boolean;
  label?: string;
};

type Props = {
  iconSrc: string;
  label: string;
  pins: ChipPin[];
};

const sideStyle = (side: Position, at: number): React.CSSProperties => {
  switch (side) {
    case Position.Left:
      return { left: 0, top: `${at}%` };
    case Position.Right:
      return { right: 0, top: `${at}%` };
    case Position.Top:
      return { top: 0, left: `${at}%` };
    case Position.Bottom:
      return { bottom: 0, left: `${at}%` };
  }
};

const labelInset = 7;
const labelStyle = (side: Position, at: number): React.CSSProperties => {
  switch (side) {
    case Position.Left:
      return { left: labelInset, top: `${at}%`, transform: "translateY(-50%)" };
    case Position.Right:
      return { right: labelInset, top: `${at}%`, transform: "translateY(-50%)" };
    case Position.Top:
      return { top: labelInset, left: `${at}%`, transform: "translateX(-50%)" };
    case Position.Bottom:
      return { bottom: labelInset, left: `${at}%`, transform: "translateX(-50%)" };
  }
};

/** A square integrated-circuit style body with pins on its sides */
export const Chip = ({ iconSrc, label, pins }: Props) => (
  <div className="node-card w-[72px] h-[72px]">
    {pins.map((pin) => (
      <React.Fragment key={pin.id}>
        <div className="absolute" style={sideStyle(pin.side, pin.at)}>
          <NodeHandle
            state={pin.state}
            type={pin.type}
            position={pin.side}
            id={pin.id}
          />
        </div>
        {pin.label && (
          <span
            className="absolute font-mono text-[7px] leading-none text-slate-500 pointer-events-none"
            style={labelStyle(pin.side, pin.at)}
          >
            {pin.label}
          </span>
        )}
      </React.Fragment>
    ))}
    <img
      src={iconSrc}
      alt={label}
      draggable={false}
      className="icon-img"
      style={{ width: styleConstants.nodeIconSize }}
    />
    <span className="node-label">{label}</span>
  </div>
);
