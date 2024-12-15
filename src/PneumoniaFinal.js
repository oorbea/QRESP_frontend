import React from "react";
import "./styles.css";

export default function BotonsDireccions() {
  // Funcions per redirigir a les direccions
  const handleGoToPage1 = () => {
    window.location.href = "/DiagnosticSI"; // Substitueix "/direccio1" per l'adreça real
  };

  const handleGoToPage2 = () => {
    window.location.href = "/DiagnosticNOP"; // Substitueix "/direccio2" per l'adreça real
  };

  const handleGoToPage3 = () => {
    window.location.href = "/DiagnosticEMPTY"; // Substitueix "/direccio2" per l'adreça real
  };

  return (
    <div className="patient-details">
      <h1>Creus que té pneumonia?</h1>
      <div className="botons-grans">
        <button className="QR-btn" onClick={handleGoToPage2}>
          No en té
        </button>
        <button className="QR-btn" onClick={handleGoToPage1}>
          Sí en té
        </button>
        <button className="QR-btn" onClick={handleGoToPage2}>
          No ho sé
        </button>
      </div>
    </div>
  );
}
