import httpStatus from 'http-status';
import { Request, Response, response } from 'express';
import ApiError from '../utils/ApiError';
import config from '../config';
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
  return session;
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
  // Handle the checkout.session.completed event
  // if (eventType === 'checkout.session.completed') {
  //   stripe.customers
  //     .retrieve(data.customer)
  //     .then(async (customer: any) => {
  //       try {
  //         console.log(customer);
  //         console.log('data:', data);
  //         // CREATE ORDER
  //         // createOrder(customer, data);
  //       } catch (err) {
  //         // console.log(typeof createOrder);
  //         console.log(err);
  //       }
  //     })
  //     .catch((err) => console.log(err.message));
  // }

  // Return a 200 response to acknowledge receipt of the event
  res.send(200).end();
};

export default { createCheckoutSession, webhookHandler };
