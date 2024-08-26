import { z } from "zod";

// Could be more specific here but I'm feeling lazy today
export const savedCircuitSchema = z.object({
  nodes: z.array(z.any()),
  edges: z.array(z.any()),
});
