import React, { useState } from "react";
import "./styles.css";

export default function IntroDades() {
  const [formData, setFormData] = useState({
    DNI: "",
    Nom: "",
    Cognom: "",
    DataNaixement: "",
    Telefon: "",
    Sexe: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(""); // Netejar errors en modificar qualsevol camp
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validacions bàsiques
    if (!formData.DNI || !formData.Nom || !formData.Cognom || !formData.DataNaixement || !formData.Telefon || !formData.Sexe) {
      setError("Tots els camps són obligatoris.");
      return;
    }

    if (!/^\d{8}[A-Za-z]$/.test(formData.DNI)) {
      setError("El DNI no és vàlid.");
      return;
    }

    if (isNaN(formData.Telefon) || formData.Telefon.length < 9) {
      setError("El telèfon ha de tenir com a mínim 9 dígits numèrics.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/introDades", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Dades enviades correctament!");
        setFormData({
          DNI: "",
          Nom: "",
          Cognom: "",
          DataNaixement: "",
          Telefon: "",
          Sexe: "",
        });
      } else {
        const errorData = await response.json();
        setError(`Error: ${errorData.message}`);
      }
    } catch (err) {
      setError("Error al connectar amb el servidor.");
      console.error(err);
    }
  };

  return (
    <div className="App">
      <h1>Introdueix les teves dades personals</h1>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group-reg">
          <label htmlFor="DNI">DNI:</label>
          <input
            type="text"
            id="DNI"
            name="DNI"
            value={formData.DNI}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group-reg">
          <label htmlFor="Nom">Nom:</label>
          <input
            type="text"
            id="Nom"
            name="Nom"
            value={formData.Nom}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group-reg">
          <label htmlFor="Cognom">Cognom:</label>
          <input
            type="text"
            id="Cognom"
            name="Cognom"
            value={formData.Cognom}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group-reg">
          <label htmlFor="DataNaixement">Data de Naixement:</label>
          <input
            type="date"
            id="DataNaixement"
            name="DataNaixement"
            value={formData.DataNaixement}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group-reg">
          <label htmlFor="Telefon">Telèfon:</label>
          <input
            type="text"
            id="Telefon"
            name="Telefon"
            value={formData.Telefon}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group-reg">
          <label htmlFor="Sexe">Sexe:</label>
          <select
            id="Sexe"
            name="Sexe"
            value={formData.Sexe}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona...</option>
            <option value="Home">Home</option>
            <option value="Dona">Dona</option>
            <option value="Altres">Altres</option>
          </select>
        </div>
        <button type="submit" className="btn-reg">Enviar</button>
      </form>

      {error && <p className="error">{error}</p>}
      {message && <p className="success-message">{message}</p>}
    </div>
  );
}
