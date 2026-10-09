import { useState } from "react";

function CatalogManager({
    productos,
    agregarProducto,
    eliminarProducto
}) {
    const [formulario, setFormulario] = useState({
        nombre: "",
        categoria: "",
        precioNormal: "",
        precioOferta: "",
        descripcion: ""
    });

    const [errores, setErrores] = useState({});
    const [mensaje, setMensaje] = useState("");

    function manejarCambio(evento) {
        const { name, value } = evento.target;

        setFormulario((estadoActual) => ({
            ...estadoActual,
            [name]: value
        }));

        setErrores((erroresActuales) => ({
            ...erroresActuales,
            [name]: ""
        }));

        setMensaje("");
    }

    function validarFormulario() {
        const nuevosErrores = {};

        if (formulario.nombre.trim().length < 2) {
            nuevosErrores.nombre =
                "Ingresa un nombre válido.";
        }

        if (!formulario.categoria) {
            nuevosErrores.categoria =
                "Selecciona una categoría.";
        }

        const precioNormal =
            Number(formulario.precioNormal);

        const precioOferta =
            Number(formulario.precioOferta);

        if (
            !Number.isFinite(precioNormal) ||
            precioNormal <= 0
        ) {
            nuevosErrores.precioNormal =
                "Ingresa un precio normal válido.";
        }

        if (
            !Number.isFinite(precioOferta) ||
            precioOferta <= 0
        ) {
            nuevosErrores.precioOferta =
                "Ingresa un precio de oferta válido.";
        }

        if (
            precioNormal > 0 &&
            precioOferta > precioNormal
        ) {
            nuevosErrores.precioOferta =
                "La oferta no puede superar el precio normal.";
        }

        if (formulario.descripcion.trim().length < 10) {
            nuevosErrores.descripcion =
                "La descripción debe tener al menos 10 caracteres.";
        }

        return nuevosErrores;
    }

    function manejarEnvio(evento) {
        evento.preventDefault();

        const nuevosErrores = validarFormulario();

        if (Object.keys(nuevosErrores).length > 0) {
            setErrores(nuevosErrores);
            return;
        }

        agregarProducto({
            nombre: formulario.nombre.trim(),
            categoria: formulario.categoria,
            precioNormal: Number(formulario.precioNormal),
            precioOferta: Number(formulario.precioOferta),
            descripcion: formulario.descripcion.trim(),
            alias: []
        });

        setFormulario({
            nombre: "",
            categoria: "",
            precioNormal: "",
            precioOferta: "",
            descripcion: ""
        });

        setErrores({});
        setMensaje(
            "✓ Videojuego agregado correctamente al catálogo."
        );
    }

    return (
        <section
            id="gestion-catalogo"
            className="gestion-catalogo container py-5"
        >
            <div className="row g-4">

                <div className="col-12 col-lg-5">
                    <div className="gestion-card card h-100">
                        <div className="card-body p-4">

                            <h2 className="gestion-titulo mb-3">
                                Gestión de catálogo
                            </h2>

                            <p className="gestion-descripcion">
                                Agrega nuevos videojuegos utilizando
                                el estado de React.
                            </p>

                            {mensaje && (
                                <div
                                    className="alert alert-success"
                                    role="alert"
                                >
                                    {mensaje}
                                </div>
                            )}

                            <form
                                onSubmit={manejarEnvio}
                                noValidate
                            >
                                <div className="mb-3">
                                    <label
                                        htmlFor="nuevoNombre"
                                        className="form-label"
                                    >
                                        Nombre
                                    </label>

                                    <input
                                        id="nuevoNombre"
                                        name="nombre"
                                        type="text"
                                        className={`form-control ${errores.nombre
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        value={formulario.nombre}
                                        onChange={manejarCambio}
                                        placeholder="Nombre del videojuego"
                                    />

                                    {errores.nombre && (
                                        <div className="invalid-feedback">
                                            {errores.nombre}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label
                                        htmlFor="nuevaCategoria"
                                        className="form-label"
                                    >
                                        Categoría
                                    </label>

                                    <select
                                        id="nuevaCategoria"
                                        name="categoria"
                                        className={`form-select ${errores.categoria
                                                ? "is-invalid"
                                                : ""
                                            }`}
                                        value={formulario.categoria}
                                        onChange={manejarCambio}
                                    >
                                        <option value="">
                                            Selecciona una categoría
                                        </option>

                                        <option value="Acción">
                                            Acción
                                        </option>

                                        <option value="Aventura">
                                            Aventura
                                        </option>

                                        <option value="Deportes">
                                            Deportes
                                        </option>

                                        <option value="RPG">
                                            RPG
                                        </option>

                                        <option value="Carreras">
                                            Carreras
                                        </option>

                                        <option value="Estrategia">
                                            Estrategia
                                        </option>

                                        <option value="Simulación">
                                            Simulación
                                        </option>

                                        <option value="Terror">
                                            Terror
                                        </option>

                                        <option value="Plataformas">
                                            Plataformas
                                        </option>

                                        <option value="Shooter">
                                            Shooter
                                        </option>

                                        <option value="Mundo abierto">
                                            Mundo abierto
                                        </option>

                                        <option value="Puzles">
                                            Puzles
                                        </option>
                                    </select>

                                    {errores.categoria && (
                                        <div className="invalid-feedback">
                                            {errores.categoria}
                                        </div>
                                    )}
                                </div>

                                <div className="row">
                                    <div className="col-12 col-md-6 mb-3">
                                        <label
                                            htmlFor="precioNormal"
                                            className="form-label"
                                        >
                                            Precio normal
                                        </label>

                                        <input
                                            id="precioNormal"
                                            name="precioNormal"
                                            type="number"
                                            min="1"
                                            className={`form-control ${errores.precioNormal
                                                ? "is-invalid"
                                                : ""
                                                }`}
                                            value={formulario.precioNormal}
                                            onChange={manejarCambio}
                                            placeholder="29990"
                                        />

                                        {errores.precioNormal && (
                                            <div className="invalid-feedback">
                                                {errores.precioNormal}
                                            </div>
                                        )}
                                    </div>

                                    <div className="col-12 col-md-6 mb-3">
                                        <label
                                            htmlFor="precioOferta"
                                            className="form-label"
                                        >
                                            Precio oferta
                                        </label>

                                        <input
                                            id="precioOferta"
                                            name="precioOferta"
                                            type="number"
                                            min="1"
                                            className={`form-control ${errores.precioOferta
                                                ? "is-invalid"
                                                : ""
                                                }`}
                                            value={formulario.precioOferta}
                                            onChange={manejarCambio}
                                            placeholder="24990"
                                        />

                                        {errores.precioOferta && (
                                            <div className="invalid-feedback">
                                                {errores.precioOferta}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="nuevaDescripcion"
                                        className="form-label"
                                    >
                                        Descripción
                                    </label>

                                    <textarea
                                        id="nuevaDescripcion"
                                        name="descripcion"
                                        rows="4"
                                        className={`form-control ${errores.descripcion
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        value={formulario.descripcion}
                                        onChange={manejarCambio}
                                        placeholder="Describe brevemente el videojuego..."
                                    />

                                    {errores.descripcion && (
                                        <div className="invalid-feedback">
                                            {errores.descripcion}
                                        </div>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-success w-100"
                                >
                                    Agregar videojuego
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-7">
                    <div className="gestion-card card h-100">
                        <div className="card-body p-4">

                            <h2 className="gestion-titulo mb-3">
                                Videojuegos disponibles
                            </h2>

                            <p className="gestion-descripcion">
                                Productos actuales: {productos.length}
                            </p>

                            <div className="list-group lista-gestion">
                                {productos.map((producto) => (
                                    <div
                                        key={producto.id}
                                        className="list-group-item d-flex justify-content-between align-items-center gap-3"
                                    >
                                        <div>
                                            <strong>
                                                {producto.nombre}
                                            </strong>

                                            <div className="gestion-categoria">
                                                {producto.categoria}
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            className="btn btn-outline-danger btn-sm"
                                            onClick={() =>
                                                eliminarProducto(producto.id)
                                            }
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {productos.length === 0 && (
                                <div
                                    className="alert alert-warning mt-3"
                                    role="alert"
                                >
                                    No quedan videojuegos en el catálogo.
                                </div>
                            )}

                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default CatalogManager;