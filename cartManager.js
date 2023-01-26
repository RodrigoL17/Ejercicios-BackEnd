import fs from "fs";

class cartManager {
  constructor() {
    this.carrito = [];
    this.path = "./Carrito.json";
  }

  async getCarrito() {
    try {
      if (fs.existsSync(this.path)) {
        const carrito = await fs.promises.readFile(this.path, "utf-8");
        const carritoJS = JSON.parse(carrito);
        return carritoJS;
      } else {
        return this.carrito;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async createCart(prod) {
    const carritoFile = await this.getCarrito();
    if (prod && carritoFile.length === 0) {
      carritoFile.push({
        id: Math.round(Math.random() * 10000),
        products: [{ pid: prod.id, quantity: 1 }],
      });
    }
    await fs.promises.writeFile(this.path, JSON.stringify(carritoFile));
  }

  async getCarritoById(ID) {
    const carritoFile = await this.getCarrito();
    const carritoEncontradoByID = carritoFile.find(
      (carrito) => carrito.id === ID
    );
    return carritoEncontradoByID;
  }

  async addProduct(cid, pid) {
    const carritoFile = await this.getCarrito()
    if (cid) {
      const buscarCarrito = await this.getCarritoById(cid);
      if (buscarCarrito) {
        const buscarProducto = buscarCarrito.products.find(
          (prod) => prod.pid === pid
        );

        if (buscarProducto) {
          buscarProducto.quantity += 1 
          const cartFileUpdate = carritoFile.map(cartf =>
            cartf.id === cid && {...cartf, ...buscarCarrito})
            await fs.promises.writeFile(this.path, JSON.stringify(cartFileUpdate))
           ;
        } else {
          buscarCarrito.products.push({ pid, quantity: 1 });
          const cartFileUpdate = carritoFile.map(cartf =>
            cartf.id === cid && {...cartf, ...buscarCarrito})
            await fs.promises.writeFile(this.path, JSON.stringify(cartFileUpdate))
           ;
        }
      } else {
        console.log("El carrito ingresado no existe");
      }
    } else {
      console.log("no has ingresado el carrito");
    }
  }
}

export { cartManager };
