import { Router } from "express";

import {
  createProduct,
  deleteProduct,
  getProducts,
  toggleFavorite,
  updateProduct,
} from "../controllers/productController";

const productRouter = Router();

productRouter.get("/", getProducts);
productRouter.post("/", createProduct);
productRouter.put("/:id", updateProduct);
productRouter.patch("/:id/favorite", toggleFavorite);
productRouter.delete("/:id", deleteProduct);

productRouter.patch(
  "/:id/favorite",
  toggleFavorite,
);

export default productRouter;