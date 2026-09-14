/* =========================
   PALABRAS CLAVE DE JUEGOS
   ========================= */

// Alias y términos relacionados para mejorar las búsquedas
const palabrasClaveJuegos = {

    "GRAND THEFT AUTO VI": [
        "gta",
        "gta vi",
        "gta 6",
        "vice city",
        "mundo abierto"
    ],

    "FC 27": [
        "fc",
        "futbol",
        "fútbol",
        "ea sports",
        "deportes"
    ],

    "LEGO Batman: El Legado del Caballero Oscuro": [
        "batman",
        "lego",
        "dc",
        "caballero oscuro"
    ],

    "STRAY": [
        "gato",
        "gatito",
        "b12",
        "b-12",
        "ciberciudad"
    ],

    "Hogwarts Legacy": [
        "harry potter",
        "hogwarts",
        "magia",
        "mundo abierto"
    ],

    "God of War III Remastered": [
        "gow",
        "god of war",
        "kratos",
        "grecia"
    ]
};


/* =========================
   BUSCADOR DE PRODUCTOS
   ========================= */

// Configura el formulario de búsqueda de juegos
function configurarBuscador() {

    const formulario =
        document.getElementById("form-buscador");

    const input =
        document.getElementById("input-buscador");

    const seccionProductos =
        document.getElementById("productos");

    const tarjetas =
        document.querySelectorAll("#productos .card");


    formulario.addEventListener("submit", function (event) {

        // Evita que el formulario recargue la página
        event.preventDefault();

        const textoBusqueda =
            input.value.trim().toLowerCase();

        let cantidadResultados = 0;


        tarjetas.forEach(function (tarjeta) {

            const tituloOriginal = tarjeta
                .querySelector(".card-title")
                .textContent
                .trim();

            const titulo =
                tituloOriginal.toLowerCase();

            const palabrasRelacionadas =
                palabrasClaveJuegos[tituloOriginal] || [];


            // Comprueba si coincide directamente con el título
            const coincideTitulo =
                titulo.includes(textoBusqueda);


            // Comprueba alias y palabras relacionadas
            const coincidePalabraClave =
                palabrasRelacionadas.some(function (palabra) {

                    return palabra
                        .toLowerCase()
                        .includes(textoBusqueda);
                });


            if (coincideTitulo || coincidePalabraClave) {

                tarjeta.parentElement
                    .classList.remove("oculto");

                cantidadResultados++;

            } else {

                tarjeta.parentElement
                    .classList.add("oculto");
            }
        });


        mostrarMensajeBusqueda(
            textoBusqueda,
            cantidadResultados
        );


        // Desplaza suavemente hacia los productos
        seccionProductos.scrollIntoView({
            behavior: "smooth"
        });
    });
}


/* =========================
   MENSAJE DE RESULTADOS
   ========================= */

