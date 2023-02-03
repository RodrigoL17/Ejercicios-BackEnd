import { Router } from "express";
import { ProductManager } from "../productManager.js";

const productManager = new ProductManager();

const router = Router();

router.get("/",async (req,res) => {
    const productos = await productManager.getProducts()
    res.render("home", {productos})
})

export default router;