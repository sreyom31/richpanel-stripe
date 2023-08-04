import { model } from "mongoose";
import { IPlanDocument, IPlanModel } from './plan.types';
import PlanSchema from "./plan.schema";

const PlanModel = model<IPlanDocument, IPlanModel>('plan', PlanSchema);
export default PlanModel;
