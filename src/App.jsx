import { useState } from "react";

import Header from "./components/Header.jsx";
import HeroCarousel from "./components/HeroCarousel.jsx";
import WhyGgames from "./components/WhyGgames.jsx";
import ProductList from "./components/ProductList.jsx";
import Cart from "./components/Cart.jsx";
import Footer from "./components/Footer.jsx";

import productos from "./data/productos.js";

import "./App.css";

function App() {
  const [carrito, setCarrito] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");
  const [busqueda, setBusqueda] = useState("");

  function agregarAlCarrito(producto) {
    setCarrito((carritoActual) => {
      const productoExistente = carritoActual.find(
        (item) => item.id === producto.id
      );

      if (productoExistente) {
        return carritoActual.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
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
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      )
    );
  }

  function disminuirCantidad(id) {
    setCarrito((carritoActual) =>
      carritoActual
        .map((item) =>
          item.id === id
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  }

  function eliminarDelCarrito(id) {
    setCarrito((carritoActual) =>
      carritoActual.filter((item) => item.id !== id)
    );
  }

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

  function normalizarTexto(texto) {
    return texto
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
        const costo = a[i - 1] === b[j - 1] ? 0 : 1;

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
        const distancia = calcularDistancia(
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

  const textoBusqueda = normalizarTexto(busqueda);

  const productosFiltrados = productos.filter((producto) => {
    const coincideCategoria =
      categoriaSeleccionada === "Todas" ||
      producto.categoria === categoriaSeleccionada;

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

    return coincideCategoria && coincideBusqueda;
  });

  const sugerencia =
    productosFiltrados.length === 0 && busqueda.trim() !== ""
      ? obtenerSugerencia(busqueda)
      : null;

  const cantidadTotalCarrito = carrito.reduce(
    (total, item) => total + item.cantidad,
    0
  );

  return (
    <>
      <Header
        cantidadCarrito={cantidadTotalCarrito}
        filtrarCategoria={filtrarCategoria}
        mostrarTodos={mostrarTodos}
        busqueda={busqueda}
        cambiarBusqueda={cambiarBusqueda}
      />

      <main>
        <HeroCarousel />

        <section className="bienvenida">
          <h2>Bienvenido a GGAMES</h2>

          <p>
            En GGAMES, nos apasiona ofrecerte la mejor experiencia
            de compra de videojuegos. Explora nuestra selección de
            títulos y descubre nuevas aventuras para todas las
            plataformas.
          </p>
        </section>

        <WhyGgames />

        {productosFiltrados.length > 0 ? (
          <ProductList
            productos={productosFiltrados}
            agregarAlCarrito={agregarAlCarrito}
          />
        ) : (
          <section className="mensaje-busqueda">
            <h2>No encontramos juegos</h2>

            <p>
              No hay resultados para "
              <strong>{busqueda}</strong>".
            </p>

            {sugerencia && (
              <button
                onClick={() =>
                  setBusqueda(sugerencia.nombre)
                }
              >
                ¿Quisiste decir {sugerencia.nombre}?
              </button>
            )}
          </section>
        )}

        <Cart
          carrito={carrito}
          aumentarCantidad={aumentarCantidad}
          disminuirCantidad={disminuirCantidad}
          eliminarDelCarrito={eliminarDelCarrito}
        />
      </main>

      <Footer />
    </>
  );
}

export default App;