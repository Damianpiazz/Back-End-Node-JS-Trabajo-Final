import { Router } from "express";
import { ProductController } from "../controllers/product.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", verifyToken, ProductController.getAll);
router.get("/:id", verifyToken, ProductController.getById);
router.post("/", verifyToken, ProductController.create);
router.put("/:id", verifyToken, ProductController.update);
router.delete("/:id", verifyToken, ProductController.delete);

export default router;