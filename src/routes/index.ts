import { Router } from 'express';
import authRoute from './auth.route';
import userRoute from './user.route';
import planRoute from './plan.route';
import stripeRoute from './stripe.route';

const router = Router();

const defaultRoutes = [
  { path: '/auth', route: authRoute },
  { path: '/users', route: userRoute },
  { path: '/plans', route: planRoute },
  { path: '/stripe', route: stripeRoute },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
