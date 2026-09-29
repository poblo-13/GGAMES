function ProductCard({ producto, agregarAlCarrito }) {
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

    return (
        <article className="producto-card">
            {tieneOferta && (
                <span className="badge-oferta">
                    OFERTA
                </span>
            )}

            <img
                src={producto.imagen}
                alt={producto.nombre}
                className="producto-imagen"
            />

            <h3>{producto.nombre}</h3>

            <p>{producto.descripcion}</p>

            <p className="precio-normal">
                Precio normal: ${producto.precioNormal.toLocaleString("es-CL")}
            </p>

            <p className="precio-oferta">
                Precio oferta: ${producto.precioOferta.toLocaleString("es-CL")}
            </p>

            <button onClick={() => agregarAlCarrito(producto)}>
                Agregar al carrito
            </button>
        </article>
    );
}

export default ProductCard;