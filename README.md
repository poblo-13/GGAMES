# GGAMES - Semana 8

Proyecto desarrollado para la asignatura Desarrollo Frontend I (PFY2201).

GGAMES es un eCommerce de videojuegos desarrollado con React y Vite. Durante la Semana 8 se continuó mejorando el proyecto desarrollado previamente, incorporando gestión de estados, efectos secundarios, carga dinámica de datos, persistencia del carrito y manejo de errores.

## Tecnologías utilizadas

- React
- Vite
- JavaScript
- JSX
- CSS
- JSON
- LocalStorage
- GitHub Pages

## Funcionalidades principales

### Catálogo dinámico

Los productos ya no se encuentran importados directamente desde un archivo JavaScript.

El catálogo se carga dinámicamente desde:

`public/data/productos.json`

utilizando `fetch`, `useEffect` y `useState`.

### Estados de carga y error

Durante la carga del catálogo se muestra un mensaje informativo al usuario.

Si ocurre un problema al obtener los productos, la aplicación muestra un mensaje de error y permite volver a intentar la carga mediante el botón:

`Reintentar carga`

### Validación de productos

Los datos obtenidos desde el archivo JSON son validados antes de incorporarlos al estado de la aplicación.

Esto permite evitar que productos con información incompleta o incorrecta afecten el funcionamiento del catálogo.

### Carrito de compras

El carrito permite:

- Agregar productos.
- Aumentar cantidades.
- Disminuir cantidades.
- Eliminar productos.
- Mostrar la cantidad total de productos.
- Calcular subtotales.
- Calcular el total de la compra.

### Persistencia con LocalStorage

El carrito se almacena en `localStorage`.

Gracias a esto, los productos y cantidades se mantienen incluso después de actualizar o volver a abrir la página.

También se valida la información recuperada desde el almacenamiento antes de utilizarla.

### Renderizado condicional

La aplicación utiliza renderizado condicional para mostrar diferentes contenidos según el estado.

Algunos ejemplos son:

- Mensaje mientras se cargan los productos.
- Mensaje cuando ocurre un error.
- Botón para reintentar la carga.
- Mensaje cuando el carrito está vacío.
- Mensaje cuando una búsqueda no encuentra resultados.
- Sugerencias de búsqueda.
- Indicador `OFERTA`.
- Cambio del botón `Agregar al carrito` por `✓ En el carrito`.

### Manejo de errores de imágenes

Si una imagen de producto no puede cargarse, GGAMES muestra automáticamente una imagen alternativa.

Esto evita imágenes rotas y mantiene la presentación visual del catálogo.

### Búsqueda inteligente

La búsqueda permite encontrar videojuegos por:

- Nombre.
- Categoría.
- Descripción.
- Alias relacionados.

Además, cuando no existe una coincidencia directa, se utiliza una estrategia basada en distancia de edición para sugerir un producto similar.

### Diseño responsive

La aplicación adapta su navegación, catálogo, buscador, carrito y demás elementos a diferentes tamaños de pantalla.

## Hooks utilizados

### useState

Se utiliza para administrar estados como:

- Productos.
- Carrito.
- Búsqueda.
- Categorías.
- Estado de carga.
- Estado de error.
- Intentos de carga.
- Elementos interactivos de los componentes.

### useEffect

Se utiliza principalmente para:

1. Cargar dinámicamente el catálogo desde un archivo JSON.
2. Guardar automáticamente los cambios del carrito en `localStorage`.

## Estructura general

```text
public/
├── data/
│   └── productos.json
└── img/

src/
├── assets/
├── components/
│   ├── Cart.jsx
│   ├── CartItem.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── HeroCarousel.jsx
│   ├── ProductCard.jsx
│   ├── ProductList.jsx
│   ├── SearchBar.jsx
│   └── WhyGgames.jsx
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

## Ejecución local

Instalar dependencias:

```bash
npm install
```

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

Revisar el código con ESLint:

```bash
npm run lint
```

Generar la versión de producción:

```bash
npm run build
```

## Despliegue

El proyecto será publicado mediante GitHub Pages utilizando la rama `gh-pages`.