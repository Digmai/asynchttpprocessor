import { Application } from "express";
import { initializeOtherMiddlewares } from "./other-middlewares";

export const initializeMiddlewares = (app: Application) => {
  initializeOtherMiddlewares(app);

  return app;
};
