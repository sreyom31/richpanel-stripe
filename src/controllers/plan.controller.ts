import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../utils/CatchAsync';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';
import { planService } from '../services';

const createPlan = catchAsync(async (req: Request, res: Response) => {
  const plan = await planService.createPlan(req.body);
  res.status(httpStatus.CREATED).send(plan);
});

const getPlan = catchAsync(async (req: Request, res: Response) => {
  const plan = await planService.getPlanById(req.params.planId);
  if (!plan) {
    throw new ApiError(httpStatus.NOT_FOUND, 'plan not found');
  }
  res.send(plan);
});

const getPlans = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, [
    'name',
    'monthly',
    'price',
    'videoQuality',
    'resolution',
    'screens',
  ]);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await planService.queryPlans(filter, options);
  res.send(result);
});

const updatePlan = catchAsync(async (req: Request, res: Response) => {
  const plan = await planService.updatePlanById(req.params.planId, req.body);
  res.send(plan);
});

const deletePlan = catchAsync(async (req: Request, res: Response) => {
  await planService.deletePlanById(req.params.planId);
  res.status(httpStatus.NO_CONTENT).send();
});

export default {
  createPlan,
  getPlan,
  getPlans,
  updatePlan,
  deletePlan,
};
