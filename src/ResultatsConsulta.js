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

export default function ResultatsConsulta() {
  const [diagnostic, setDiagnostic] = useState(""); // Per al diagnòstic retornat per l'API
  const [emergency, setEmergency] = useState(false); // Per al booleà retornat per l'API
  const [error, setError] = useState("");
  const token = getUsernameFromCookie(); // Obtenim el username de les cookies

  useEffect(() => {
    const fetchData = async () => {
        console.log('TOKEN: ' + token);
      try {

        const response = await fetch(`http://localhost:1000/qresp_api/diagnostic`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: token }),
        });

        if (response.ok) {
          const data = await response.json();
          setDiagnostic(data.diagnostic); // Assignem el valor del diagnòstic
          setEmergency(data.emergency); // Assignem el valor del booleà emergency
        } else {
          const errorData = await response.json();
          setError(`Error: ${errorData.message}`);
        }
      } catch (err) {
        setError("Error al connectar amb el servidor.");
        console.error(err);
      }
    };

    fetchData();
  }, [token]); // Es torna a executar si el token canvia

  return (
    <div className="resultats-container">
      <h1>Resultats de la Consulta</h1>
      {error && <p className="error-message">{error}</p>}
      {diagnostic ? (
        <div className="result-box">
          <p>{diagnostic}</p> {/* Mostrem el diagnòstic retornat */}
        </div>
      ) : (
        <p>Carregant resultats...</p>
      )}
      <button
        className="QR-btn"
        onClick={() => {
          window.location.href = emergency ? "/MetgeConsulta" : "/Menu";
        }}
      >
        {emergency ? "Consulta amb el metge" : "Torna al menú"}
      </button>
    </div>
  );
}
