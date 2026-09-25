import { styleConstants } from "../../constants/style-constants";
import { Segments } from "../../utils/seven-segment";


const horizontal = (y: number) => ({ x: 13, y, width: 30, height: 7 });
const vertical = (x: number, y: number) => ({ x, y, width: 7, height: 33 });

const segmentRects = {
  a: horizontal(4),
  g: horizontal(46.5),
  d: horizontal(89),
  f: vertical(4, 12),
  b: vertical(45, 12),
  e: vertical(4, 55),
  c: vertical(45, 55),
} as const;

const offColor = "rgba(255, 77, 94, 0.07)";

/** An LED style seven segment digit */
export const SevenSegmentGlyph = ({
  segments,
  className = "",
}: {
  segments: Segments;
  className?: string;
}) => (
  <svg
    viewBox="0 0 64 100"
    className={className}
    style={{ overflow: "visible" }}
    aria-hidden
  >
    <defs>
      <filter id="led-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="2.2" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <g transform="skewX(-6) translate(6 0)">
      {(Object.keys(segmentRects) as (keyof typeof segmentRects)[]).map(
        (key) => (
          <rect
            key={key}
            {...segmentRects[key]}
            rx={3.5}
            fill={segments[key] ? styleConstants.ledColor : offColor}
            filter={segments[key] ? "url(#led-glow)" : undefined}
          />
        )
      )}
      <circle
        cx={60}
        cy={93}
        r={4}
        fill={segments.dp ? styleConstants.ledColor : offColor}
        filter={segments.dp ? "url(#led-glow)" : undefined}
      />
    </g>
  </svg>
);
