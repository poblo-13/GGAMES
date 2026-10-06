import { useEffect, useState } from "react";

import Header from "./components/Header.jsx";
import HeroCarousel from "./components/HeroCarousel.jsx";
import WhyGgames from "./components/WhyGgames.jsx";
import ProductList from "./components/ProductList.jsx";
import CatalogManager from "./components/CatalogManager.jsx";
import Cart from "./components/Cart.jsx";
import ContactForm from "./components/ContactForm.jsx";
import Footer from "./components/Footer.jsx";

import "./App.css";

function App() {
  // ==================================================
  // ESTADOS DEL CATÁLOGO
  // ==================================================

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [intentoCarga, setIntentoCarga] = useState(0);

  // ==================================================
  // CARRITO CON PERSISTENCIA EN LOCALSTORAGE
  // ==================================================

  const [carrito, setCarrito] = useState(() => {
    try {
      const carritoGuardado =
        localStorage.getItem("ggames-carrito");

      if (!carritoGuardado) {
        return [];
      }

      const datos = JSON.parse(carritoGuardado);

      if (!Array.isArray(datos)) {
        localStorage.removeItem("ggames-carrito");
        return [];
      }

      const carritoValido = datos.filter(
        (producto) =>
          producto &&
          typeof producto.id === "number" &&
          typeof producto.nombre === "string" &&
          typeof producto.precioOferta === "number" &&
          typeof producto.cantidad === "number" &&
          producto.cantidad > 0
      );

      return carritoValido;
    } catch (errorLectura) {
      console.error(
        "No fue posible recuperar el carrito:",
        errorLectura
      );

      localStorage.removeItem("ggames-carrito");

      return [];
    }
  });

  // ==================================================
  // ESTADOS INTERACTIVOS
  // ==================================================

  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState("Todas");

  const [busqueda, setBusqueda] = useState("");

  // ==================================================
  // CARGA DINÁMICA DEL CATÁLOGO
  // ==================================================

  useEffect(() => {
    async function cargarProductos() {
      try {
        setCargando(true);
        setError(null);

        const respuesta = await fetch(
          `${import.meta.env.BASE_URL}data/productos.json`
        );

        if (!respuesta.ok) {
          throw new Error(
            `Error al cargar los productos: ${respuesta.status}`
          );
        }

        const datos = await respuesta.json();

        if (!Array.isArray(datos)) {
          throw new Error(
            "El formato del catálogo no es válido."
          );
        }

        const productosValidos = datos.filter(
          (producto) =>
            producto &&
            typeof producto.id === "number" &&
            typeof producto.nombre === "string" &&
            typeof producto.categoria === "string" &&
            typeof producto.descripcion === "string" &&
            typeof producto.precioNormal === "number" &&
            typeof producto.precioOferta === "number" &&
            typeof producto.imagen === "string"
        );

        if (productosValidos.length === 0) {
          throw new Error(
            "No se encontraron productos válidos."
          );
        }

        const productosConImagen =
          productosValidos.map((producto) => ({
            ...producto,
            imagen:
              `${import.meta.env.BASE_URL}${producto.imagen}`
          }));

        setProductos(productosConImagen);
      } catch (errorCarga) {
        console.error(
          "Error al cargar el catálogo:",
          errorCarga
        );

        setProductos([]);

        setError(
          "No fue posible cargar los productos. Verifica tu conexión o intenta nuevamente."
        );
      } finally {
        setCargando(false);
      }
    }

    cargarProductos();
  }, [intentoCarga]);

  // ==================================================
  // GUARDADO AUTOMÁTICO DEL CARRITO
  // ==================================================

  useEffect(() => {
    try {
      localStorage.setItem(
        "ggames-carrito",
        JSON.stringify(carrito)
      );
    } catch (errorGuardado) {
      console.error(
        "No fue posible guardar el carrito:",
        errorGuardado
      );
    }
  }, [carrito]);

  // ==================================================
  // RECUPERACIÓN ANTE ERROR
  // ==================================================

  function reintentarCarga() {
    setIntentoCarga(
      (intentoActual) => intentoActual + 1
    );
  }

  // ==================================================
  // FUNCIONES DEL CARRITO
  // ==================================================

  function agregarAlCarrito(producto) {
    setCarrito((carritoActual) => {
      const productoExistente =
        carritoActual.find(
          (item) => item.id === producto.id
        );

      if (productoExistente) {
        return carritoActual.map((item) =>
          item.id === producto.id
            ? {
              ...item,
              cantidad: item.cantidad + 1
            }
            : item
        );
      }

      return [
        ...carritoActual,
        {
          ...producto,
          cantidad: 1
        }
      ];
    });
  }

  function aumentarCantidad(id) {
    setCarrito((carritoActual) =>
      carritoActual.map((item) =>
        item.id === id
          ? {
            ...item,
            cantidad: item.cantidad + 1
          }
          : item
      )
    );
  }

  function disminuirCantidad(id) {
    setCarrito((carritoActual) =>
      carritoActual
        .map((item) =>
          item.id === id
            ? {
              ...item,
              cantidad: item.cantidad - 1
            }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  }

  function eliminarDelCarrito(id) {
    setCarrito((carritoActual) =>
      carritoActual.filter(
        (item) => item.id !== id
      )
    );
  }

  // ==================================================
  // GESTIÓN DINÁMICA DEL CATÁLOGO
  // ==================================================

  function agregarProductoCatalogo(nuevoProducto) {
    const productoConId = {
      ...nuevoProducto,

      // Date.now genera un identificador único
      // para los productos agregados durante la sesión.
      id: Date.now(),

      // Los productos nuevos utilizan una imagen
      // alternativa de GGAMES.
      imagen:
        `${import.meta.env.BASE_URL}img/imagen_no_disponible.svg`
    };

    setProductos((productosActuales) => [
      ...productosActuales,
      productoConId
    ]);
  }

  function eliminarProductoCatalogo(id) {
    // Elimina el videojuego del catálogo.
    setProductos((productosActuales) =>
      productosActuales.filter(
        (producto) => producto.id !== id
      )
    );

    // Si el videojuego también estaba en el carrito,
    // se elimina para mantener consistencia.
    setCarrito((carritoActual) =>
      carritoActual.filter(
        (producto) => producto.id !== id
      )
    );
  }

  // ==================================================
  // NAVEGACIÓN Y FILTROS
  // ==================================================

  function irAProductos() {
    setTimeout(() => {
      document
        .getElementById("productos")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
    }, 50);
  }

  function filtrarCategoria(categoria) {
    setCategoriaSeleccionada(categoria);
    irAProductos();
  }

  function mostrarTodos() {
    setCategoriaSeleccionada("Todas");
    irAProductos();
  }

  function cambiarBusqueda(texto) {
    setBusqueda(texto);
  }

  // ==================================================
  // BÚSQUEDA INTELIGENTE
  // ==================================================

  function normalizarTexto(texto) {
    return String(texto || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  }

  function calcularDistancia(textoA, textoB) {
    const a = normalizarTexto(textoA);
    const b = normalizarTexto(textoB);

    const matriz = Array.from(
      { length: a.length + 1 },
      () => Array(b.length + 1).fill(0)
    );

    for (let i = 0; i <= a.length; i++) {
      matriz[i][0] = i;
    }

    for (let j = 0; j <= b.length; j++) {
      matriz[0][j] = j;
    }

    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        const costo =
          a[i - 1] === b[j - 1] ? 0 : 1;

        matriz[i][j] = Math.min(
          matriz[i - 1][j] + 1,
          matriz[i][j - 1] + 1,
          matriz[i - 1][j - 1] + costo
        );
      }
    }

    return matriz[a.length][b.length];
  }

  function obtenerSugerencia(texto) {
    const termino = normalizarTexto(texto);

    if (termino.length < 3) {
      return null;
    }

    let mejorProducto = null;
    let menorDistancia = Infinity;

    productos.forEach((producto) => {
      const opciones = [
        producto.nombre,
        producto.categoria,
        ...(producto.alias || [])
      ];

      opciones.forEach((opcion) => {
        const distancia =
          calcularDistancia(
            termino,
            opcion
          );

        if (distancia < menorDistancia) {
          menorDistancia = distancia;
          mejorProducto = producto;
        }
      });
    });

    return menorDistancia <= 3
      ? mejorProducto
      : null;
  }

  // ==================================================
  // FILTRADO DEL CATÁLOGO
  // ==================================================

  const textoBusqueda =
    normalizarTexto(busqueda);

  const productosFiltrados =
    productos.filter((producto) => {
      const coincideCategoria =
        categoriaSeleccionada === "Todas" ||
        producto.categoria ===
        categoriaSeleccionada;

      const textosProducto = [
        producto.nombre,
        producto.categoria,
        producto.descripcion,
        ...(producto.alias || [])
      ].map(normalizarTexto);

      const coincideBusqueda =
        textoBusqueda === "" ||
        textosProducto.some((texto) =>
          texto.includes(textoBusqueda)
        );

      return (
        coincideCategoria &&
        coincideBusqueda
      );
    });

  const sugerencia =
    productosFiltrados.length === 0 &&
      productos.length > 0 &&
      busqueda.trim() !== "" &&
      !cargando &&
      !error
      ? obtenerSugerencia(busqueda)
      : null;

  const cantidadTotalCarrito =
    carrito.reduce(
      (total, item) =>
        total + item.cantidad,
      0
    );

  // ==================================================
  // INTERFAZ
  // ==================================================

  return (
    <>
      <Header
        cantidadCarrito={
          cantidadTotalCarrito
        }
        filtrarCategoria={
          filtrarCategoria
        }
        mostrarTodos={mostrarTodos}
        busqueda={busqueda}
        cambiarBusqueda={
          cambiarBusqueda
        }
      />

      <main>
        <HeroCarousel />

        <section className="bienvenida">
          <h2>
            Bienvenido a GGAMES
          </h2>

          <p>
            En GGAMES, nos apasiona ofrecerte
            la mejor experiencia de compra de
            videojuegos. Explora nuestra
            selección de títulos y descubre
            nuevas aventuras para todas las
            plataformas.
          </p>
        </section>

        <WhyGgames />

        {/* ==========================================
            CATÁLOGO
            ========================================== */}

        {cargando ? (
          <section className="mensaje-busqueda">
            <h2>
              Cargando productos...
            </h2>

            <p>
              Estamos preparando nuestro
              catálogo para ti.
            </p>
          </section>
        ) : error ? (
          <section className="mensaje-busqueda">
            <h2>
              No pudimos cargar el catálogo
            </h2>

            <p>
              {error}
            </p>

            <button
              type="button"
              className="btn btn-success"
              onClick={reintentarCarga}
            >
              Reintentar carga
            </button>
          </section>
        ) : productos.length === 0 ? (
          <section className="mensaje-busqueda">
            <h2>
              Catálogo vacío
            </h2>

            <p>
              Actualmente no hay videojuegos
              disponibles. Puedes agregar uno
              desde la gestión del catálogo.
            </p>
          </section>
        ) : productosFiltrados.length > 0 ? (
          <ProductList
            productos={
              productosFiltrados
            }
            carrito={carrito}
            agregarAlCarrito={
              agregarAlCarrito
            }
          />
        ) : (
          <section className="mensaje-busqueda">
            <h2>
              No encontramos juegos
            </h2>

            <p>
              No hay resultados para "
              <strong>
                {busqueda}
              </strong>
              ".
            </p>

            {sugerencia && (
              <button
                type="button"
                className="btn btn-success"
                onClick={() =>
                  setBusqueda(
                    sugerencia.nombre
                  )
                }
              >
                ¿Quisiste decir{" "}
                {sugerencia.nombre}?
              </button>
            )}
          </section>
        )}

        {/* ==========================================
            GESTIÓN DINÁMICA DEL CATÁLOGO
            ========================================== */}

        {!cargando && !error && (
          <CatalogManager
            productos={productos}
            agregarProducto={
              agregarProductoCatalogo
            }
            eliminarProducto={
              eliminarProductoCatalogo
            }
          />
        )}

        {/* ==========================================
            CARRITO
            ========================================== */}

        <Cart
          carrito={carrito}
          aumentarCantidad={
            aumentarCantidad
          }
          disminuirCantidad={
            disminuirCantidad
          }
          eliminarDelCarrito={
            eliminarDelCarrito
          }
        />

        {/* ==========================================
            FORMULARIO DE CONTACTO
            ========================================== */}

        <ContactForm />
      </main>

      <Footer />
    </>
  );
}

export default App;