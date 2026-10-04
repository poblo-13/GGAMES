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
            <article className="producto-card producto-error">
                <p>Producto no disponible.</p>
            </article>
        );
    }

    const tieneOferta =
        producto.precioOferta < producto.precioNormal;

    const imagenAlternativa =
        `${import.meta.env.BASE_URL}img/imagen_no_disponible.svg`;

    return (
        <article className="producto-card">
            {tieneOferta && (
                <span className="badge-oferta">
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
                className="producto-imagen"
                onError={() => setImagenError(true)}
            />

            <h3>{producto.nombre}</h3>

            <p>{producto.descripcion}</p>

            <p className="precio-normal">
                Precio normal: $
                {producto.precioNormal.toLocaleString("es-CL")}
            </p>

            <p className="precio-oferta">
                Precio oferta: $
                {producto.precioOferta.toLocaleString("es-CL")}
            </p>

            {estaEnCarrito ? (
                <button
                    className="btn-en-carrito"
                    disabled
                >
                    ✓ En el carrito
                </button>
            ) : (
                <button
                    onClick={() => agregarAlCarrito(producto)}
                >
                    Agregar al carrito
                </button>
            )}
        </article>
    );
}

export default ProductCard;