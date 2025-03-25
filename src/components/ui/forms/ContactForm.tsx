import React, { useState } from "react";
import SecondaryButton from "../buttons/SecondaryButton";

function ContactForm() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [exito, setExito] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log("oal");
    
    if (nombre && email && mensaje) {
      setExito(true);
      setError(false);
      // Aquí agregarías la lógica para enviar el formulario (API, backend, etc.)
    } else {
      setError(true);
      setExito(false);
    }
  };

  return (
    <div className="flex justify-center items-center px-10 py-14 w-full md:w-2/3">
      <form
        onSubmit={handleSubmit}
        className="p-12 md:px-32 rounded-lg shadow-lg w-full"
      >
        <h2 className="text-5xl font-bold mb-4 text-center">Contacto</h2>

        {exito && (
          <div className="bg-green-200 text-green-700 p-2 mb-4 rounded">
            ¡Mensaje enviado correctamente!
          </div>
        )}

        {error && (
          <div className="bg-red-200 text-red-700 p-2 mb-4 rounded">
            Todos los campos son obligatorios.
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full px-4 py-2 mt-1 border-1 border-cyan-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 transition duration-300"
            placeholder="Tu nombre"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 transition duration-300">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 mt-1 border-1 border-cyan-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 transition duration-300"
            placeholder="Tu correo"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 transition duration-300">
            Mensaje
          </label>
          <textarea
            id="mensaje"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            className="w-full px-4 py-2 mt-1 border-1 border-cyan-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 transition duration-300"
            placeholder="Escribe tu mensaje"
            rows={4}
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4"
>
          <SecondaryButton text="Enviar" color="bg-sky-400" ></SecondaryButton>
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
