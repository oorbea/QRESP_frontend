import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

export default function History() {
  const [formData, setFormData] = useState({
    mpid: "",
    ttm_base: "",
    immuno: false,
    comorbi: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Hook para navegar

  // Función para obtener el username de la cookie
  function getUsernameFromCookie() {
    const name = "username=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  // Obtener el username de la cookie
  const username = getUsernameFromCookie();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "immuno") {
      setFormData({ ...formData, [name]: e.target.checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setError(""); // Limpiar errores
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones básicas
    const { mpid, ttm_base, immuno, comorbi } = formData;
    if (!mpid || !ttm_base || !comorbi) {
      setError("Tots els camps són obligatoris.");
      return;
    }

    try {
      const response = await fetch("http://localhost:1000/qresp_api/history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          mpid: mpid,
          ttm_base: ttm_base,
          immuno: immuno,
          comorbi: comorbi,
        }),
      });

      if (response.ok) {
        setMessage("Dades enviades correctament!");
        navigate("../QR"); // Redirigir a la pàgina Consulta després de l'èxit
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
    <div className="FormHistory">
      <h1>Introdueix les teves dades mèdiquess</h1>
      <form onSubmit={handleSubmit} className="history-form">
        <div className="form-group-history">
          <label htmlFor="mpid">MPID:</label>
          <input
            type="text"
            id="mpid"
            name="mpid"
            value={formData.mpid}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group-history">
          <label htmlFor="ttm_base">TTM Base:</label>
          <input
            type="text"
            id="ttm_base"
            name="ttm_base"
            value={formData.ttm_base}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group-history">
          <label htmlFor="comorbi">Comorbiditat:</label>
          <input
            type="text"
            id="comorbi"
            name="comorbi"
            value={formData.comorbi}
            onChange={handleChange}
            required
          />
        </div>
          <div className="form-group-history">
            <label htmlFor="immuno">Immunosupressió:</label>
            <input
              type="checkbox"
              id="immuno"
              name="immuno"
              checked={formData.immuno}
              onChange={handleChange}
            />
        </div>

        {/* Mostrar error si hi ha */}
        {error && <p className="error">{error}</p>}

        <button type="submit" className="QR-btn">Enviar</button>
      </form>

      {/* Mostrar missatge de resposta */}
      {message && <p className="message">{message}</p>}
    </div>
  );
}
