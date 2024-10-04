import { ExerciseGroupSchema } from '@/models/ExerciseGroup.js';
import { defineCollection, reference, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    author: z.string(),
  }),
});

const exerciseGroupsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.number().int(),
    created_at: z.string(),
    name: z.string(),
    slug: z.string(),
    updated_at: z.string(),
    deleted_at: z.string(),
    image: z.string().url(),
  }),
});

const exercisesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.number().int(),
    exercise_group_id: z.number().int(), //reference('exercise-groups'),
    value_type_id: z.number().int(),
    user_id: z.null(),
    description: z.string(),
    sugarword_id: z.string(),
    subtype_name: z.string().nullable().optional(),
    coach_notes: z.string().nullable().optional(),
    athletes_notes: z.string().nullable().optional(),
    movement_ids: z.any(), //.union([z.string(), z.number()]).nullable().optional(),
    created_at: z.string(),
    name: z.string(),
    slug: z.string(),
    updated_at: z.string(),
  }),
});

export const collections = {
  'exercise-groups': exerciseGroupsCollection,
  exercises: exercisesCollection,
  // posts: blog,
};
