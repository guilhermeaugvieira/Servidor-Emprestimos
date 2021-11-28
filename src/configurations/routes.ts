import { Router, Request, Response } from "express";
import { userRoutes } from "../routes/userRoutes";

const routes = Router();

routes.use("/api/users", userRoutes);

routes.get("/api", (req: Request, res: Response) => {
  res.send("API funcionando corretamente");
});

export { routes };