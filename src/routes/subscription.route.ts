import { Router } from 'express';
import subscriptionController from '../controllers/subscription.controller';

const router = Router();

router
  .route('/')
  .post(subscriptionController.createSubscription)
  .get(subscriptionController.getSubscriptions);

router
  .route('/:subscriptionId')
  .get(subscriptionController.getSubscription)
  .patch(subscriptionController.updateSubscription)
  .delete(subscriptionController.deleteSubscription);

export default router;
