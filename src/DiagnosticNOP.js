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

// Funció per netejar el text d'asteriscos
function cleanText(text) {
  return text.replace(/\*/g, ""); // Elimina tots els asteriscos
}

export default function DiagnosticNOP() {
  const [decision, setDiagnostic] = useState(""); // Per al diagnòstic retornat per l'API
  const [error, setError] = useState("");
  const token = getUsernameFromCookie(); // Obtenim el username de les cookies

  useEffect(() => {
    const fetchData = async () => {
      const valoration = "no_pneumonia"; // Assignem el valor de la valoration per aquesta pàgina
      try {
        const response = await fetch(`http://localhost:1000/qresp_api/final_treatment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: token, valoration }),
        });

        if (response.ok) {
          const data = await response.json();
          // Netejar el text de diagnòstic d'asteriscos abans d'assignar-lo
          setDiagnostic(cleanText(data.decision));
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
      <h1>Resultats de la Consulta Final</h1>
      {error && <p className="error-message">{error}</p>}
      {decision ? (
        <div className="result-box">
          <p>{decision}</p> {/* Mostrem el diagnòstic retornat */}
        </div>
      ) : (
        <p>Carregant resultats...</p>
      )}
      <button
        className="QR-btn"
        onClick={() => {
          window.location.href = "/Menu";
        }}
      >
        Torna al menú
      </button>
    </div>
  );
}
