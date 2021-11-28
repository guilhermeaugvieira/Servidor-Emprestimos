import { celebrate, errors, Joi, Segments } from "celebrate";
import { Router } from "express";
import { UserController } from "../controllers/UserController";

const userRoutes = Router();
const userController = new UserController;

userRoutes.get("/", userController.GetAllUsers);
userRoutes.post("/",
  celebrate(
    {
      [Segments.BODY]: Joi.object().keys(
        {
          username: Joi.string().required().trim(),
          email: Joi.string().required().trim(),
        }
      ),
    }
  ), userController.AddUser
);

userRoutes.use(errors());

export { userRoutes };