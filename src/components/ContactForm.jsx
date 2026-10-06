import { useState } from "react";

function ContactForm() {
    const [formulario, setFormulario] = useState({
        nombre: "",
        email: "",
        mensaje: ""
    });

    const [errores, setErrores] = useState({});
    const [enviado, setEnviado] = useState(false);

    function validarFormulario() {
        const nuevosErrores = {};

        if (formulario.nombre.trim().length < 2) {
            nuevosErrores.nombre =
                "Ingresa un nombre válido de al menos 2 caracteres.";
        }

        const expresionEmail =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!expresionEmail.test(formulario.email.trim())) {
            nuevosErrores.email =
                "Ingresa un correo electrónico válido.";
        }

        if (formulario.mensaje.trim().length < 10) {
            nuevosErrores.mensaje =
                "El mensaje debe contener al menos 10 caracteres.";
        }

        return nuevosErrores;
    }

    function manejarCambio(evento) {
        const { name, value } = evento.target;

        setFormulario((formularioActual) => ({
            ...formularioActual,
            [name]: value
        }));

        setErrores((erroresActuales) => ({
            ...erroresActuales,
            [name]: ""
        }));

        setEnviado(false);
    }

    function manejarEnvio(evento) {
        evento.preventDefault();

        const nuevosErrores = validarFormulario();

        if (Object.keys(nuevosErrores).length > 0) {
            setErrores(nuevosErrores);
            setEnviado(false);
            return;
        }

        setErrores({});
        setEnviado(true);

        setFormulario({
            nombre: "",
            email: "",
            mensaje: ""
        });
    }

    return (
        <section
            id="contacto"
            className="contacto-section container py-5"
        >
            <div className="row justify-content-center">
                <div className="col-12 col-lg-8">
                    <div className="contacto-card card">
                        <div className="card-body p-4 p-md-5">

                            <h2 className="contacto-titulo text-center mb-3">
                                Contáctanos
                            </h2>

                            <p className="contacto-descripcion text-center mb-4">
                                ¿Tienes alguna consulta sobre nuestros videojuegos?
                                Escríbenos y nos pondremos en contacto contigo.
                            </p>

                            {enviado && (
                                <div
                                    className="alert alert-success"
                                    role="alert"
                                >
                                    ✓ Tu mensaje fue validado correctamente.
                                    Gracias por contactar a GGAMES.
                                </div>
                            )}

                            <form
                                onSubmit={manejarEnvio}
                                noValidate
                            >
                                <div className="mb-3">
                                    <label
                                        htmlFor="nombre"
                                        className="form-label"
                                    >
                                        Nombre
                                    </label>

                                    <input
                                        id="nombre"
                                        name="nombre"
                                        type="text"
                                        className={`form-control ${errores.nombre ? "is-invalid" : ""
                                            }`}
                                        placeholder="Ingresa tu nombre"
                                        value={formulario.nombre}
                                        onChange={manejarCambio}
                                    />

                                    {errores.nombre && (
                                        <div className="invalid-feedback">
                                            {errores.nombre}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label
                                        htmlFor="email"
                                        className="form-label"
                                    >
                                        Email
                                    </label>

                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        className={`form-control ${errores.email ? "is-invalid" : ""
                                            }`}
                                        placeholder="nombre@correo.cl"
                                        value={formulario.email}
                                        onChange={manejarCambio}
                                    />

                                    {errores.email && (
                                        <div className="invalid-feedback">
                                            {errores.email}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="mensaje"
                                        className="form-label"
                                    >
                                        Mensaje
                                    </label>

                                    <textarea
                                        id="mensaje"
                                        name="mensaje"
                                        rows="5"
                                        className={`form-control ${errores.mensaje ? "is-invalid" : ""
                                            }`}
                                        placeholder="Escribe tu mensaje..."
                                        value={formulario.mensaje}
                                        onChange={manejarCambio}
                                    />

                                    {errores.mensaje && (
                                        <div className="invalid-feedback">
                                            {errores.mensaje}
                                        </div>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-success w-100"
                                >
                                    Enviar mensaje
                                </button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ContactForm;