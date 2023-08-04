import { Schema } from 'mongoose';
import { setLastUpdated } from '../plans/plan.methods';
import { toJSON, paginate } from '../plugins';

const PlanSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  monthly: {
    type: Number,
    required: [true, 'Monthly Price is required'],
  },
  yearly: {
    type: Number,
    required: [true, 'Yearly Price is required'],
  },
  videoQuality: {
    type: String,
    required: [true, 'Video Quality is required'],
  },
  resolution: {
    type: String,
    required: [true, 'Resolution is required'],
  },
  screens: {
    type: Number,
    required: [true, 'Number of Screens is required'],
  },
  devices: [
    {
      type: String,
    },
  ],
  dateOfEntry: {
    type: Date,
    default: new Date(),
  },
  lastUpdated: {
    type: Date,
    default: new Date(),
  },
});

PlanSchema.plugin(toJSON);
PlanSchema.plugin(paginate);
PlanSchema.methods.setLastUpdated = setLastUpdated;

export default PlanSchema;
