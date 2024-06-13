// AREA DE PRODUCTOS
// CREA BOTON PEDIDO
const crearBoton = producto => {
    return `
    <button id="${producto.id}" class="boton__producto" onclick="pedirProductos(${producto.id})" >${producto.title}: ${producto.price}</button>
    `;
}

// IMPRIME BOTONES
const imprimirBotones = (arrayOfProducts, idSelector) => {
    let productsTemplate = "";
    for (element of arrayOfProducts) {
        productsTemplate = productsTemplate + crearBoton(element);
    }
    const productsSelector = document.getElementById(idSelector);
    productsSelector.innerHTML = productsTemplate;
}
imprimirBotones (prendas, "prendas");
imprimirBotones (accesorios, "accesorios");



// AREA DE PEDIDO
// ID LISTA DE PEDIDOS
const  lista = document.getElementById("lista__container--pedidos");

// ID COSTO TOTAL
const idCostoTotal = document.getElementById("pedido__total")

// ID ABONADO OUPUT
const abonadoOutput = document.getElementById("abonadoOutput");

// ARRAY DE PEDIDOS
let pedido = [];

// COSTO TOTAL DEL PEDIDO
let costoTotal = 0;

// ABONADO
let abonado = 0;

// DEUDA
let deuda = 0


// PONER CLIENTE
const printCliente = () => {
    let textInput = document.getElementById("textInput").value;
    let output = document.getElementById("output");
    output.textContent = textInput;
}
// ACTUALIZAR LISTA
const ActulizarImpresionLista = () => {
    const crearPedido = () => {
        return `
        <div class="orden">
            <div class="orden__title">
                ${element.title}:
            </div>
            <div class="orden__costo">
                ${element.price}
            </div>
            <div class="orden__cantidad">
                ${element.cantidad}
            </div>
            <div class="orden__cantidad--elemento">
                ${(element.cantidad * element.price)}
            </div>
            <div class="orden__eliminar">
            <button onclick="EliminarOrden(${element.id})">
                x
            </button>
            </div>
        </div>
        `
    }
    let listaDePedidos = "";
    for (element of pedido) {
        listaDePedidos = listaDePedidos +  crearPedido(element);
    }
    lista.innerHTML = listaDePedidos;
}
// IMPRIME PRODUCTO
const pedirProductos = (id) => {
    // Busca el producto en productos
    productos.forEach(element => {
        if (element.id === id.toString()) {
            // Busca si ya hay un producto igual en pedido
            const exists = pedido.some(element => element.id === id.toString());
            if (!exists) {
                pedido.push(element);                    

                element.cantidad++

                ActulizarImpresionLista()

                // Actulizar costoTotal
                costoTotal += element.price
                idCostoTotal.innerHTML = costoTotal
            } else {
            element.cantidad++

            ActulizarImpresionLista()

            //Actualiza el costoTotal
            costoTotal += element.price
            idCostoTotal.innerHTML = costoTotal

            };

            // ACTUALIZA A DEUDA
            deuda = costoTotal - abonado
            abonadoOutput.textContent = deuda;
        };
    })
}
// ELIMINAR ORDEN
const EliminarOrden = (id) => {
    pedido.forEach(element => {
        if(element.id === id.toString() && element.cantidad > 1){
            element.cantidad--
            ActulizarImpresionLista()
            costoTotal -= element.price
            idCostoTotal.innerHTML = costoTotal
        } else if(element.id === id.toString() && element.cantidad === 1){
            element.cantidad--
            costoTotal -= element.price
            idCostoTotal.innerHTML = costoTotal
            let indice = pedido.indexOf(element)
            pedido.splice(indice,1)
            ActulizarImpresionLista()
        }
    })
    deuda = costoTotal - abonado
    abonadoOutput.textContent = deuda;
}
// PONER ABONO
const printAbonado = () => {
    let textInput = document.getElementById("abonadoInput").value;
    // Filtrar solo números
    let numericInput = textInput.replace(/\D/g, '');

    // LIMPIA ABONADO
    abonado = 0

    // COSTO TOTAL
    if (costoTotal <= 0) {
        let mensaje = "ERROR"
        abonadoOutput.textContent = mensaje;
    } else {
        abonado = numericInput
        deuda = costoTotal - abonado
        abonadoOutput.textContent = deuda;
    }
}
// REINICIA LA PAGINA
const EliminarPedido = () => {
    let userConfirmed = confirm("¿Deseas realizar esta acción?");
    if (userConfirmed) {
        location.reload();
    } else {
        
    }
}

// IMPRIME LA PAGINA
const Imprimir = () => {
    window.print()
}


// Previene el gesto de zoom con dos dedos
document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
})
// Previene el zoom mediante toque con múltiples dedos
document.addEventListener('touchmove', function (e) {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
}, { passive: false });