import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

// Función para obtener el username/token de las cookies
function getUsernameFromCookie() {
  const name = "username=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim(); // Usa `trim()` para eliminar espacios
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export default function IntroDades() {
  const token = getUsernameFromCookie(); // Obtén el token desde las cookies
  const navigate = useNavigate(); // Hook para navegar
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:1000/qresp_api/user/${token}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setMessage("Usuari borrat correctament!");
        setTimeout(() => {
          navigate("/"); // Redirigir al inicio tras un pequeño retraso
        }, 2000);
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
    <div className="FromHistory">
      <h1>Segur que vols borrar l'usuari?</h1>
      <form className="back-form">
        <button type="button" onClick={() => navigate("/Menu")}>
          Tornar al Menu
        </button>
      </form>
      <form onSubmit={handleSubmit} className="delete-form">
        <button type="submit" className="btn-delete">Confirmar esborrat</button>
      </form>
      {error && <p className="error">{error}</p>}
      {message && <p className="success-message">{message}</p>}
    </div>
  );
}
