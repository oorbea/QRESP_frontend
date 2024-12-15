import React, { useState } from "react";
import "./styles.css";

// Funció per obtenir el valor d'una cookie pel seu nom
function getUsernameFromCookie() {
  const name = "username=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export default function MetgeConsulta() {
  // Obtenir l'usuari des de la cookie
  const token = getUsernameFromCookie();

  // Estat per emmagatzemar les dades del formulari
  const [formData, setFormData] = useState({
    username: token,
    micro: "",
    antigenuria: "",
    hemo: "",
    pcr: "",
    curr_date: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Gestió del canvi en els camps del formulari
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(""); // Netejar missatges d'error en modificar els valors
  };

  // Enviar les dades del formulari a l'API
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:1000/qresp_api/tests2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Prova mèdica creada correctament.");

        // Redirigir després de la creació amb èxit
        window.location.href = "/PneumoniaFinal";
      } else {
        const errorData = await response.json();
        setError(`Error: ${errorData.message}`);
      }
    } catch (err) {
      setError("Error en connectar amb el servidor.");
      console.error(err);
    }
  };

  return (
    <div className="crear-pruebas">
      <h1>Crear proves mèdiques</h1>
      <form onSubmit={handleSubmit} className="patient-details">
        <div>
          <label htmlFor="micro">Micro:</label>
          <input
            type="text"
            id="micro"
            name="micro"
            value={formData.micro}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="antigenuria">Antigenuria:</label>
          <input
            type="text"
            id="antigenuria"
            name="antigenuria"
            value={formData.antigenuria}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="hemo">Hemo:</label>
          <input
            type="text"
            id="hemo"
            name="hemo"
            value={formData.hemo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="pcr">PCR:</label>
          <input
            type="text"
            id="pcr"
            name="pcr"
            value={formData.pcr}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="curr_date">Data:</label>
          <input
            type="date"
            id="curr_date"
            name="curr_date"
            value={formData.curr_date}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="QR-btn">
          Guardar dades i continuar
        </button>
      </form>

      {error && <p className="error">{error}</p>}
      {message && <p className="success-message">{message}</p>}
    </div>
  );
}
