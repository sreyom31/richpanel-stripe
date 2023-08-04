import httpStatus from "http-status";
import { Plan, PlanUpdate } from '../shared/customTypes';
import PlanModel from "../models/plans/plan.model";
import ApiError from "../utils/ApiError";

const createPlan = async (planBody: Plan) => {
  return PlanModel.create(planBody);
};

const getPlanById = async (id: string) => PlanModel.findById(id);

const queryPlans = async (filter: any, options: any) => {
  const plans = await PlanModel.paginate(filter, options);
  return plans;
};
const updatePlanById = async (planId: string, updateBody: PlanUpdate) => {
  const plan = await getPlanById(planId);
  if (!plan) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Plan not found');
  }
  Object.assign(plan, updateBody);
  await plan.save();
  return plan;
};

const deletePlanById = async (planId: string) => {
  const plan = await getPlanById(planId);
  if (!plan) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await plan.remove();
  return plan;
};

export default {
  createPlan,
  updatePlanById,
  queryPlans,
  deletePlanById,
  getPlanById,
};
