export type Segments = {
  a: boolean;
  b: boolean;
  c: boolean;
  d: boolean;
  e: boolean;
  f: boolean;
  g: boolean;
  dp?: boolean;
};

const hexSegmentPatterns: Record<string, string> = {
  "0": "abcdef",
  "1": "bc",
  "2": "abdeg",
  "3": "abcdg",
  "4": "bcfg",
  "5": "acdfg",
  "6": "acdefg",
  "7": "abc",
  "8": "abcdefg",
  "9": "abcdfg",
  A: "abcefg",
  B: "cdefg",
  C: "adef",
  D: "bcdeg",
  E: "adefg",
  F: "aefg",
};

export const hexToSegments = (hex: string): Segments => {
  const pattern = hexSegmentPatterns[hex] ?? "";
  const on = (s: string) => pattern.includes(s);
  return {
    a: on("a"),
    b: on("b"),
    c: on("c"),
    d: on("d"),
    e: on("e"),
    f: on("f"),
    g: on("g"),
  };
};