// Crea y muestra el mensaje correspondiente a la búsqueda
function mostrarMensajeBusqueda(
    textoBusqueda,
    cantidadResultados
) {

    const seccionProductos =
        document.getElementById("productos");

    const mensajeAnterior =
        document.getElementById("mensaje-busqueda");


    // Elimina el mensaje anterior para evitar duplicados
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

    } else if (cantidadResultados === 0) {

        const sugerencia =
            obtenerSugerencia(textoBusqueda);


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


            // Al hacer clic en la sugerencia realiza la búsqueda correcta
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

                    input.value =
                        sugerencia;

                    formulario.requestSubmit();
                }
            );

        } else {

            mensaje.textContent =
                `No encontramos juegos relacionados con "${textoBusqueda}".`;
        }

    } else if (cantidadResultados === 1) {

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
   CORRECCIÓN ORTOGRÁFICA
   ========================= */

// Busca el término conocido más parecido a lo escrito por el usuario
function obtenerSugerencia(textoBusqueda) {

    const palabrasDisponibles = [];


    // Agrega títulos y palabras relacionadas a una sola lista
    Object.entries(
        palabrasClaveJuegos
    ).forEach(function ([titulo, palabras]) {

        palabrasDisponibles.push(
            titulo.toLowerCase()
        );

        palabras.forEach(function (palabra) {

            palabrasDisponibles.push(
                palabra.toLowerCase()
            );
        });
    });


    let mejorPalabra = null;
    let menorDistancia = Infinity;


    palabrasDisponibles.forEach(function (palabra) {

        const distancia =
            calcularDistancia(
                textoBusqueda,
                palabra
            );

        if (distancia < menorDistancia) {

            menorDistancia =
                distancia;

            mejorPalabra =
                palabra;
        }
    });


    // Solo entrega una sugerencia cuando los textos son parecidos
    const limiteError =
        textoBusqueda.length <= 4
            ? 1
            : 2;


    if (menorDistancia <= limiteError) {
        return mejorPalabra;
    }

    return null;
}


/* =========================
   DISTANCIA ENTRE PALABRAS
   ========================= */

// Calcula cuántos cambios se necesitan para convertir una palabra en otra
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
   DETALLES DE PRODUCTOS
   ========================= */

// Agrega un botón a cada tarjeta para mostrar u ocultar información adicional
function configurarDetallesProductos() {

    const tarjetas =
        document.querySelectorAll(
            "#productos .card"
        );


    tarjetas.forEach(function (tarjeta) {

        const cuerpoTarjeta =
            tarjeta.querySelector(
                ".card-body"
            );


        // Crea el botón dinámicamente
        const botonDetalles =
            document.createElement(
                "button"
            );

        botonDetalles.type =
            "button";

        botonDetalles.textContent =
            "Ver detalles";

        botonDetalles.classList.add(
            "btn",
            "btn-outline-info",
            "mt-3"
        );


        cuerpoTarjeta.appendChild(
            botonDetalles
        );


        // Detecta el clic sobre el botón
        botonDetalles.addEventListener(
            "click",
            function () {

                const detalleExistente =
                    tarjeta.querySelector(
                        ".detalle-dinamico"
                    );


                // Si el detalle ya existe, lo elimina
                if (detalleExistente) {

                    detalleExistente.remove();

                    botonDetalles.textContent =
                        "Ver detalles";

                    return;
                }


                // Obtiene la información guardada en data-detalle
                const informacionDetalle =
                    tarjeta.dataset.detalle;


                // Crea el bloque de información adicional
                const detalle =
                    document.createElement(
                        "div"
                    );

                detalle.classList.add(
                    "detalle-dinamico"
                );


                const tituloDetalle =
                    document.createElement(
                        "strong"
                    );

                tituloDetalle.textContent =
                    "Información adicional:";


                const textoDetalle =
                    document.createElement(
                        "p"
                    );

                textoDetalle.textContent =
                    informacionDetalle;


                // Inserta los elementos dentro del nuevo bloque
                detalle.appendChild(
                    tituloDetalle
                );

                detalle.appendChild(
                    textoDetalle
                );


                // Inserta el bloque dentro de la tarjeta
                cuerpoTarjeta.appendChild(
                    detalle
                );


                // Cambia el texto del botón
                botonDetalles.textContent =
                    "Ocultar detalles";
            }
        );
    });
}


/* =========================
   EFECTO MOUSEOVER
   ========================= */

function configurarMouseoverProductos() {

    const tarjetas =
        document.querySelectorAll("#productos .card");

    tarjetas.forEach(function (tarjeta) {

        tarjeta.addEventListener("mouseover", function (event) {

            if (!tarjeta.contains(event.relatedTarget)) {
                tarjeta.classList.add("card-mouseover");
            }
        });


        tarjeta.addEventListener("mouseout", function (event) {

            if (!tarjeta.contains(event.relatedTarget)) {
                tarjeta.classList.remove("card-mouseover");
            }
        });
    });
}

/* =========================
   FETCH API - OFERTAS
   ========================= */

// Obtiene videojuegos desde una API externa y los muestra en la página
function cargarOfertasExternas() {

    const contenedor =
        document.getElementById("contenedor-ofertas");

    const url =
        "https://www.cheapshark.com/api/1.0/deals?storeID=1&pageSize=3";


    // Mensaje mientras se solicitan los datos
    contenedor.innerHTML =
        `<p class="mensaje-api">Cargando ofertas...</p>`;


    fetch(url)

        // Convierte la respuesta recibida a formato JSON
        .then(function (respuesta) {

            if (!respuesta.ok) {
                throw new Error("No fue posible obtener las ofertas.");
            }

            return respuesta.json();
        })


        // Trabaja con los datos recibidos
        .then(function (datos) {

            contenedor.innerHTML = "";

            datos.forEach(function (juego) {

                crearTarjetaOferta(juego);
            });
        })


        // Maneja errores de conexión o de la API
        .catch(function (error) {

            contenedor.innerHTML =
                `<p class="mensaje-error">
                    No fue posible cargar las ofertas externas.
                </p>`;

            console.error(
                "Error al obtener datos:",
                error
            );
        });
}


/* =========================
   TARJETAS DESDE LA API
   ========================= */

// Crea dinámicamente una tarjeta con los datos recibidos
function crearTarjetaOferta(juego) {

    const contenedor =
        document.getElementById("contenedor-ofertas");


    // Columna Bootstrap
    const columna =
        document.createElement("div");

    columna.classList.add(
        "col-12",
        "col-md-6",
        "col-lg-4"
    );


    // Tarjeta
    const tarjeta =
        document.createElement("article");

    tarjeta.classList.add(
        "card",
        "h-100",
        "card-oferta-api"
    );


    // Imagen
    const imagen =
        document.createElement("img");

    imagen.src =
        juego.thumb;

    imagen.alt =
        `Imagen de ${juego.title}`;

    imagen.loading =
        "lazy";

    imagen.classList.add(
        "card-img-top",
        "imagen-api"
    );


    // Cuerpo de la tarjeta
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
        juego.title;


    // Precio normal
    const precioNormal =
        document.createElement("p");

    precioNormal.classList.add(
        "precio-anterior"
    );

    precioNormal.textContent =
        `Precio normal: US$${juego.normalPrice}`;


    // Precio oferta
    const precioOferta =
        document.createElement("p");

    precioOferta.classList.add(
        "precio"
    );

    precioOferta.textContent =
        `Oferta: US$${juego.salePrice}`;


    // Ahorro
    const ahorro =
        document.createElement("p");

    ahorro.classList.add(
        "ahorro-api"
    );

    ahorro.textContent =
        `Descuento aproximado: ${Math.round(juego.savings)}%`;


    // Inserta los elementos en la tarjeta
    cuerpo.appendChild(titulo);
    cuerpo.appendChild(precioNormal);
    cuerpo.appendChild(precioOferta);
    cuerpo.appendChild(ahorro);

    tarjeta.appendChild(imagen);
    tarjeta.appendChild(cuerpo);

    columna.appendChild(tarjeta);

    contenedor.appendChild(columna);
}

/* =========================
   INICIO
   ========================= */

// Activa las funciones principales de la página
configurarBuscador();
configurarDetallesProductos();
configurarMouseoverProductos();
cargarOfertasExternas();