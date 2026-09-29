function Footer() {
    return (
        <footer id="contacto" className="footer-principal">
            <div className="footer-contenido">
                <div>
                    <h3>GGAMES</h3>

                    <p>
                        Tu tienda de videojuegos.
                    </p>
                </div>

                <div>
                    <h4>Contacto</h4>

                    <a
                        href="mailto:contacto@ggames.cl"
                        className="footer-link"
                    >
                        contacto@ggames.cl
                    </a>

                    <p>Concepción, Chile</p>
                </div>

                <div>
                    <h4>Síguenos</h4>

                    <div className="footer-redes">
                        <a
                            href="https://www.instagram.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Instagram
                        </a>

                        <a
                            href="https://www.facebook.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Facebook
                        </a>

                        <a
                            href="https://x.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            X
                        </a>
                    </div>
                </div>
            </div>

            <p className="footer-copy">
                © 2026 GGAMES
            </p>
        </footer>
    );
}

export default Footer;