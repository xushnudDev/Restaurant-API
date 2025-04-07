import { Router } from "express";
import userRouter from "./user.route.js";
import adminRouter from "./admin.route.js";
import categoryRouter from "./category.route.js";

const router = Router();

router.use("/users", userRouter);
router.use("/admin", adminRouter);
router.use("/categories", categoryRouter);


export default router;