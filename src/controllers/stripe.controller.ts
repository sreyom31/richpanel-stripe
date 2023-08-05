import httpStatus from 'http-status';
import { Request, Response, response } from 'express';
import ApiError from '../utils/ApiError';
import config from '../config';
import PaymentModel from '../models/payments/payment.model';
import SubscriptionModel from '../models/subscriptions/subscription.model';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require('stripe')(config.stripeSecretKey);

const createCheckoutSession = async (req: Request, res: Response) => {
  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId,
      planId: req.body.planId,
    },
  });
  const session = await stripe.checkout.sessions.create({
    billing_address_collection: 'auto',
    line_items: [
      {
        price: req.body.priceId,
        // For metered billing, do not pass quantity
        quantity: 1,
      },
    ],
    mode: 'subscription',
    customer: customer.id,
    success_url: `${config.clientUrl}/checkout-success`,
    cancel_url: `${config.clientUrl}/checkout-failed`,
  });
  if (!session) {
    throw new ApiError(httpStatus.NOT_FOUND, 'session not found');
  }
  res.send(session);
};

const webhookHandler = async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'];

  let event;
  let data;
  let eventType;

  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      config.endpointSecret
    );
    console.log('webhook verified');
  } catch (error: any) {
    console.log(`Webhook Error: ${error.message}`);
    response.status(400).send(`Webhook Error: ${error.message}`);
    return;
  }
  // eslint-disable-next-line prefer-const
  data = event.data.object;
  // eslint-disable-next-line prefer-const
  eventType = event.type;

  // Handle the event
  // Handle the checkout.session.completed event
  if (eventType === 'checkout.session.completed') {
    stripe.customers
      .retrieve(data.customer)
      .then(async (customer: any) => {
        try {
          const amount = data.amount_subtotal / 100;

          const payment = await PaymentModel.create({
            user: customer.metadata.userId,
            eventId: data.id,
            invoiceId: data.invoice,
            payment_status: data.status,
            amount: amount,
            currency: data.currency,
          });
          if (!payment)
            throw new ApiError(
              httpStatus.SERVICE_UNAVAILABLE,
              'payment not created'
            );

          const subscription = await SubscriptionModel.create({
            user: customer.metadata.userId,
            paymentId: payment.id,
            planId: customer.metadata.planId,
            active: true,
            subscriptionId: data.subscription,
            validTill:
              amount < 1000
                ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
          });
          if (!subscription)
            throw new ApiError(
              httpStatus.SERVICE_UNAVAILABLE,
              'subscription not created'
            );
        } catch (err) {
          // console.log(typeof createOrder);
          console.log(err);
        }
      })
      .catch((err) => console.log(err.message));
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send(200).end();
};

export default { createCheckoutSession, webhookHandler };
