import httpStatus from 'http-status';
import { Subscription, SubscriptionUpdate } from '../shared/customTypes';
import SubscriptionModel from '../models/subscriptions/subscription.model';
import ApiError from '../utils/ApiError';

const createSubscription = async (subscriptionBody: Subscription) => {
  return SubscriptionModel.create(subscriptionBody);
};

const getSubscriptionById = async (id: string) => SubscriptionModel.findById(id);

const querySubscriptions = async (filter: any, options: any) => {
  const subscriptions = await SubscriptionModel.paginate(filter, options);
  return subscriptions;
};
const updateSubscriptionById = async (
  subscriptionId: string,
  updateBody: SubscriptionUpdate
) => {
  const subscription = await getSubscriptionById(subscriptionId);
  if (!subscription) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Subscription not found');
  }
  Object.assign(subscription, updateBody);
  await subscription.save();
  return subscription;
};

const deleteSubscriptionById = async (subscriptionId: string) => {
  const subscription = await getSubscriptionById(subscriptionId);
  if (!subscription) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await subscription.remove();
  return subscription;
};

export default {
  createSubscription,
  updateSubscriptionById,
  querySubscriptions,
  deleteSubscriptionById,
  getSubscriptionById,
};