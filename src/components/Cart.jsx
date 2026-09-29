import CartItem from "./CartItem.jsx";

function Cart({
    carrito,
    aumentarCantidad,
    disminuirCantidad,
    eliminarDelCarrito
}) {
    const total = carrito.reduce(
        (acumulador, producto) =>
            acumulador + producto.precioOferta * producto.cantidad,
        0
    );

    const cantidadTotal = carrito.reduce(
        (acumulador, producto) =>
            acumulador + producto.cantidad,
        0
    );

    return (
        <section id="carrito">
            <h2>Carrito de compras</h2>

            {carrito.length === 0 ? (
                <p>Tu carrito está vacío.</p>
            ) : (
                <>
                    <div className="lista-carrito">
                        {carrito.map((producto) => (
                            <CartItem
                                key={producto.id}
                                producto={producto}
                                aumentarCantidad={aumentarCantidad}
                                disminuirCantidad={disminuirCantidad}
                                eliminarDelCarrito={eliminarDelCarrito}
                            />
                        ))}
                    </div>

                    <div className="resumen-carrito">
                        <p>
                            Productos en el carrito: {cantidadTotal}
                        </p>

                        <p className="total-carrito">
                            Total: ${total.toLocaleString("es-CL")}
                        </p>
                    </div>
                </>
            )}
        </section>
    );
}

export default Cart;