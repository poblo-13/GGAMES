/* =========================
   DATOS GENERALES
   ========================= */

// Guarda los productos cargados desde el archivo JSON
let productosDisponibles = [];

// Guarda los productos agregados al carrito
let carrito = [];


/* =========================
   CARGA DE PRODUCTOS
   ========================= */

// Obtiene los productos desde el archivo JSON local
function cargarProductos() {

    const contenedor =
        document.getElementById("contenedor-productos");


    // Evita continuar si el contenedor no existe.
    if (!contenedor) {
        console.error(
            "No se encontró el contenedor de productos."
        );
        return;
    }


    const mensajeCarga =
        document.createElement("p");

    mensajeCarga.classList.add(
        "mensaje-api"
    );

    mensajeCarga.textContent =
        "Cargando productos...";

    contenedor.appendChild(
        mensajeCarga
    );


    fetch("assets/data/productos.json")

        .then(function (respuesta) {

            if (!respuesta.ok) {

                throw new Error(
                    `Error HTTP: ${respuesta.status}`
                );
            }

            return respuesta.json();
        })

        .then(function (productos) {

            // Valida que el archivo JSON contenga una lista
            if (!Array.isArray(productos)) {

                throw new Error(
                    "El archivo JSON no contiene una lista válida de productos."
                );
            }


            // Guarda los productos para reutilizarlos
            productosDisponibles =
                productos;


            // Elimina el mensaje de carga
            mensajeCarga.remove();


            // Crea una tarjeta por cada producto
            productosDisponibles.forEach(
                function (producto) {

                    crearTarjetaProducto(
                        producto
                    );
                }
            );
        })

        .catch(function (error) {

            mensajeCarga.remove();


            const mensajeError =
                document.createElement("p");

            mensajeError.classList.add(
                "mensaje-error"
            );

            mensajeError.textContent =
                "No fue posible cargar los productos. Intenta nuevamente más tarde.";

            contenedor.appendChild(
                mensajeError
            );


            console.error(
                "Error al cargar productos:",
                error
            );
        });
}


/* =========================
   CREAR TARJETAS
   ========================= */

// Crea dinámicamente una tarjeta Bootstrap
function crearTarjetaProducto(producto) {

    const contenedor =
        document.getElementById(
            "contenedor-productos"
        );


    if (!contenedor) {
        return;
    }


    // Columna Bootstrap
    const columna =
        document.createElement("div");

    columna.classList.add(
        "col-12",
        "col-md-6",
        "col-lg-4"
    );

    columna.dataset.productoId =
        producto.id;


    // Tarjeta
    const tarjeta =
        document.createElement("article");

    tarjeta.classList.add(
        "card",
        "h-100"
    );


    // Imagen
    const imagen =
        document.createElement("img");

    imagen.src =
        producto.imagen;

    imagen.alt =
        producto.nombre;

    imagen.loading =
        "lazy";

    imagen.classList.add(
        "card-img-top"
    );


    // Cuerpo
    const cuerpo =
        document.createElement("div");

    cuerpo.classList.add(
        "card-body"
    );


    // Título
    const titulo =
        document.createElement("h3");

    titulo.classList.add(
        "card-title"
    );

    titulo.textContent =
        producto.nombre;


    // Categoría
    const categoria =
        document.createElement("p");

    categoria.classList.add(
        "categoria"
    );

    categoria.textContent =
        producto.categoria;


    // Plataformas
    const plataformas =
        document.createElement("p");

    plataformas.classList.add(
        "plataformas"
    );

    plataformas.textContent =
        producto.plataformas;


    // Precio
    const precio =
        document.createElement("p");

    precio.classList.add(
        "precio"
    );

    precio.textContent =
        formatearPrecio(
            producto.precio
        );


    // Botón detalles
    const botonDetalles =
        document.createElement("button");

    botonDetalles.type =
        "button";

    botonDetalles.textContent =
        "Ver detalles";

    botonDetalles.classList.add(
        "btn",
        "btn-outline-info",
        "me-2",
        "mt-2"
    );


    // Botón carrito
    const botonCarrito =
        document.createElement("button");

    botonCarrito.type =
        "button";

    botonCarrito.textContent =
        "Agregar al carrito";

    botonCarrito.classList.add(
        "btn",
        "btn-outline-success",
        "mt-2"
    );


    // Evento agregar al carrito
    botonCarrito.addEventListener(
        "click",
        function () {

            agregarAlCarrito(
                producto
            );

            mostrarConfirmacionCarrito(
                botonCarrito,
                tarjeta
            );
        }
    );


    // Evento detalles
    botonDetalles.addEventListener(
        "click",
        function () {

            mostrarOcultarDetalles(
                tarjeta,
                producto,
                botonDetalles
            );
        }
    );


    // Efecto mouseover
    tarjeta.addEventListener(
        "mouseover",
        function (event) {

            if (
                !tarjeta.contains(
                    event.relatedTarget
                )
            ) {

                tarjeta.classList.add(
                    "card-mouseover"
                );
            }
        }
    );


    // Efecto mouseout
    tarjeta.addEventListener(
        "mouseout",
        function (event) {

            if (
                !tarjeta.contains(
                    event.relatedTarget
                )
            ) {

                tarjeta.classList.remove(
                    "card-mouseover"
                );
            }
        }
    );


    // Construcción de la tarjeta
    cuerpo.appendChild(
        titulo
    );

    cuerpo.appendChild(
        categoria
    );

    cuerpo.appendChild(
        plataformas
    );

    cuerpo.appendChild(
        precio
    );

    cuerpo.appendChild(
        botonDetalles
    );

    cuerpo.appendChild(
        botonCarrito
    );


    tarjeta.appendChild(
        imagen
    );

    tarjeta.appendChild(
        cuerpo
    );

    columna.appendChild(
        tarjeta
    );

    contenedor.appendChild(
        columna
    );
}


