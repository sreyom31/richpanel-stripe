import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../utils/CatchAsync';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';
import { subscriptionService } from '../services';

const createSubscription = catchAsync(async (req: Request, res: Response) => {
  const subscription = await subscriptionService.createSubscription(req.body);
  res.status(httpStatus.CREATED).send(subscription);
});

const getSubscription = catchAsync(async (req: Request, res: Response) => {
  const subscription = await subscriptionService.getSubscriptionById(
    req.params.subscriptionId
  );
  if (!subscription) {
    throw new ApiError(httpStatus.NOT_FOUND, 'subscription not found');
  }
  res.send(subscription);
});

const getSubscriptions = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, [
    'user',
    'paymentId',
    'planId',
    'subscriptionId',
    'active',
  ]);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await subscriptionService.querySubscriptions(filter, options);
  res.send(result);
});

const updateSubscription = catchAsync(async (req: Request, res: Response) => {
  const subscription = await subscriptionService.updateSubscriptionById(
    req.params.subscriptionId,
    req.body
  );
  res.send(subscription);
});

const deleteSubscription = catchAsync(async (req: Request, res: Response) => {
  await subscriptionService.deleteSubscriptionById(req.params.subscriptionId);
  res.status(httpStatus.NO_CONTENT).send();
});

export default {
  createSubscription,
  getSubscription,
  getSubscriptions,
  updateSubscription,
  deleteSubscription,
};
