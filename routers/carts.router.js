import { Router } from "express";
import { cartManager } from "../cartManager.js";

const CartManager = new cartManager();

const router = Router();

router.post("/", async (req, res) => {
  const product = req.body;
  if (Object.keys(product).length === 0) {
    res.json({ message: "No has ingresado ningun producto" });
  } else {
    await CartManager.createCart(product);
    res.json({ message: "creaste un nuevo carrito" });
  }
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  const carritoEncontrado = await CartManager.getCarritoById(parseInt(cid));
  const productos = carritoEncontrado.products;
  res.json({ message: "carrito encontrado", productos });
});

router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  await CartManager.addProduct(parseInt(cid),parseInt(pid))
  const carrito = await CartManager.getCarritoById(cid)
  res.json({message:"producto agregado al carrito" })
});
  

export default router;
