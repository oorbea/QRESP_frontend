import React from "react";
import "./styles.css";

export default function BotonsDireccions() {
  // Funcions per redirigir a les direccions
  const handleGoToPage1 = () => {
    window.location.href = "/direccio1"; // Substitueix "/direccio1" per l'adreça real
  };

  const handleGoToPage2 = () => {
    window.location.href = "/DiagnosticNOP"; // Substitueix "/direccio2" per l'adreça real
  };

  return (
    <div className="patient-details">
      <h1>Creus que pot tenir pneumonia?</h1>
      <div className="botons-grans">
        <button className="QR-btn" onClick={handleGoToPage1}>
          Sí, pot ser en té
        </button>
        <button className="QR-btn" onClick={handleGoToPage2}>
          No, no crec que en tingui
        </button>
      </div>
    </div>
  );
}
