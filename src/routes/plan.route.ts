import { Router } from 'express';
import planController from '../controllers/plan.controller';
import validate from '../middlewares/validation';
import { planValidation } from '../validations';

const router = Router();

router
  .route('/')
  .post(validate(planValidation.createPlan), planController.createPlan)
  .get(validate(planValidation.getPlans), planController.getPlans);

router
  .route('/:planId')
  .get(validate(planValidation.getPlan), planController.getPlan)
  .patch(validate(planValidation.updatePlan), planController.updatePlan)
  .delete(validate(planValidation.deletePlan), planController.deletePlan);

export default router;