/* =========================
   DETALLES DE PRODUCTO
   ========================= */

// Muestra u oculta la descripción del producto
function mostrarOcultarDetalles(
    tarjeta,
    producto,
    boton
) {

    const detalleExistente =
        tarjeta.querySelector(
            ".detalle-dinamico"
        );


    if (detalleExistente) {

        detalleExistente.remove();

        boton.textContent =
            "Ver detalles";

        return;
    }


    const detalle =
        document.createElement("div");

    detalle.classList.add(
        "detalle-dinamico"
    );


    const tituloDetalle =
        document.createElement("strong");

    tituloDetalle.textContent =
        "Información adicional:";


    const textoDetalle =
        document.createElement("p");

    textoDetalle.textContent =
        producto.descripcion;


    detalle.appendChild(
        tituloDetalle
    );

    detalle.appendChild(
        textoDetalle
    );


    const cuerpoTarjeta =
        tarjeta.querySelector(
            ".card-body"
        );


    if (!cuerpoTarjeta) {
        return;
    }


    cuerpoTarjeta.appendChild(
        detalle
    );


    boton.textContent =
        "Ocultar detalles";
}


/* =========================
   BUSCADOR DE PRODUCTOS
   ========================= */

// Configura el formulario de búsqueda
function configurarBuscador() {

    const formulario =
        document.getElementById(
            "form-buscador"
        );

    const input =
        document.getElementById(
            "input-buscador"
        );

    const seccionProductos =
        document.getElementById(
            "productos"
        );


    if (
        !formulario ||
        !input ||
        !seccionProductos
    ) {
        return;
    }


    formulario.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const textoBusqueda =
                input.value
                    .trim()
                    .toLowerCase();


            let cantidadResultados = 0;


            productosDisponibles.forEach(
                function (producto) {

                    const columna =
                        document.querySelector(
                            `[data-producto-id="${producto.id}"]`
                        );


                    if (!columna) {
                        return;
                    }


                    const nombre =
                        producto.nombre
                            .toLowerCase();


                    const categoria =
                        producto.categoria
                            .toLowerCase();


                    const coincideNombre =
                        nombre.includes(
                            textoBusqueda
                        );


                    const coincideCategoria =
                        categoria.includes(
                            textoBusqueda
                        );


                    const aliasProducto =
                        Array.isArray(producto.alias)
                            ? producto.alias
                            : [];


                    const coincideAlias =
                        aliasProducto.some(
                            function (alias) {

                                return alias
                                    .toLowerCase()
                                    .includes(
                                        textoBusqueda
                                    );
                            }
                        );


                    if (
                        textoBusqueda === "" ||
                        coincideNombre ||
                        coincideCategoria ||
                        coincideAlias
                    ) {

                        columna.classList.remove(
                            "oculto"
                        );

                        cantidadResultados++;

                    } else {

                        columna.classList.add(
                            "oculto"
                        );
                    }
                }
            );


            mostrarMensajeBusqueda(
                textoBusqueda,
                cantidadResultados
            );


            seccionProductos.scrollIntoView({
                behavior: "smooth"
            });
        }
    );
}


