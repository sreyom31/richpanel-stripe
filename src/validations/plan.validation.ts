import z from 'zod';
import { Types } from 'mongoose';

const createPlan = z.object({
  body: z.object({
    name: z.string().trim(),
    monthly: z.boolean(),
    price: z.number(),
    priceId: z.string().trim(),
    videoQuality: z.string().trim(),
    resolution: z.string().trim(),
    screens: z.number(),
    devices: z.string().array(),
  }),
});

const getPlan = z.object({
  params: z.object({
    planId: z
      .string()
      .trim()
      .refine((val) => Types.ObjectId.isValid(val), {
        message: 'Invalid plan id',
        path: ['Plan query'],
      }),
  }),
});

const getPlans = z.object({
  query: z
    .object({
      name: z.string().trim(),
      monthly: z.boolean(),
      price: z.number(),
      priceId: z.string().trim(),
      videoQuality: z.string().trim(),
      resolution: z.string().trim(),
      screens: z.number(),
      sortBy: z.string(),
      limit: z.number().int(),
      page: z.number().int(),
    })
    .partial(),
});

const updatePlan = z.object({
  params: z.object({
    planId: z
      .string()
      .trim()
      .refine((val) => Types.ObjectId.isValid(val), {
        message: 'Invalid plan id',
        path: ['Plan update'],
      }),
  }),
  body: z
    .object({
      name: z.string().trim(),
      monthly: z.boolean(),
      price: z.number(),
      priceId: z.string().trim(),
      videoQuality: z.string().trim(),
      resolution: z.string().trim(),
      screens: z.number(),
      devices: z.string().array(),
    })
    .partial()
    .refine((body) => Object.keys(body).length, {
      message: 'Need atleast One field to update',
      path: ['Plan Update'],
    }),
});

const deletePlan = z.object({
  params: z.object({
    planId: z
      .string()
      .trim()
      .refine((val) => Types.ObjectId.isValid(val), {
        message: 'Invalid plan id',
        path: ['Plan delete'],
      }),
  }),
});

export default {
  createPlan,
  deletePlan,
  updatePlan,
  getPlans,
  getPlan,
};
