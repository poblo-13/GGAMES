# GGAMES - Evaluación Final Transversal

Proyecto desarrollado para la asignatura **Desarrollo Frontend I** de Duoc UC.

**Estudiante:** Pablo Pilar Rojas  
**Proyecto:** GGAMES  
**Tipo de proyecto:** eCommerce de videojuegos  
**Tecnologías principales:** React, Vite, JavaScript, CSS3 y Bootstrap 5

---

## Descripción

GGAMES es una tienda online de videojuegos desarrollada como Evaluación Final Transversal de Desarrollo Frontend I.

La aplicación presenta un catálogo dinámico de videojuegos, búsqueda, filtros por categoría, carrito de compras, gestión del catálogo, formulario de contacto validado y una interfaz responsive adaptada a escritorio, tablet y dispositivos móviles.

El proyecto fue construido mediante componentes reutilizables de React y utiliza estados, propiedades, efectos y renderizado condicional para actualizar dinámicamente la interfaz.

---

## Tecnologías utilizadas

- HTML5 semántico
- CSS3
- Flexbox
- CSS Grid
- Bootstrap 5.3.8
- JavaScript
- React
- Vite
- JSON
- LocalStorage
- Git
- GitHub
- GitHub Pages

---

## Funcionalidades principales

### Catálogo dinámico

El catálogo inicial se obtiene desde:

```text
public/data/productos.json
```

La información se carga mediante `fetch`, `useEffect` y `useState`.

Antes de incorporar los productos al estado de la aplicación se valida que posean los datos necesarios para funcionar correctamente.

### Estados de carga y error

Durante la carga del catálogo la aplicación informa al usuario que los productos se están obteniendo.

Si ocurre un problema durante la carga, se muestra un mensaje de error y se ofrece la opción de volver a intentarlo mediante el botón **Reintentar carga**.

### Tarjetas de productos

Cada videojuego muestra:

- Imagen.
- Nombre.
- Descripción.
- Precio normal.
- Precio oferta.
- Indicador de oferta cuando corresponde.
- Botón para agregar el producto al carrito.

Cuando un videojuego ya se encuentra en el carrito, el botón cambia dinámicamente a:

```text
✓ En el carrito
```

### Manejo de errores de imágenes

Si la imagen de un videojuego no puede cargarse, se utiliza automáticamente una imagen alternativa ubicada en:

```text
public/img/imagen_no_disponible.svg
```

Esto evita mostrar imágenes rotas dentro del catálogo.

### Filtros por categoría

El menú de navegación incorpora un dropdown de Bootstrap que permite filtrar el catálogo por distintas categorías, entre ellas:

- Acción.
- Aventura.
- Deportes.
- RPG.
- Carreras.
- Estrategia.
- Simulación.
- Terror.
- Plataformas.
- Shooter.
- Mundo abierto.
- Puzles.

También es posible volver a visualizar todos los productos.

### Búsqueda inteligente

El buscador permite encontrar videojuegos considerando:

- Nombre.
- Categoría.
- Descripción.
- Alias relacionados.

Cuando no existe una coincidencia exacta, la aplicación utiliza una estrategia basada en distancia de edición para sugerir un videojuego similar.

### Carrito de compras

El carrito permite:

- Agregar videojuegos.
- Aumentar cantidades.
- Disminuir cantidades.
- Eliminar videojuegos.
- Mostrar la cantidad total de productos.
- Calcular subtotales.
- Calcular el total de la compra.
- Mostrar visualmente qué productos ya fueron agregados.

### Persistencia con LocalStorage

El contenido del carrito se guarda en `localStorage`.

Gracias a esto, los productos y cantidades se mantienen al actualizar la página o volver a abrir la aplicación.

La información recuperada desde el almacenamiento también es validada antes de utilizarse.

### Gestión dinámica del catálogo

La aplicación incorpora una sección de administración que permite agregar nuevos videojuegos al catálogo desde la interfaz.

Para registrar un videojuego se solicitan:

- Nombre.
- Categoría.
- Precio normal.
- Precio oferta.
- Descripción.

Los datos son validados antes de agregar el producto.

También es posible eliminar videojuegos desde la lista de gestión. Los cambios realizados mediante esta sección se administran mediante el estado de React durante la sesión actual.

### Formulario de contacto

El formulario de contacto solicita:

- Nombre.
- Correo electrónico.
- Mensaje.

Se validan los datos antes del envío.

Cuando existen errores se muestran mensajes específicos debajo de cada campo. Cuando la información es válida se muestra un mensaje de confirmación y el formulario se limpia.

### Diseño responsive

GGAMES adapta su interfaz a distintos tamaños de pantalla.

Se trabajaron específicamente los siguientes escenarios:

- Escritorio.
- Tablet.
- Móvil.

La navegación cambia automáticamente según el ancho disponible. En tablet y móvil se utiliza un menú hamburguesa, mientras que las tarjetas y secciones reorganizan su distribución para evitar desbordes.

---

## Componentes React

La aplicación se encuentra dividida en componentes reutilizables:

```text
src/components/
├── Cart.jsx
├── CartItem.jsx
├── CatalogManager.jsx
├── ContactForm.jsx
├── Footer.jsx
├── Header.jsx
├── HeroCarousel.jsx
├── ProductCard.jsx
├── ProductList.jsx
├── SearchBar.jsx
└── WhyGgames.jsx
```

### Header

