import { Router } from "express";
import { ProductManager } from "../productManager.js";

const productManager = new ProductManager();

const router = Router();

router.get("/", async (req, res) => {
  const productos = await productManager.getProducts();
  const { limit } = req.query;
  if (parseInt(limit) > 0 || limit === undefined) {
    const mostrarProdcutos = productos.slice(0, limit);
    res.json(mostrarProdcutos);
  } else {
    res.json(productos);
  }
});

router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  const productoID = await productManager.getProdutcById(parseInt(pid));
  if (productoID) {
    res.json({ massage: "Producto Encontrado", productoID });
  } else {
    res.json({ massage: "Producto no encontrado" });
  }
});

router.post("/", async (req, res) => {
  const productoAAgregar = req.body;
  await productManager.addProduct(productoAAgregar);
  res.send({ message: "Producto agregado correctamente", productoAAgregar });
});

router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const productoAModificar = req.body;
  await productManager.updateProduct(parseInt(pid), productoAModificar);
  res.send({ message: "Producto actualizado correctamente" });
});

router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  await productManager.deleteProduct(parseInt(pid));
  res.send({ message: "Producto elimando correctamente" });
});

export default router;
