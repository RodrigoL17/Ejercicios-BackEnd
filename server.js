import express from "express";
import productsRouter from "./routers/products.router.js"
import cartsRouter from "./routers/carts.router.js"
import realtimeproductsRouter from "./routers/realtimeproducts.router.js"
import homeRouter from "./routers/home.router.js"
import {__dirname} from "./utils.js"
import handlebars from "express-handlebars"
import { Server } from "socket.io";
import { ProductManager } from "./productManager.js";

//creamos servidor
const app = express();

//para que codifique
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//para path absoluto
app.use(express.static(__dirname + "/public"))

//configurar handlebars

app.engine(".hbs", handlebars.engine({extname:".hbs"})) //configuracion exclusiva handlebars
app.set("views",__dirname+"/views")
app.set("view engine",".hbs")


//rutas
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/realtimeproducts", realtimeproductsRouter)
app.use("/home",homeRouter )


const httpServer = app.listen(8080,()=>{
    console.log("Escuchando puerto 8080")
})

//Socket del lado del servidor
export const socketServer = new Server(httpServer)

const productManager = new ProductManager;

const productos = await productManager.getProducts()

socketServer.on("connection", (socket)=>{
    console.log("Usuario Conectado")
    socket.emit("productos", productos)
})
