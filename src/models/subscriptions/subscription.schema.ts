import { Schema } from "mongoose";
import { setLastUpdated } from "../subscriptions/subscription.methods";
import { toJSON, paginate } from '../plugins';

const SubscriptionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'UserId is required'],
    ref: 'user',
  },
  paymentId: {
    type: Schema.Types.ObjectId,
    required: [true, 'PaymentId is required'],
    ref: 'payment',
  },
  planId: {
    type: Schema.Types.ObjectId,
    required: [true, 'PlanId is required'],
    ref: 'plan',
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
  this.populate(['planId', 'paymentId']);
  next();
});
SubscriptionSchema.pre(/^find/, function (next: NextFunction) {
  this.populate(['planId', 'paymentId']);
  next();
});

export default SubscriptionSchema;
