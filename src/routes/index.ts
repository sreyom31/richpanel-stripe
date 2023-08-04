import { Router } from 'express';
import authRoute from './auth.route';
import userRoute from './user.route';
import planRoute from './plan.route';

const router = Router();

const defaultRoutes = [
  { path: '/auth', route: authRoute },
  { path: '/users', route: userRoute },
  { path: '/plans', route: planRoute },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
