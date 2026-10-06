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

    function alternarMenu() {
        setMenuAbierto((estadoActual) => !estadoActual);
    }

    function seleccionarCategoria(categoria) {
        filtrarCategoria(categoria);
        cerrarMenu();
    }

    return (
        <header className="header-principal navbar navbar-expand-lg">
            <div className="header-contenido container-fluid">

                {/* LOGO */}
                <a
                    href="#inicio"
                    className="logo-link navbar-brand"
                    onClick={cerrarMenu}
                >
                    <img
                        src={logoGgames}
                        alt="GGAMES"
                        className="logo-imagen"
                    />
                </a>

                {/* BOTÓN HAMBURGUESA */}
                <button
                    className="menu-toggle navbar-toggler"
                    type="button"
                    onClick={alternarMenu}
                    aria-label="Abrir o cerrar menú"
                    aria-expanded={menuAbierto}
                    aria-controls="menuPrincipal"
                >
                    ☰
                </button>

                {/* MENÚ PRINCIPAL */}
                <div
                    id="menuPrincipal"
                    className={`collapse navbar-collapse menu-contenido ${menuAbierto ? "show menu-abierto" : ""
                        }`}
                >
                    <nav className="nav-principal navbar-nav me-auto mb-2 mb-lg-0">

                        {/* INICIO */}
                        <a
                            href="#inicio"
                            className="nav-inicio nav-link"
                            onClick={cerrarMenu}
                        >
                            Inicio
                        </a>

                        {/* TODOS LOS PRODUCTOS */}
                        <button
                            type="button"
                            className="nav-boton nav-link"
                            onClick={() => {
                                mostrarTodos();
                                cerrarMenu();
                            }}
                        >
                            Productos
                        </button>

                        {/* DROPDOWN BOOTSTRAP DE CATEGORÍAS */}
                        <div className="nav-item dropdown">
                            <button
                                type="button"
                                className="nav-boton nav-link dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Categorías
                            </button>

                            <ul className="dropdown-menu categorias-dropdown">

                                <li>
                                    <button
                                        type="button"
                                        className="dropdown-item"
                                        onClick={() => {
                                            mostrarTodos();
                                            cerrarMenu();
                                        }}
                                    >
                                        Todas
                                    </button>
                                </li>

                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li>
                                    <button
                                        type="button"
                                        className="dropdown-item"
                                        onClick={() =>
                                            seleccionarCategoria("Acción")
                                        }
                                    >
                                        Acción
                                    </button>
                                </li>

                                <li>
                                    <button
                                        type="button"
                                        className="dropdown-item"
                                        onClick={() =>
                                            seleccionarCategoria("Aventura")
                                        }
                                    >
                                        Aventura
                                    </button>
                                </li>

                                <li>
                                    <button
                                        type="button"
                                        className="dropdown-item"
                                        onClick={() =>
                                            seleccionarCategoria("Deportes")
                                        }
                                    >
                                        Deportes
                                    </button>
                                </li>

                                <li>
                                    <button
                                        type="button"
                                        className="dropdown-item"
                                        onClick={() =>
                                            seleccionarCategoria("RPG")
                                        }
                                    >
                                        RPG
                                    </button>
                                </li>

                                <li>
                                    <button
                                        type="button"
                                        className="dropdown-item"
                                        onClick={() =>
                                            seleccionarCategoria("Carreras")
                                        }
                                    >
                                        Carreras
                                    </button>
                                </li>

                                <li>
                                    <button
                                        type="button"
                                        className="dropdown-item"
                                        onClick={() =>
                                            seleccionarCategoria("Estrategia")
                                        }
                                    >
                                        Estrategia
                                    </button>
                                </li>

                                <li>
                                    <button
                                        type="button"
                                        className="dropdown-item"
                                        onClick={() =>
                                            seleccionarCategoria("Simulación")
                                        }
                                    >
                                        Simulación
                                    </button>
                                </li>

                                <li>
                                    <button
                                        type="button"
                                        className="dropdown-item"
                                        onClick={() =>
                                            seleccionarCategoria("Terror")
                                        }
                                    >
                                        Terror
                                    </button>
                                </li>

                                <li>
                                    <button
                                        type="button"
                                        className="dropdown-item"
                                        onClick={() =>
                                            seleccionarCategoria("Plataformas")
                                        }
                                    >
                                        Plataformas
                                    </button>
                                </li>

                                <li>
                                    <button
                                        type="button"
                                        className="dropdown-item"
                                        onClick={() =>
                                            seleccionarCategoria("Shooter")
                                        }
                                    >
                                        Shooter
                                    </button>
                                </li>

                                <li>
                                    <button
                                        type="button"
                                        className="dropdown-item"
                                        onClick={() =>
                                            seleccionarCategoria("Mundo abierto")
                                        }
                                    >
                                        Mundo abierto
                                    </button>
                                </li>

                                <li>
                                    <button
                                        type="button"
                                        className="dropdown-item"
                                        onClick={() =>
                                            seleccionarCategoria("Puzles")
                                        }
                                    >
                                        Puzles
                                    </button>
                                </li>

                            </ul>
                        </div>

                        {/* CARRITO */}
                        <a
                            href="#carrito"
                            className="carrito-nav nav-link"
                            onClick={cerrarMenu}
                        >
                            Carrito ({cantidadCarrito})
                        </a>

                        {/* CONTACTO */}
                        <a
                            href="#contacto"
                            className="nav-link"
                            onClick={cerrarMenu}
                        >
                            Contacto
                        </a>

                    </nav>

                    {/* BUSCADOR */}
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