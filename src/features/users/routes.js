import { Router } from "express";
import userController from "./controller.js";
import { auth } from "../../middlewares/auth.middleware.js";

export const userRouter = Router();

userRouter.post("/signup", userController.signup);
userRouter.post("/signin", userController.signin);
userRouter.get("/:id", auth, userController.getUserById);
userRouter.put("/:id", auth, userController.updateUserById);
userRouter.delete("/:id", auth, userController.deleteUserById);
