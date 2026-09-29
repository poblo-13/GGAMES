import { useState } from "react";
import logoGgames from "../assets/GGAMES.png";
import SearchBar from "./SearchBar.jsx";

function Header({
    cantidadCarrito,
    filtrarCategoria,
    mostrarTodos,
    busqueda,
    cambiarBusqueda
}) {
    const [menuAbierto, setMenuAbierto] = useState(false);

    function cerrarMenu() {
        setMenuAbierto(false);
    }

    return (
        <header className="header-principal">
            <div className="header-contenido">
                <a
                    href="#inicio"
                    className="logo-link"
                    onClick={cerrarMenu}
                >
                    <img
                        src={logoGgames}
                        alt="GGAMES"
                        className="logo-imagen"
                    />
                </a>

                <button
                    className="menu-toggle"
                    onClick={() => setMenuAbierto((estado) => !estado)}
                    aria-label="Abrir o cerrar menú"
                    aria-expanded={menuAbierto}
                >
                    ☰
                </button>

                <div
                    className={`menu-contenido ${menuAbierto ? "menu-abierto" : ""
                        }`}
                >
                    <nav className="nav-principal">
                        <a
                            href="#inicio"
                            className="nav-inicio"
                            onClick={cerrarMenu}
                        >
                            Inicio
                        </a>

                        <button
                            className="nav-boton"
                            onClick={() => {
                                mostrarTodos();
                                cerrarMenu();
                            }}
                        >
                            Productos
                        </button>

                        <button
                            className="nav-boton"
                            onClick={() => {
                                filtrarCategoria("Acción");
                                cerrarMenu();
                            }}
                        >
                            Acción y aventura
                        </button>

                        <button
                            className="nav-boton"
                            onClick={() => {
                                filtrarCategoria("Deportes");
                                cerrarMenu();
                            }}
                        >
                            Deportes
                        </button>

                        <a
                            href="#carrito"
                            className="carrito-nav"
                            onClick={cerrarMenu}
                        >
                            Carrito ({cantidadCarrito})
                        </a>

                        <a
                            href="#contacto"
                            onClick={cerrarMenu}
                        >
                            Contacto
                        </a>
                    </nav>

                    <SearchBar
                        busqueda={busqueda}
                        cambiarBusqueda={cambiarBusqueda}
                    />
                </div>
            </div>
        </header>
    );
}

export default Header;