import { useState } from "react";

import ofertasPrimavera from "../assets/ofertas_primavera.png";
import promoGta6 from "../assets/promo_gta6.png";
import nuevosJuegos from "../assets/nuevos_juegos.png";

const imagenes = [
    {
        id: 1,
        imagen: ofertasPrimavera,
        alt: "Ofertas de primavera GGAMES"
    },
    {
        id: 2,
        imagen: promoGta6,
        alt: "Promoción Grand Theft Auto VI"
    },
    {
        id: 3,
        imagen: nuevosJuegos,
        alt: "Nuevos juegos GGAMES"
    }
];

function HeroCarousel() {
    const [indiceActual, setIndiceActual] = useState(0);

    function anterior() {
        setIndiceActual((indice) =>
            indice === 0 ? imagenes.length - 1 : indice - 1
        );
    }

    function siguiente() {
        setIndiceActual((indice) =>
            indice === imagenes.length - 1 ? 0 : indice + 1
        );
    }

    return (
        <section className="hero-carousel" id="inicio">
            <img
                src={imagenes[indiceActual].imagen}
                alt={imagenes[indiceActual].alt}
                className="hero-imagen"
            />

            <button
                className="carousel-btn carousel-btn-left"
                onClick={anterior}
                aria-label="Imagen anterior"
            >
                ❮
            </button>

            <button
                className="carousel-btn carousel-btn-right"
                onClick={siguiente}
                aria-label="Imagen siguiente"
            >
                ❯
            </button>

            <div className="carousel-indicadores">
                {imagenes.map((imagen, index) => (
                    <button
                        key={imagen.id}
                        className={index === indiceActual ? "activo" : ""}
                        onClick={() => setIndiceActual(index)}
                        aria-label={`Mostrar imagen ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}

export default HeroCarousel;