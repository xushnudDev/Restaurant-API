import { Router } from "express";
import adminContoller from "../controllers/admin.contoller.js";
import categoryController from "../controllers/category.controller.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import { ProtectedMiddleware } from "../middleware/protected.middleware.js";
import { RolesMiddeleware } from "../middleware/roles.middleware.js";
import { ROLES } from "../constants/roles.constant.js";
import { createMealSchema, updateMealSchema } from "../schema/meal.Schema.js";

const adminRouter = Router();

adminRouter.get("/", ProtectedMiddleware(true), RolesMiddeleware(ROLES.ADMIN), adminContoller.getAllMeals);
adminRouter.post("/", ProtectedMiddleware(true), RolesMiddeleware(ROLES.ADMIN), ValidationMiddleware(createMealSchema), adminContoller.createMeal);
adminRouter.get("/:id", ProtectedMiddleware(true), RolesMiddeleware(ROLES.ADMIN), adminContoller.getMealById);
adminRouter.put("/:id", ProtectedMiddleware(true), RolesMiddeleware(ROLES.ADMIN), ValidationMiddleware(updateMealSchema), adminContoller.updateMeal);
adminRouter.delete("/:id", ProtectedMiddleware(true), RolesMiddeleware(ROLES.ADMIN), adminContoller.deleteMeal);

adminRouter.get("/categories", ProtectedMiddleware(true), RolesMiddeleware(ROLES.ADMIN), categoryController.getAllCategories);
adminRouter.get("/categories/:id", ProtectedMiddleware(true), RolesMiddeleware(ROLES.ADMIN), categoryController.getCategoryById);


export default adminRouter;
