import { Router } from "express";
import { initializeOtherRoutes } from "./other-routes";

export const initializeRoutes = (router: Router) => {
  // Initialize other routes
  initializeOtherRoutes(router);

  // Other routes initialization goes here

  return router;
};