/* =========================
   MENSAJE DE RESULTADOS
   ========================= */

// Muestra información sobre la búsqueda
function mostrarMensajeBusqueda(
    textoBusqueda,
    cantidadResultados
) {

    const seccionProductos =
        document.getElementById(
            "productos"
        );


    if (!seccionProductos) {
        return;
    }


    const mensajeAnterior =
        document.getElementById(
            "mensaje-busqueda"
        );


    if (mensajeAnterior) {

        mensajeAnterior.remove();
    }


    const mensaje =
        document.createElement("div");

    mensaje.id =
        "mensaje-busqueda";

    mensaje.classList.add(
        "mensaje-busqueda"
    );


    if (textoBusqueda === "") {

        mensaje.textContent =
            "Mostrando todos los juegos disponibles.";

    } else if (
        cantidadResultados === 0
    ) {

        const sugerencia =
            obtenerSugerencia(
                textoBusqueda
            );


        if (sugerencia) {

            const textoMensaje =
                document.createElement("span");

            textoMensaje.textContent =
                `No encontramos "${textoBusqueda}". ¿Quizás quisiste decir `;


            const botonSugerencia =
                document.createElement("button");

            botonSugerencia.type =
                "button";

            botonSugerencia.textContent =
                sugerencia;

            botonSugerencia.classList.add(
                "btn-sugerencia"
            );


            const cierre =
                document.createElement("span");

            cierre.textContent =
                "?";


            mensaje.appendChild(
                textoMensaje
            );

            mensaje.appendChild(
                botonSugerencia
            );

            mensaje.appendChild(
                cierre
            );


            botonSugerencia.addEventListener(
                "click",
                function () {

                    const input =
                        document.getElementById(
                            "input-buscador"
                        );

                    const formulario =
                        document.getElementById(
                            "form-buscador"
                        );


                    if (
                        !input ||
                        !formulario
                    ) {
                        return;
                    }


                    input.value =
                        sugerencia;

                    formulario.requestSubmit();
                }
            );

        } else {

            mensaje.textContent =
                `No encontramos juegos relacionados con "${textoBusqueda}".`;
        }

    } else if (
        cantidadResultados === 1
    ) {

        mensaje.textContent =
            `Se encontró 1 juego relacionado con "${textoBusqueda}".`;

    } else {

        mensaje.textContent =
            `Se encontraron ${cantidadResultados} juegos relacionados con "${textoBusqueda}".`;
    }


    seccionProductos.appendChild(
        mensaje
    );
}


/* =========================
   SUGERENCIAS ORTOGRÁFICAS
   ========================= */

// Busca la palabra más parecida al texto ingresado
function obtenerSugerencia(
    textoBusqueda
) {

    const palabrasDisponibles = [];


    productosDisponibles.forEach(
        function (producto) {

            palabrasDisponibles.push(
                producto.nombre
                    .toLowerCase()
            );


            const aliasProducto =
                Array.isArray(producto.alias)
                    ? producto.alias
                    : [];


            aliasProducto.forEach(
                function (alias) {

                    palabrasDisponibles.push(
                        alias.toLowerCase()
                    );
                }
            );
        }
    );


    let mejorPalabra =
        null;

    let menorDistancia =
        Infinity;


    palabrasDisponibles.forEach(
        function (palabra) {

            const distancia =
                calcularDistancia(
                    textoBusqueda,
                    palabra
                );


            if (
                distancia <
                menorDistancia
            ) {

                menorDistancia =
                    distancia;

                mejorPalabra =
                    palabra;
            }
        }
    );


    const limiteError =
        textoBusqueda.length <= 4
            ? 1
            : 2;


    if (
        menorDistancia <=
        limiteError
    ) {

        return mejorPalabra;
    }


    return null;
}


/* =========================
   DISTANCIA ENTRE PALABRAS
   ========================= */

