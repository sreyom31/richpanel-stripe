import { Schema } from "mongoose";
import { setLastUpdated } from "../subscriptions/subscription.methods";
import { toJSON, paginate } from '../plugins';

const SubscriptionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  paymentId: {
    type: String,
    required: [true, 'PaymentId is required'],
    trim: true,
  },
  planId: {
    type: String,
    required: [true, 'PlanId is required'],
    trim: true,
  },
  active: {
    type: String,
    required: [true, 'Status is required'],
    trim: true,
  },
  subscriptionId: {
    type: String,
    required: [true, 'SubscriptionId is required'],
    trim: true,
  },
  validTill: {
    type: Date,
  },
  dateOfEntry: {
    type: Date,
    default: new Date(),
  },
  lastUpdated: {
    type: Date,
    default: new Date(),
  },
});

SubscriptionSchema.plugin(toJSON);
SubscriptionSchema.plugin(paginate);
SubscriptionSchema.methods.setLastUpdated = setLastUpdated;
SubscriptionSchema.pre('save', function (next: NextFunction) {
  this.populate(['user']);
  next();
});
SubscriptionSchema.pre(/^find/, function (next: NextFunction) {
  this.populate(['user']);
  next();
});

export default SubscriptionSchema;
