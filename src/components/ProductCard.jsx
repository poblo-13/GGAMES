import { useState } from "react";

function ProductCard({
    producto,
    estaEnCarrito,
    agregarAlCarrito
}) {
    const [imagenError, setImagenError] = useState(false);

    const productoValido =
        producto &&
        producto.nombre &&
        typeof producto.precioNormal === "number" &&
        typeof producto.precioOferta === "number" &&
        producto.imagen;

    if (!productoValido) {
        return (
            <article className="producto-card card producto-error">
                <div className="card-body">
                    <p className="card-text mb-0">
                        Producto no disponible.
                    </p>
                </div>
            </article>
        );
    }

    const tieneOferta =
        producto.precioOferta < producto.precioNormal;

    const imagenAlternativa =
        `${import.meta.env.BASE_URL}img/imagen_no_disponible.svg`;

    return (
        <article className="producto-card card h-100">
            {tieneOferta && (
                <span className="badge-oferta badge rounded-pill">
                    OFERTA
                </span>
            )}

            <img
                src={
                    imagenError
                        ? imagenAlternativa
                        : producto.imagen
                }
                alt={
                    imagenError
                        ? `Imagen no disponible para ${producto.nombre}`
                        : producto.nombre
                }
                className="producto-imagen card-img-top img-fluid"
                onError={() => setImagenError(true)}
            />

            <div className="card-body d-flex flex-column">
                <h3 className="card-title">
                    {producto.nombre}
                </h3>

                <p className="card-text">
                    {producto.descripcion}
                </p>

                <p className="precio-normal card-text">
                    Precio normal: $
                    {producto.precioNormal.toLocaleString("es-CL")}
                </p>

                <p className="precio-oferta card-text">
                    Precio oferta: $
                    {producto.precioOferta.toLocaleString("es-CL")}
                </p>

                <div className="mt-auto">
                    {estaEnCarrito ? (
                        <button
                            type="button"
                            className="btn-en-carrito btn w-100"
                            disabled
                        >
                            ✓ En el carrito
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="btn btn-success w-100"
                            onClick={() => agregarAlCarrito(producto)}
                        >
                            Agregar al carrito
                        </button>
                    )}
                </div>
            </div>
        </article>
    );
}

export default ProductCard;