// Calcula cuántas modificaciones separan dos textos
function calcularDistancia(
    texto1,
    texto2
) {

    const matriz = [];


    for (
        let i = 0;
        i <= texto2.length;
        i++
    ) {

        matriz[i] = [i];
    }


    for (
        let j = 0;
        j <= texto1.length;
        j++
    ) {

        matriz[0][j] = j;
    }


    for (
        let i = 1;
        i <= texto2.length;
        i++
    ) {

        for (
            let j = 1;
            j <= texto1.length;
            j++
        ) {

            if (
                texto2.charAt(i - 1) ===
                texto1.charAt(j - 1)
            ) {

                matriz[i][j] =
                    matriz[i - 1][j - 1];

            } else {

                matriz[i][j] =
                    Math.min(
                        matriz[i - 1][j - 1] + 1,
                        matriz[i][j - 1] + 1,
                        matriz[i - 1][j] + 1
                    );
            }
        }
    }


    return matriz
    [texto2.length]
    [texto1.length];
}


/* =========================
   FORMATO DE PRECIOS
   ========================= */

// Convierte números al formato de moneda chilena
function formatearPrecio(valor) {

    const precio =
        Number(valor);


    if (
        Number.isNaN(precio)
    ) {

        return "$0";
    }


    return new Intl.NumberFormat(
        "es-CL",
        {
            style: "currency",
            currency: "CLP",
            maximumFractionDigits: 0
        }
    ).format(precio);
}


/* =========================
   AGREGAR AL CARRITO
   ========================= */

// Agrega un producto o aumenta su cantidad
function agregarAlCarrito(
    producto
) {

    const productoExistente =
        carrito.find(
            function (item) {

                return item.id ===
                    producto.id;
            }
        );


    if (productoExistente) {

        productoExistente.cantidad++;

    } else {

        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1
        });
    }


    actualizarCarrito();
}


/* =========================
   ACTUALIZAR CARRITO
   ========================= */

// Actualiza el resumen, contador y total
function actualizarCarrito() {

    const contadorCarrito =
        document.getElementById(
            "contador-carrito"
        );

    const resumen =
        document.getElementById(
            "resumen-carrito"
        );

    const valorTotal =
        document.getElementById(
            "valor-total"
        );


    if (
        !contadorCarrito ||
        !resumen ||
        !valorTotal
    ) {
        return;
    }


    // Limpia el contenido anterior
    resumen.replaceChildren();


    const cantidadTotal =
        carrito.reduce(
            function (
                total,
                producto
            ) {

                return total +
                    producto.cantidad;
            },
            0
        );


    contadorCarrito.textContent =
        cantidadTotal;


    if (carrito.length === 0) {

        const mensaje =
            document.createElement("p");

        mensaje.id =
            "carrito-vacio";

        mensaje.textContent =
            "Tu carrito está vacío.";


        resumen.appendChild(
            mensaje
        );


        valorTotal.textContent =
            formatearPrecio(0);

        return;
    }


    let total =
        0;


    carrito.forEach(
        function (producto) {

            const item =
                document.createElement("div");

            item.classList.add(
                "item-carrito"
            );


            const nombre =
                document.createElement("h3");

            nombre.textContent =
                producto.nombre;


            const cantidad =
                document.createElement("p");

            cantidad.textContent =
                `Cantidad: ${producto.cantidad}`;


            const subtotal =
                producto.precio *
                producto.cantidad;


            const textoSubtotal =
                document.createElement("p");

            textoSubtotal.textContent =
                `Subtotal: ${formatearPrecio(subtotal)}`;


            const botonEliminar =
                document.createElement("button");

            botonEliminar.type =
                "button";

            botonEliminar.textContent =
                "Quitar";

            botonEliminar.classList.add(
                "btn",
                "btn-outline-danger",
                "btn-sm"
            );


            botonEliminar.addEventListener(
                "click",
                function () {

                    eliminarDelCarrito(
                        producto.id
                    );
                }
            );


            item.appendChild(
                nombre
            );

            item.appendChild(
                cantidad
            );

            item.appendChild(
                textoSubtotal
            );

            item.appendChild(
                botonEliminar
            );


            resumen.appendChild(
                item
            );


            total +=
                subtotal;
        }
    );


    valorTotal.textContent =
        formatearPrecio(
            total
        );
}


/* =========================
   ELIMINAR DEL CARRITO
   ========================= */

// Reduce la cantidad o elimina el producto
function eliminarDelCarrito(
    idProducto
) {

    const producto =
        carrito.find(
            function (item) {

                return item.id ===
                    idProducto;
            }
        );


    if (!producto) {
        return;
    }


    if (
        producto.cantidad > 1
    ) {

        producto.cantidad--;

    } else {

        carrito =
            carrito.filter(
                function (item) {

                    return item.id !==
                        idProducto;
                }
            );
    }


    actualizarCarrito();
}


