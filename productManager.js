import fs from "fs"

// const fs = require("fs");

class ProductManager {
  constructor() {
    this.productos = [];
    this.path = "./Productos.json";
  }
  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const productos = await fs.promises.readFile(this.path, "utf-8");
        const productosJS = JSON.parse(productos);
        return productosJS;
      } else {
        return this.productos;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async addProduct({ title, description, code, price, stock, categoty, thumbnail }) {
    try {
      const productosFile = await this.getProducts();
      const productoEncontrado = productosFile.find(
        (producto) => producto.code === code
      );

      if (productoEncontrado === undefined) {
        productosFile.push({
          id: Math.round(Math.random()*10000),
          title,
          description,
          code,
          price,
          status: true,
          stock,
          categoty,
          thumbnail,
        });
        await fs.promises.writeFile(this.path, JSON.stringify(productosFile));
      } else {
        console.log("El Producto Ingresado ya existe");
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getProdutcById(ID) {
    const productosFile = await this.getProducts();
    const productoEncontradoByID = productosFile.find(
      (producto) => producto.id === ID
    );
    return productoEncontradoByID;
  }

  async updateProduct(ID, producto) {
    const productosFile = await this.getProducts()
    const productosFileUpdate = productosFile.map(prodf =>
      prodf.id === ID ? {...prodf, ...producto}: prodf)
      await fs.promises.writeFile(this.path, JSON.stringify(productosFileUpdate))
  }

  async deleteProduct(ID) {
    const productoEncontrado = await this.getProdutcById(ID);
    const buscar = await this.getProducts();
    const index = buscar.findIndex(producto => producto.id === ID )
    if (index == -1) {
      console.log("no se encontro producto")
      return
    }
    const nuevoBuscar = buscar.splice(index, 1);
    await fs.promises.writeFile(this.path, JSON.stringify(buscar));
  }
}

// productos = new ProductManager();

const Producto1 = {
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin Imagen",
  code: "abc123",
  stock: 25,
};

const Producto2 = {
  title: "producto 2",
  description: "prueba 2",
  price: 300,
  thumbnail: "Sin Imagen",
  code: "def456",
  stock: 32,
};

const Producto3 = {
  title: "producto 3",
  description: "prueba 3",
  price: 400,
  thumbnail: "Sin Imagen",
  code: "ghi789",
  stock: 10,
};


const ObtenerProductos = async () => {
  const consultaProductos = await productos.getProducts();
  console.log(consultaProductos)
};

const AgregarProducto = async () => {
  await productos.addProduct(Producto1);
  await productos.addProduct(Producto2);
  await productos.addProduct(Producto3);
};

const ObtenerProductosById = async (ID) => {
  const productoById = await productos.getProdutcById(ID)
  console.log(productoById);
}

const DeleteProductoById = async (ID) => {
  const EliminarProducto = await productos.deleteProduct(ID)
  console.log(EliminarProducto)
}

const UpdateProducto = async (ID, producto) => {
   await productos.updateProduct(ID, producto)
}
// AgregarProducto();
// ObtenerProductos();
// ObtenerProductosById(1);
// DeleteProductoById(2);
// UpdateProducto (2,{
//   price: 150,
//   stock: 22})

export {ProductManager}

