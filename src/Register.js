import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar el hook useNavigate
import "./styles.css";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    re_password: "", // Afegeixo el camp re_password a l'estat
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Crear una instància del hook useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(""); // Netejar errors en modificar qualsevol camp
  };

  const validatePassword = () => {
    const { password, re_password } = formData;

    // Comprovar si les contrasenyes coincideixen
    if (password !== re_password) {
      setError("Les contrasenyes no coincideixen.");
      return false;
    }

    // Comprovar si la contrasenya compleix els requisits
    const passwordRegex = /^(?=.*[A-Z]).{8,}$/; // Majúscula i mínim 8 caràcters
    if (!passwordRegex.test(password)) {
      setError(
        "La contrasenya ha de tenir almenys 8 caràcters i incloure una lletra majúscula."
      );
      return false;
    }

    // Comprovar la longitud màxima de la contrasenya
    if (password.length > 100) {
      setError("La contrasenya no pot ser tant gran.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar les contrasenyes
    if (!validatePassword()) {
      return;
    }

    try {
      const response = await fetch("http://localhost:1000/qresp_api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Función para guardar el username en la cookie
      function setUsernameCookie(username) {
        document.cookie = `username=${username}; path=/; max-age=3600`; // max-age=3600 es 1 hora
      }

      // Guardamos el username en la cookie
      setUsernameCookie(formData.username);

      if (response.ok) {
        setMessage("Usuari registrat amb èxit.");
        navigate("../IntroDades"); // Redirigir a la pàgina IntroDades després de l'èxit
      } else {
        const errorData = await response.json();
        setError(`Error: ${errorData.message}`);
      }
    } catch (err) {
      setMessage("Error al connectar amb el servidor.");
      console.error(err);
    }
  };

  return (
    <div className="FormReg">
      <h1>Registre d'usuari</h1>
      <form onSubmit={handleSubmit} className="register-form-reg">
        <div className="form-group-reg">
          <label htmlFor="username">Usuari:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group-reg">
          <label htmlFor="password">Contrasenya:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group-reg">
          <label htmlFor="re_password">Repeteix contrasenya:</label>
          <input
            type="password"
            id="re_password"
            name="re_password"
            value={formData.re_password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Mostra error si hi ha */}
        {error && <p className="error">{error}</p>}

        <button type="submit" className="btn-reg">
          Registrar
        </button>
      </form>

      {/* Mostra missatge de resposta */}
      {message && <p className="message">{message}</p>}
    </div>
  );
}
