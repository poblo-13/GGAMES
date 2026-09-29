function CartItem({
    producto,
    aumentarCantidad,
    disminuirCantidad,
    eliminarDelCarrito
}) {
    const subtotal =
        producto.precioOferta * producto.cantidad;

    return (
        <article className="cart-item">
            <div className="cart-info">
                <h3>{producto.nombre}</h3>

                <p>
                    Precio: ${producto.precioOferta.toLocaleString("es-CL")}
                </p>

                <p>
                    Subtotal: ${subtotal.toLocaleString("es-CL")}
                </p>
            </div>

            <div className="cart-controles">
                <button
                    onClick={() => disminuirCantidad(producto.id)}
                    aria-label={`Disminuir cantidad de ${producto.nombre}`}
                >
                    −
                </button>

                <span className="cart-cantidad">
                    {producto.cantidad}
                </span>

                <button
                    onClick={() => aumentarCantidad(producto.id)}
                    aria-label={`Aumentar cantidad de ${producto.nombre}`}
                >
                    +
                </button>

                <button
                    className="btn-eliminar"
                    onClick={() => eliminarDelCarrito(producto.id)}
                >
                    Eliminar
                </button>
            </div>
        </article>
    );
}

export default CartItem;