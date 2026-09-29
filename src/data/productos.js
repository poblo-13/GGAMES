const baseUrl = import.meta.env.BASE_URL;

const productos = [
    {
        id: 1,
        nombre: "Grand Theft Auto VI",
        precioNormal: 74990,
        precioOferta: 64990,
        descripcion:
            "Explora Leonida y Vice City junto a Lucía y Jason en una historia de crimen y acción.",
        imagen: `${baseUrl}img/gtaa6.avif`,
        categoria: "Acción",
        alias: [
            "gta",
            "gta vi",
            "gta 6",
            "grand theft auto",
            "grand theft auto vi",
            "grand theft auto 6",
            "vice city",
            "mundo abierto"
        ]
    },
    {
        id: 2,
        nombre: "EA Sports FC 27",
        precioNormal: 62990,
        precioOferta: 54990,
        descripcion:
            "Vive una nueva temporada de fútbol con clubes, jugadores y competiciones actualizadas.",
        imagen: `${baseUrl}img/fc27.avif`,
        categoria: "Deportes",
        alias: [
            "fc",
            "fc 27",
            "fc27",
            "ea sports",
            "futbol",
            "fútbol",
            "deportes",
            "fifa",
            "fifa 27"
        ]
    },
    {
        id: 3,
        nombre: "LEGO Batman",
        precioNormal: 56990,
        precioOferta: 49990,
        descripcion:
            "Acompaña a Batman en una aventura llena de acción, humor y personajes del universo DC.",
        imagen: `${baseUrl}img/legobatman.jpeg`,
        categoria: "Acción",
        alias: [
            "batman",
            "lego",
            "lego batman",
            "dc",
            "caballero oscuro",
            "superheroe",
            "superhéroe"
        ]
    },
    {
        id: 4,
        nombre: "Stray",
        precioNormal: 15990,
        precioOferta: 12990,
        descripcion:
            "Explora una misteriosa ciudad futurista desde la perspectiva de un gato perdido.",
        imagen: `${baseUrl}img/stray.avif`,
        categoria: "Aventura",
        alias: [
            "stray",
            "gato",
            "gatito",
            "juego de gatos",
            "b12",
            "b-12",
            "ciberciudad"
        ]
    },
    {
        id: 5,
        nombre: "Hogwarts Legacy",
        precioNormal: 39990,
        precioOferta: 29990,
        descripcion:
            "Descubre Hogwarts y vive tu propia aventura dentro del mundo mágico.",
        imagen: `${baseUrl}img/hogwarts_legacy.jpg`,
        categoria: "Aventura",
        alias: [
            "hogwarts",
            "hogwarts legacy",
            "harry potter",
            "magia",
            "mago",
            "hechizos"
        ]
    },
    {
        id: 6,
        nombre: "God of War III Remastered",
        precioNormal: 19990,
        precioOferta: 15990,
        descripcion:
            "Acompaña a Kratos en su enfrentamiento contra los dioses del Olimpo.",
        imagen: `${baseUrl}img/god_of_war_3.jpg`,
        categoria: "Acción",
        alias: [
            "god of war",
            "god of war 3",
            "god of war iii",
            "gow",
            "gow 3",
            "kratos",
            "grecia",
            "mitologia",
            "mitología griega"
        ]
    }
];

export default productos;