import React, { useState, useEffect } from "react";
import "./styles.css";

// Funció per obtenir el username de les cookies
function getUsernameFromCookie() {
  const name = "username=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export default function DetallesPaciente() {
  const [patientData, setPatientData] = useState(null); // Per emmagatzemar la informació del pacient
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // Afegim estat per controlar el carregament
  const token = getUsernameFromCookie(); // Obtenim el username de les cookies

  useEffect(() => {
    const fetchPatientData = async () => {
      setLoading(true); // Iniciem el carregament
      try {
        const response = await fetch(`http://localhost:1000/qresp_api/patient/${token}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          // Comprovar si la resposta no és OK (404 o altres errors)
          const errorData = await response.text(); // Obtenim la resposta com a text
          if (response.status === 404) {
            setError(`No s'ha trobat el pacient amb el username: ${token}`);
          } else {
            setError(`Error: ${errorData}`);
          }
          setLoading(false);
          return;
        }

        // Intentar parsejar la resposta com JSON
        const data = await response.json();
        setPatientData(data); // Assignem la informació del pacient
      } catch (err) {
        setError("Error al connectar amb el servidor.");
        console.error("Error de xarxa:", err); // Depuració: mostra l'error a la consola
      } finally {
        setLoading(false); // Finalitzem el carregament
      }
    };

    if (token) {
      fetchPatientData();
    } else {
      setError("No s'ha trobat el username a les cookies.");
      setLoading(false); // Finalitzem el carregament en cas que no es trobi el token
    }
  }, [token]); // Es torna a executar si el token canvia

  if (loading) {
    return <p>Carregant detalls del pacient...</p>; // Mostra el missatge mentre carrega
  }

  return (
    <div className="patient-container">
      <h1>Detalls del Pacient</h1>
      {error && <p className="error-message">{error}</p>}
      {patientData ? (
        <div className="patient-details">
          <div><strong>Username:</strong> {patientData.username}</div>
          <div><strong>DNI:</strong> {patientData.dni}</div>
          <div><strong>Nom:</strong> {patientData.name}</div>
          <div><strong>Cognom:</strong> {patientData.last_name}</div>
          <div><strong>Data de naixement:</strong> {new Date(patientData.birth).toLocaleDateString()}</div>
          <div><strong>Telèfon:</strong> {patientData.tel}</div>
          <div><strong>Gènere:</strong> {patientData.gender}</div>
          <div><strong>Edat:</strong> {patientData.age}</div>
          {/* Botón para redirigir a DatosUser.js */}
        <button
          className="QR-btn"
          onClick={() => (window.location.href = "/Menu")}
        >
          Tornar al menu
        </button>
        </div>
      ) : (
        <p>No s'han trobat dades per al pacient.</p>
      )}
    </div>
  );
}
