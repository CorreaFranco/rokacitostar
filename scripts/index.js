// ==========================
// VARIABLES GLOBALES
// ==========================
const lista = document.getElementById("lista__container--pedidos");
const idCostoTotal = document.getElementById("pedido__total");
const abonadoOutput = document.getElementById("abonadoOutput");

let pedido = [];
let costoTotal = 0;
let abonado = 0;
let deuda = 0;

let totalPrendasCantidad = 0;

// ==========================
// FUNCIONES REUTILIZABLES
// ==========================

const calcularCantidadTotal = () => pedido.reduce((total, item) => total + item.cantidad, 0);

const crearBoton = producto => `
    <button id="${producto.id}" class="boton__producto" onclick="pedirProductos(${producto.id})">
        ${producto.title} ${producto.price}
    </button>
`;

const imprimirBotones = (arrayOfProducts, idSelector) => {
    const productsSelector = document.getElementById(idSelector);
    productsSelector.innerHTML = arrayOfProducts.map(crearBoton).join("");
};

const actualizarImpresionLista = () => {
    lista.innerHTML = pedido
        .map(element => `
            <div class="orden">
                <div class="orden__title">${element.title}:</div>
                <div class="orden__costo">${element.price}</div>
                <div class="orden__cantidad">${element.cantidad}</div>
                <div class="orden__cantidad--elemento">${element.cantidad * element.price}</div>
                <div class="orden__eliminar">
                    <button onclick="EliminarOrden(${element.id})">x</button>
                </div>
            </div>
        `)
        .join("");
};

// ==========================
// FUNCIONES PRINCIPALES
// ==========================

const pedirProductos = id => {
    productos.forEach(element => {
        if (element.id === id.toString()) {
            const exists = pedido.some(p => p.id === id.toString());

            if (!exists) {
                pedido.push({ ...element, cantidad: 1 });
            } else {
                const producto = pedido.find(p => p.id === id.toString());
                producto.cantidad++;
            }

            costoTotal += element.price;
            deuda = costoTotal - abonado;

            totalPrendasCantidad = calcularCantidadTotal();

            actualizarImpresionLista();
            idCostoTotal.textContent = costoTotal.toFixed(2);
            abonadoOutput.textContent = deuda.toFixed(2);
            document.getElementById("cantidad__pedido").textContent = totalPrendasCantidad;
        }
    });
};

const EliminarOrden = id => {
    pedido.forEach((element, index) => {
        if (element.id === id.toString()) {
            if (element.cantidad > 1) {
                // Reducir la cantidad si hay más de una unidad
                element.cantidad--;
                costoTotal -= element.price; // Restar el precio solo de una unidad
                totalPrendasCantidad--; // Reducir la cantidad total de prendas
            } else {
                // Si solo hay una unidad, eliminar el producto del pedido
                pedido.splice(index, 1);
                costoTotal -= element.price;
                totalPrendasCantidad--; // Reducir la cantidad total de prendas
            }
        }
    });

    // Actualizar la deuda y el DOM
    deuda = costoTotal - abonado;

    actualizarImpresionLista();
    idCostoTotal.textContent = costoTotal.toFixed(2);
    abonadoOutput.textContent = deuda.toFixed(2);
    document.getElementById("cantidad__pedido").textContent = totalPrendasCantidad;
};

const printAbonado = () => {
    const textInput = document.getElementById("abonadoInput").value.trim();
    const numericInput = parseFloat(textInput);

    if (isNaN(numericInput) || numericInput < 0) {
        abonadoOutput.textContent = "ERROR: Abono inválido";
        return;
    }

    abonado = numericInput;
    deuda = costoTotal - abonado;

    abonadoOutput.textContent = deuda.toFixed(2);
};

const EliminarPedido = () => {
    if (confirm("¿Deseas realizar esta acción?")) {
        location.reload();
    }
};

// ==========================
// INICIALIZACIONES
// ==========================
imprimirBotones(prendas, "prendas");
imprimirBotones(accesorios, "accesorios");

document.getElementById("cantidad__pedido").textContent = totalPrendasCantidad;

// ==========================
// MARCA DE AGUA
// ==========================
const marcaAgua = () => {
    document.getElementById('imprimir').addEventListener('click', function() {
        let section = document.getElementById('toggleSection');
        if (section.classList.contains('hidden')) {
            section.classList.remove('hidden');
        } else {
            section.classList.add('hidden');
        }
    });
}

// ==========================
// BOTON DE IMPRESION
// ==========================
$(document).ready(() => {
    marcaAgua()
    let prueba = document.getElementById("prueba")
    $('#imprimir').click(function() {
        $.print('#contenido-a-imprimir');
    });
    marcaAgua()
});
