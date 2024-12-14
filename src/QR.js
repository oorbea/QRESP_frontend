import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function QR() {
  const [qrUrl, setQrUrl] = useState(""); // Estado para almacenar la URL del QR
  const [error, setError] = useState("");

  // Obtener la URL de la API
  useEffect(() => {
    const fetchQrUrl = async () => {
      try {
        const response = await fetch("http://localhost:1000/qresp_api/qr/"); // Cambia esta URL según tu API
        if (response.ok) {
          const data = await response.json();
          setQrUrl(data.url); // Supongamos que la API devuelve un objeto con { url: "URL_DE_LOGIN" }
        } else {
          setError("Error al obtener el enlace del QR.");
        }
      } catch (err) {
        setError("Error al conectar con el servidor.");
        console.error(err);
      }
    };
  }, []);

  return (
    <div className="qr-container">
      <h1>Acceso rápido con QR</h1>
      {qrUrl ? (
        <div>
          <QRCode value={qrUrl} size={256} bgColor="#ffffff" fgColor="#000000" />
          <p>Escanea el código QR con tu dispositivo para acceder.</p>
        </div>
      ) : (
        <p>{error || "Cargando QR..."}</p>
      )}
      <Link to="../" className="btn-link">
        Ir a la página de login
      </Link>
    </div>
  );
}
