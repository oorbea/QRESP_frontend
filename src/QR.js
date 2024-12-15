import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

// Función para obtener el nombre de usuario desde las cookies
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

export default function QR() {
  const [qrImage, setQrImage] = useState(null); // Estado para la imagen del QR
  const token = getUsernameFromCookie(); // Obtener el nombre de usuario desde la cookie

  // Usamos useEffect para cargar la imagen del QR cuando el token cambia
  useEffect(() => {
    if (token) {
      try {
        // Usamos require para cargar dinámicamente la imagen según el token
        const image = require(`./qr/${token}.png`); // Ajusta la extensión según el tipo de archivo
        setQrImage(image);
      } catch (err) {
        console.error("Error al cargar la imagen QR:", err);
        setQrImage(null); // Si hay un error, no mostramos la imagen
      }
    }
  }, [token]); // Se ejecuta cuando el token cambia

  return (
    <div className="qr-container">
      <h1>Accés ràpid amb QR</h1>
      {qrImage ? (
        <div>
          <img src={qrImage} alt="Código QR" className="qr-image" />
          <p>Escaneja el codi QR amb el teu dispositiu per a accedir.</p>
          {/* Botón para descargar el QR */}
          <a href={qrImage} download={`${token}-qr.png`} className="QR-btn">
            Descàrrega QR
          </a>
        </div>
      ) : (
        <p>Carregant QR...</p>
      )}
      <button
        className="QR-btn"
        onClick={() => (window.location.href = "/Menu")}
      >
        Anar al menú principal
      </button>
    </div>
  );
}
