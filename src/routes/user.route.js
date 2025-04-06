import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import { registerSchema, loginSchema, updateSchema } from "../schema/user.Schema.js";
import { ProtectedMiddleware } from "../middleware/protected.middleware.js";
import { RolesMiddeleware } from "../middleware/roles.middleware.js";
import { ROLES } from "../constants/roles.constant.js";

const userRouter = Router();

userRouter.post("/register", ValidationMiddleware(registerSchema), userController.registerUser);
userRouter.post("/login", ValidationMiddleware(loginSchema), userController.loginUser);
userRouter.put("/:id",ProtectedMiddleware(false),RolesMiddeleware(ROLES.ALL),ValidationMiddleware(updateSchema), userController.updateUser);
userRouter.get("/",ProtectedMiddleware(true),RolesMiddeleware(ROLES.ADMIN,ROLES.OWNER),userController.getAllUsers);
userRouter.get("/:id",ProtectedMiddleware(true),RolesMiddeleware(ROLES.ADMIN,ROLES.OWNER),userController.getUserById);
userRouter.delete("/:id",ProtectedMiddleware(true),RolesMiddeleware(ROLES.ADMIN,ROLES.OWNER),userController.deleteUser);

export default userRouter;