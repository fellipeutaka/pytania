import { z } from "zod";

export const createQuizSchema = z.object({
  name: z.string().trim().min(1),
  description: z.string().trim().min(1),
  creatorId: z.string().uuid(),
});
