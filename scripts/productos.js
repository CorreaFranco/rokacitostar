
// OBJETO PRODUCTO
class Producto {
    constructor(id, title, price) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.cantidad = 0;
    }
};

let prendas = [];
let accesorios = [];
let nombresPrendas = [];
let nombresAccesorios = ["Dúo 2x"];
let preciosPrendas = [];
let preciosAccesorios = [150];

nombresPrendas.forEach((nombre, index) => {
    let id = (index + 1).toString(); // Los IDs empiezan en "1"
    let precio = preciosPrendas[index];
    let prenda = new Producto(id, nombre, precio);
    prendas.push(prenda);
});

nombresAccesorios.forEach((nombre, index) => {
    let id = (index + 101).toString(); // IDs para accesorios comienzan en "101"
    let precio = preciosAccesorios[index];
    let accesorio = new Producto(id, nombre, precio);
    accesorios.push(accesorio);
});

productos = prendas.concat(accesorios);