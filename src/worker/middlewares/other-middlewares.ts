import { Application } from "express";

export const initializeOtherMiddlewares = (app: Application) => {
  // Add other middlewares here

  // Example middleware
  app.use((req, res, next) => {
    console.log("This is the other middleware");
    next();
  });

  return app;
};
