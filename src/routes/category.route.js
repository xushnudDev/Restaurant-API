import { Router } from "express";
import categoryController from "../controllers/category.controller.js";
import { createCategorySchema, updateCategorySchema } from "../schema/category.Schema.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import { ProtectedMiddleware } from "../middleware/protected.middleware.js";
import { RolesMiddeleware } from "../middleware/roles.middleware.js";
import { ROLES } from "../constants/roles.constant.js";

const categoryRouter = Router();

categoryRouter.get("/", ProtectedMiddleware(true), RolesMiddeleware(ROLES.ADMIN), categoryController.getAllCategories);
categoryRouter.get("/:id", ProtectedMiddleware(true), RolesMiddeleware(ROLES.ADMIN), categoryController.getCategoryById);
categoryRouter.post("/", ProtectedMiddleware(true), RolesMiddeleware(ROLES.ADMIN), ValidationMiddleware(createCategorySchema), categoryController.createCategory);
categoryRouter.put("/:id", ProtectedMiddleware(true), RolesMiddeleware(ROLES.ADMIN), ValidationMiddleware(updateCategorySchema), categoryController.updateCategory);
categoryRouter.delete("/:id", ProtectedMiddleware(true), RolesMiddeleware(ROLES.ADMIN), categoryController.deleteCategory);

export default categoryRouter;