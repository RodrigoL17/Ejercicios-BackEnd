import express from "express";
import productsRouter from "./routers/products.router.js"
import cartsRouter from "./routers/carts.router.js"
import { cartManager } from "./cartManager.js";
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)

app.listen(8080,()=>{
    console.log("Escuchando puerto 8080")
})



// const lala = new cartManager;

// console.log(await lala.getCarritoById(7922))