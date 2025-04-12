import { Application } from 'express';
import userRouter from './users/user.routes.js';

const configureRoutes = (app:Application) => {
  app.use("/api/users", userRouter);
};
export default configureRoutes;