import { model } from 'mongoose';
import {
  ISubscriptionDocument,
  ISubscriptionModel,
} from './subscription.types';
import SubscriptionSchema from './subscription.schema';

const SubscriptionModel = model<ISubscriptionDocument, ISubscriptionModel>(
  'subscription',
  SubscriptionSchema
);
export default SubscriptionModel;
