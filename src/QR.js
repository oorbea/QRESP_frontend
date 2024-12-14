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
      <h1>Acceso rápido con QR</h1>
      {qrImage ? (
        <div>
          <img src={qrImage} alt="Código QR" className="qr-image" />
          <p>Escanea el código QR con tu dispositivo para acceder.</p>
        </div>
      ) : (
        <p>Cargando QR...</p>
      )}
      <Link to="../" className="btn-link">
        Ir a la página de login
      </Link>
    </div>
  );
}
