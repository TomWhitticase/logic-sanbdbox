# Logic Sandbox

A web app for building and simulating digital logic circuits. Drag in switches, gates, flip-flops and displays, wire them together and watch the signals flow in real time.

## Features

- **Inputs:** switch, momentary push button, adjustable clock, hex digit input
- **Outputs:** bulb, square light, seven segment display, hex display
- **Logic gates:** buffer, NOT, AND, NAND, OR, NOR, XOR, XNOR
- **Advanced:** 4:1 multiplexer, 1:4 demultiplexer, D flip-flop, full adder
- Built-in example circuits (half adder, 4-bit ripple counter, blinker, hex decoder)
- Rotate, duplicate, cut, copy and paste components
- Autosaves to the browser; save and open circuits as JSON files

## Shortcuts

| Action                    | Shortcut                  |
| ------------------------- | ------------------------- |
| Select several components | Shift + drag              |
| Select everything         | Ctrl/⌘ + A                |
| Copy / cut / paste        | Ctrl/⌘ + C / X / V        |
| Delete the selection      | Delete or Backspace       |
| Component options         | Right click a component   |

## Development

```sh
npm install
npm run dev     # start the dev server
npm run build   # type-check and build for production
npm run lint
```

Built with React, TypeScript, Vite, Tailwind CSS and [React Flow](https://reactflow.dev).
