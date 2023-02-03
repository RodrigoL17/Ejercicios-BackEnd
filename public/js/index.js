const socketClient = io();

const listaProductos = document.getElementById("lista-productos");

socketClient.on("productos", (productos) => {
  const prods = productos.map((prod) => {
    return `<li>
        <p>id:${prod.id} , titulo: ${prod.title}, descripcion: ${prod.description}, codigo: ${prod.code}, precio: ${prod.price}, stock: ${prod.stock}, categoria: ${prod.category}</p>
    </li>`;
  });
  listaProductos.innerHTML = prods;
});
