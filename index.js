class ProductManager {
    constructor(){
        this.products = []
    }
    getProducts(){
        return console.log(this.products) 
    }
    addProduct(title,description,price,thumbnail,code,stock){
        if (this.products.length == 0){
            this.products.push({
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                code: code,
                stock: stock,
                id: (Math.round(Math.random()*10000))
            })
        }else{
            this.products.forEach(producto => {
                if (title !== producto.title || description !== producto.description || price !== producto.price || thumbnail !== producto.thumbnail || code !== producto.code || stock !== producto.stock){
                    this.products.push({
                        title: title,
                        description: description,
                        price: price,
                        thumbnail: thumbnail,
                        code: code,
                        stock: stock,
                        id: (Math.round(Math.random()*10000))
                    })
                }else{
                    console.log("El producto ingresado ya existe")
                }
            });
        }
    }
    getProdutcById(ID){
        this.products.forEach(producto => {
            (producto.id === ID) ? console.log(producto) : console.log("Error: El producto que buscas no ha sido encontrado")
        });
    }
}

productos = new ProductManager

debugger

productos.getProducts();
productos.addProduct("producto prueba","Este es un producto prueba", 200, "Sin Imagen", "abc123", 25)
productos.getProducts();
productos.addProduct("producto prueba","Este es un producto prueba", 200, "Sin Imagen", "abc123", 25)
productos.getProdutcById(1234);
