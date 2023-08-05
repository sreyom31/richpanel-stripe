import { Router } from 'express';
import paymentController from '../controllers/payment.controller';

const router = Router();

router
  .route('/')
  .post(paymentController.createPayment)
  .get(paymentController.getPayments);

router
  .route('/:paymentId')
  .get(paymentController.getPayment)
  .patch(paymentController.updatePayment)
  .delete(paymentController.deletePayment);

export default router;