/* =========================
   FILTRO POR CATEGORÍAS
   ========================= */

// Configura las categorías del navbar
function configurarCategorias() {

    const botonesCategoria =
        document.querySelectorAll(
            ".filtro-categoria"
        );

    const botonTodos =
        document.getElementById(
            "mostrar-todos"
        );

    const seccionProductos =
        document.getElementById(
            "productos"
        );


    if (
        !botonTodos ||
        !seccionProductos
    ) {
        return;
    }


    botonesCategoria.forEach(
        function (boton) {

            boton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    const categoriaSeleccionada =
                        boton.dataset.categoria
                            .toLowerCase();


                    let cantidadResultados =
                        0;


                    productosDisponibles.forEach(
                        function (producto) {

                            const columna =
                                document.querySelector(
                                    `[data-producto-id="${producto.id}"]`
                                );


                            if (!columna) {
                                return;
                            }


                            const categoriaProducto =
                                producto.categoria
                                    .toLowerCase();


                            if (
                                categoriaProducto.includes(
                                    categoriaSeleccionada
                                )
                            ) {

                                columna.classList.remove(
                                    "oculto"
                                );

                                cantidadResultados++;

                            } else {

                                columna.classList.add(
                                    "oculto"
                                );
                            }
                        }
                    );


                    mostrarMensajeCategoria(
                        boton.textContent.trim(),
                        cantidadResultados
                    );


                    seccionProductos.scrollIntoView({
                        behavior: "smooth"
                    });
                }
            );
        }
    );


    // Muestra nuevamente todos los juegos
    botonTodos.addEventListener(
        "click",
        function (event) {

            event.preventDefault();


            productosDisponibles.forEach(
                function (producto) {

                    const columna =
                        document.querySelector(
                            `[data-producto-id="${producto.id}"]`
                        );


                    if (!columna) {
                        return;
                    }


                    columna.classList.remove(
                        "oculto"
                    );
                }
            );


            mostrarMensajeBusqueda(
                "",
                productosDisponibles.length
            );


            seccionProductos.scrollIntoView({
                behavior: "smooth"
            });
        }
    );
}


/* =========================
   MENSAJE DE CATEGORÍA
   ========================= */

// Muestra cuántos juegos pertenecen a una categoría
function mostrarMensajeCategoria(
    categoria,
    cantidadResultados
) {

    const seccionProductos =
        document.getElementById(
            "productos"
        );


    if (!seccionProductos) {
        return;
    }


    const mensajeAnterior =
        document.getElementById(
            "mensaje-busqueda"
        );


    if (mensajeAnterior) {

        mensajeAnterior.remove();
    }


    const mensaje =
        document.createElement("div");

    mensaje.id =
        "mensaje-busqueda";

    mensaje.classList.add(
        "mensaje-busqueda"
    );


    if (
        cantidadResultados === 1
    ) {

        mensaje.textContent =
            `Se encontró 1 juego en la categoría "${categoria}".`;

    } else {

        mensaje.textContent =
            `Se encontraron ${cantidadResultados} juegos en la categoría "${categoria}".`;
    }


    seccionProductos.appendChild(
        mensaje
    );
}


/* =========================
   CONFIRMACIÓN VISUAL CARRITO
   ========================= */

// Muestra una animación al agregar un producto
function mostrarConfirmacionCarrito(
    boton,
    tarjeta
) {

    const resumenCarrito =
        document.getElementById(
            "resumen-carrito"
        );


    if (!resumenCarrito) {
        return;
    }


    const textoOriginal =
        boton.textContent;


    boton.textContent =
        "✓ Agregado";


    boton.classList.add(
        "producto-agregado"
    );

    tarjeta.classList.add(
        "card-agregada"
    );

    resumenCarrito.classList.add(
        "carrito-actualizado"
    );


    setTimeout(
        function () {

            boton.textContent =
                textoOriginal;

            boton.classList.remove(
                "producto-agregado"
            );

            tarjeta.classList.remove(
                "card-agregada"
            );

            resumenCarrito.classList.remove(
                "carrito-actualizado"
            );

        },
        800
    );
}


/* =========================
   INICIO
   ========================= */

// Activa las funciones principales
configurarBuscador();
configurarCategorias();
cargarProductos();