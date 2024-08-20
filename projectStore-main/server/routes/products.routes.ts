import Router from "express-promise-router";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller";
import { validateSchema } from "../middlewares/validateShema"; // Importa correctamente
import { zodProductSchema } from "../schemas/product.schema";

const router = Router();

router.post("/", validateSchema(zodProductSchema), createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", validateSchema(zodProductSchema.partial()), updateProduct);
router.delete("/:id", deleteProduct);

export default router;
