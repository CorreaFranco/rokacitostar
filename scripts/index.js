// ==========================
// VARIABLES GLOBALES
// ==========================
// Contenedores del DOM
const lista = document.getElementById("lista__container--pedidos"); // Área donde se imprimen los pedidos
const idCostoTotal = document.getElementById("pedido__total"); // Contenedor del costo total
const abonadoOutput = document.getElementById("abonadoOutput"); // Contenedor para mostrar el abono o deuda

// Datos globales
let pedido = []; // Array para almacenar los productos seleccionados
let costoTotal = 0; // Costo total del pedido
let abonado = 0; // Monto abonado por el cliente
let deuda = 0; // Diferencia entre el costo total y el monto abonado

// Contadores para estadísticas
let totalPrendasCantidad = 0; // Total de unidades de prendas seleccionadas

// ==========================
// FUNCIONES REUTILIZABLES
// ==========================

// Crear botón para cada producto
const crearBoton = producto => {
    return `
    <button id="${producto.id}" class="boton__producto" onclick="pedirProductos(${producto.id})">
        ${producto.title} ${producto.price}
    </button>
    `;
};

// Imprimir botones de productos en la sección correspondiente
const imprimirBotones = (arrayOfProducts, idSelector) => {
    let productsTemplate = "";
    for (const element of arrayOfProducts) {
        productsTemplate += crearBoton(element);
    }
    const productsSelector = document.getElementById(idSelector);
    productsSelector.innerHTML = productsTemplate;
};

// Actualizar la lista de pedidos en el DOM
const actualizarImpresionLista = () => {
    let listaDePedidos = pedido.map(element => `
        <div class="orden">
            <div class="orden__title">${element.title}:</div>
            <div class="orden__costo">${element.price}</div>
            <div class="orden__cantidad">${element.cantidad}</div>
            <div class="orden__cantidad--elemento">${element.cantidad * element.price}</div>
            <div class="orden__eliminar">
                <button onclick="EliminarOrden(${element.id})">x</button>
            </div>
        </div>
    `).join(""); // Combinar todos los elementos en un solo string
    lista.innerHTML = listaDePedidos; // Actualizar el contenido de la lista
};

// ==========================
// FUNCIONES PRINCIPALES
// ==========================

// Agregar producto al pedido
const pedirProductos = id => {
    productos.forEach(element => {
        if (element.id === id.toString()) {
            const exists = pedido.some(p => p.id === id.toString());

            if (!exists) {
                // Si el producto no está en el pedido, agregarlo
                pedido.push(element);
                element.cantidad++;
                totalPrendasCantidad++; // Incrementar el total de prendas
            } else {
                // Si ya está, solo incrementar la cantidad
                element.cantidad++;
                totalPrendasCantidad++; // Incrementar el total de prendas
            }

            // Actualizar costos
            costoTotal += element.price;
            deuda = costoTotal - abonado;

            // Actualizar el DOM
            actualizarImpresionLista();
            idCostoTotal.innerHTML = costoTotal;
            abonadoOutput.textContent = deuda;
            document.getElementById("cantidad__pedido").innerHTML = totalPrendasCantidad;
        }
    });
};

// Eliminar un producto del pedido
const EliminarOrden = id => {
    pedido.forEach((element, index) => {
        if (element.id === id.toString()) {
            if (element.cantidad > 1) {
                element.cantidad--;
                totalPrendasCantidad--;
            } else {
                totalPrendasCantidad--;
                pedido.splice(index, 1); // Eliminar producto del array
            }
            costoTotal -= element.price;
        }
    });

    // Actualizar deuda y DOM
    deuda = costoTotal - abonado;
    idCostoTotal.innerHTML = costoTotal;
    abonadoOutput.textContent = deuda;
    actualizarImpresionLista();
    document.getElementById("cantidad__pedido").innerHTML = totalPrendasCantidad;
};

// Registrar abono y calcular deuda
const printAbonado = () => {
    const textInput = document.getElementById("abonadoInput").value;
    const numericInput = textInput.replace(/\D/g, ""); // Filtrar solo números

    if (costoTotal <= 0) {
        abonadoOutput.textContent = "ERROR";
    } else {
        abonado = parseInt(numericInput) || 0;
        deuda = costoTotal - abonado;
        abonadoOutput.textContent = deuda;
    }
};

// Reiniciar página
const EliminarPedido = () => {
    if (confirm("¿Deseas realizar esta acción?")) {
        location.reload();
    }
};

// ==========================
// INICIALIZACIONES
// ==========================

// Inicializar botones
imprimirBotones(prendas, "prendas");
imprimirBotones(accesorios, "accesorios");

// Inicializar contadores
document.getElementById("cantidad__pedido").innerHTML = totalPrendasCantidad;
