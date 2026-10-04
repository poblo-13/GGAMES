import ProductCard from "./ProductCard.jsx";

function ProductList({
    productos,
    carrito,
    agregarAlCarrito
}) {
    return (
        <section id="productos">
            <h2>Productos destacados</h2>

            <div className="product-list">
                {productos.map((producto) => {
                    const estaEnCarrito = carrito.some(
                        (item) => item.id === producto.id
                    );

                    return (
                        <ProductCard
                            key={producto.id}
                            producto={producto}
                            estaEnCarrito={estaEnCarrito}
                            agregarAlCarrito={agregarAlCarrito}
                        />
                    );
                })}
            </div>
        </section>
    );
}

export default ProductList;