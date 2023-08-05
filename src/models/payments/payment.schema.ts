import { Schema } from "mongoose";
import { setLastUpdated } from '../payments/payment.methods';
import { toJSON, paginate } from '../plugins';

const PaymentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  eventId: {
    type: String,
    required: [true, 'EventId is required'],
    trim: true,
  },
  invoiceId: {
    type: String,
    trim: true,
  },
  payment_status: {
    type: String,
    required: [true, 'EventId is required'],
    trim: true,
  },
  amount: {
    type: Number,
  },
  currency: {
    type: Number,
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

PaymentSchema.plugin(toJSON);
PaymentSchema.plugin(paginate);
PaymentSchema.methods.setLastUpdated = setLastUpdated;
PaymentSchema.pre('save', function (next: NextFunction) {
  this.populate(['user']);
  next();
});
PaymentSchema.pre(/^find/, function (next: NextFunction) {
  this.populate(['user']);
  next();
});

export default PaymentSchema;
