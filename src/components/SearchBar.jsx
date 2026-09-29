function SearchBar({ busqueda, cambiarBusqueda }) {
    return (
        <form
            className="buscador"
            onSubmit={(evento) => evento.preventDefault()}
        >
            <input
                type="search"
                placeholder="Buscar juegos..."
                value={busqueda}
                onChange={(evento) => cambiarBusqueda(evento.target.value)}
                aria-label="Buscar juegos"
            />

            <button type="submit">
                Buscar
            </button>
        </form>
    );
}

export default SearchBar;