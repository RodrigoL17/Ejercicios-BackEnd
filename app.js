import express from "express";
import  {ProductManager} from "./productManager.js";

const app = express();

let productManager = new ProductManager



app.listen(8080,()=>{
    console.log("Escuchando puerto 8080")
})

app.get("/",  (req,res)=>{
    res.send("Escritorio Raiz")
})

app.get("/products", async (req,res)=>{
    const productos = await productManager.getProducts()
    const {limit} = req.query
    if(parseInt(limit) > 0 || limit === undefined){
        const mostrarProdcutos = productos.slice(0,limit)
        res.json(mostrarProdcutos)
    }else{
        res.json(productos)
    }
})

app.get("/products/:pid", async (req,res)=>{
    const {pid} = req.params
    const productoID = await productManager.getProdutcById(parseInt(pid))
    if (productoID){
        res.json({massage: "Producto Encontrado", productoID})
    }else{
        res.json({massage:"Producto no encontrado"})
    }
})