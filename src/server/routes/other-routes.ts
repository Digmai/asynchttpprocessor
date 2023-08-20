import { Router, Request, Response } from "express";

// Import other controllers or middlewares if needed

export const initializeOtherRoutes = (router: Router) => {
  // Define your other routes here

  // Example route
  router.get("/other", (req: Request, res: Response) => {
    res.send("This is the other route");
  });

  return router;
};
