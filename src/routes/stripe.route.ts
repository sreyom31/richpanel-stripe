import express, { Router } from 'express';
import stripeController from '../controllers/stripe.controller';

const router = Router();

router
  .route('/create-checkout-session')
  .post(stripeController.createCheckoutSession);

router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  stripeController.webhookHandler
);

export default router;
