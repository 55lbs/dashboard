import { z } from 'zod';

export const ExerciseGroupSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  slug: z.string(),
  image: z.string().url(),
  exercise: z.array(z.object({ count: z.number().int() })),
});

export type ExerciseGroup = z.infer<typeof ExerciseGroupSchema>;