Contiene:

- Logo GGAMES.
- Navbar.
- Dropdown de categorías.
- Acceso al carrito.
- Acceso al formulario de contacto.
- Buscador.
- Menú hamburguesa responsive.

### HeroCarousel

Muestra las promociones principales mediante un carrusel visual.

### ProductList y ProductCard

`ProductList` recibe los videojuegos y genera dinámicamente las tarjetas mediante `ProductCard`.

Las propiedades se transmiten entre componentes utilizando `props`.

### CatalogManager

Gestiona la creación y eliminación dinámica de videojuegos.

### Cart y CartItem

Administran la presentación del carrito, cantidades, subtotales y eliminación de productos.

### ContactForm

Gestiona los datos y validaciones del formulario de contacto mediante estado local.

---

## React: estado, props y efectos

### useState

Se utiliza para administrar, entre otros:

- Productos.
- Carrito.
- Categoría seleccionada.
- Búsqueda.
- Estado de carga.
- Estado de error.
- Intentos de carga.
- Menú responsive.
- Formularios.
- Validaciones.

### useEffect

Se utiliza principalmente para:

1. Cargar dinámicamente el catálogo desde el archivo JSON.
2. Guardar automáticamente los cambios del carrito en `localStorage`.

### Props

Las propiedades permiten comunicar información y funciones entre los componentes.

Entre otros usos, se emplean para:

- Enviar productos a las tarjetas.
- Informar si un producto está en el carrito.
- Agregar productos.
- Eliminar productos.
- Modificar cantidades.
- Filtrar categorías.
- Administrar la búsqueda.

---

## Renderizado dinámico y condicional

La aplicación utiliza renderizado condicional para mostrar diferentes elementos dependiendo del estado.

Algunos ejemplos son:

- Carga del catálogo.
- Error al obtener productos.
- Botón para reintentar.
- Catálogo vacío.
- Carrito vacío.
- Productos encontrados.
- Producto agregado al carrito.
- Badge de oferta.
- Sugerencias del buscador.
- Errores del formulario.
- Mensaje de envío exitoso.
- Menú responsive abierto o cerrado.

---

## Estructura general del proyecto

```text
GGAMES/
├── capturas/
├── public/
│   ├── data/
│   │   └── productos.json
│   └── img/
│       └── imagen_no_disponible.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Cart.jsx
│   │   ├── CartItem.jsx
│   │   ├── CatalogManager.jsx
│   │   ├── ContactForm.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── HeroCarousel.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductList.jsx
│   │   ├── SearchBar.jsx
│   │   └── WhyGgames.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── package.json
├── README.md
└── vite.config.js
```

---

## Instalación

Para ejecutar el proyecto localmente es necesario tener instalado Node.js.

Clonar el repositorio:

```bash
git clone https://github.com/poblo-13/GGAMES.git
```

Ingresar al proyecto:

```bash
cd GGAMES
```

Instalar dependencias:

```bash
npm install
```

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

Vite mostrará en la terminal la dirección local desde donde puede abrirse la aplicación.

---

## Comandos disponibles

### Ejecutar en modo desarrollo

```bash
npm run dev
```

### Revisar el código con ESLint

```bash
npm run lint
```

### Generar la versión de producción

```bash
npm run build
```

### Publicar mediante GitHub Pages

```bash
npm run deploy
```

---

## Pruebas realizadas

Durante el desarrollo se realizaron pruebas de funcionamiento y diseño responsive.

### Resoluciones revisadas

- Móvil: `390 x 844`.
- Tablet: `768 x 1024`.
- Escritorio: resolución de escritorio mediante navegador.

### Funcionalidades verificadas

- Navegación responsive.
- Menú hamburguesa.
- Dropdown de categorías.
- Buscador.
- Filtros.
- Carga dinámica de productos.
- Manejo de errores.
- Imagen alternativa.
- Agregar al carrito.
- Aumentar y disminuir cantidades.
- Eliminar del carrito.
- Cálculo de subtotales.
- Cálculo del total.
- Persistencia del carrito.
- Agregar videojuegos al catálogo.
- Eliminar videojuegos del catálogo.
- Validación incorrecta del formulario.
- Validación correcta del formulario.

Además, antes del cierre del proyecto se ejecutaron:

```bash
npm run lint
npm run build
```

sin errores de compilación.

---

## Control de versiones

El proyecto utiliza Git y GitHub para registrar el progreso del desarrollo.

Durante la Evaluación Final Transversal se trabajó en una rama específica:

```text
eft-semana9
```

Los commits se realizaron por etapas para reflejar los principales avances del proyecto, incluyendo integración de Bootstrap, gestión dinámica del catálogo y mejoras responsive.

---

## Repositorio

```text
https://github.com/poblo-13/GGAMES
```

---

## GitHub Pages

La aplicación utiliza GitHub Pages para su publicación.

```text
https://poblo-13.github.io/GGAMES/
```

La versión correspondiente a la EFT se publica al finalizar el proceso de desarrollo y validación.

---

## Autor

**Pablo Pilar Rojas**  
Analista Programador  
Duoc UC

---

## Evaluación Final Transversal

Proyecto desarrollado como entrega final de:

**Desarrollo Frontend I - PFY2201**

GGAMES integra HTML5, CSS3, Bootstrap 5, JavaScript y React para construir una aplicación web dinámica, modular y responsive orientada a la venta y administración de videojuegos.
