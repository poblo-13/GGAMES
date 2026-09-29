import ProductCard from "./ProductCard.jsx";

function ProductList({ productos, agregarAlCarrito }) {
    return (
        <section id="productos">
            <h2>Productos destacados</h2>

            <div className="product-list">
                {productos.map((producto) => (
                    <ProductCard
                        key={producto.id}
                        producto={producto}
                        agregarAlCarrito={agregarAlCarrito}
                    />
                ))}
            </div>
        </section>
    );
}

export default ProductList;