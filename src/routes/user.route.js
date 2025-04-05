import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import { registerSchema, loginSchema, updateSchema } from "../schema/user.Schema.js";

const userRouter = Router();

userRouter.post("/register", ValidationMiddleware(registerSchema), userController.registerUser);
userRouter.post("/login", ValidationMiddleware(loginSchema), userController.loginUser);
userRouter.put("/:id", ValidationMiddleware(updateSchema), userController.updateUser);
userRouter.get("/", userController.getAllUsers);
userRouter.get("/:id", userController.getUserById);
userRouter.delete("/:id", userController.deleteUser);

export default userRouter;