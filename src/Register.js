import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar el hook useNavigate
import "./styles.css";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    re_password: "",
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

    // Comprovar si la password compleix els requisits
    const passwordRegex = /^(?=.*[A-Z]).{8,}$/; // Majúscula i mínim 8 caràcters
    if (!passwordRegex.test(password)) {
      setError(
        "La contrasenya ha de tenir almenys 8 caràcters i incloure una lletra majúscula."
      );
      return false;
    }
    if (password.length > 100) {
        setError(
          "La contrasenya no pot ser tant gran."
        );
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
      const response = await fetch("http://localhost:3000/qresp_api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("username registrat amb èxit.");
        navigate("/intro-dades"); // Redirigir a la pàgina IntroDades després de l'èxit
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
    <div className="App">
      <h1>Registre d'username</h1>
      <form onSubmit={handleSubmit} className="register-form-reg">
        <div className="form-group-reg">
          <label htmlFor="username">usuari:</label>
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
          <label htmlFor="password">contrasenya:</label>
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
