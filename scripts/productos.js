
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
let nombresPrendas = ["prenda", "prenda", "prenda", "prenda", "prenda", "prenda","prenda","prenda","prenda", "prenda", "prenda", "prenda", "prenda", "prenda", "prenda", "prenda", "prenda", "prenda", "prenda", "prenda", "prenda", "prenda", "prenda", "prenda", "prenda", "prenda", "prenda", "prenda", "prenda", "prenda", "prenda", "prenda", "prenda"];
let nombresAccesorios = ["Calzado", "Calzado", "Calzado"];
let preciosPrendas = [5, 6, 7, 8, 10, 12, 13, 15, 16, 18, 20, 22, 25, 26, 28, 30, 35, 38, 40, 45, 48, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 150];
let preciosAccesorios = [30, 35, 40];

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