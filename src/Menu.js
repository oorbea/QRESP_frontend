import React, { useState } from "react";
import "./styles.css"; // Importar estilos

// Función para obtener el username de las cookies
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

export default function Menu() {
  const username = getUsernameFromCookie(); // Obtén el username, si es necesario

  return (
    <div className="menu-container">
      <h1>Benvingut{username ? `, ${username}` : ""}</h1>
      <div className="menu-buttons">
        {/* Botón para redirigir a Consulta.js */}
        <button
          className="button-pass"
          onClick={() => (window.location.href = "/Consulta")}
        >
          Consulta
        </button>

        {/* Botón para redirigir a DatosUser.js */}
        <button
          className="QR-btn"
          onClick={() => (window.location.href = "/DatosUser")}
        >
          Dades de l'Usuari
        </button>

        {/* Botón para redirigir a CanviContrasenya.js */}
        <button
          className="QR-btn"
          onClick={() => (window.location.href = "/CanviContrasenya")}
        >
          Canviar Contrasenya
        </button>

        {/* Botón para redirigir a QR.js */}
        <button
          className="QR-btn"
          onClick={() => (window.location.href = "/QR")}
        >
          Veure QR
        </button>

        {/* Botón para redirigir a EditarUser.js */}
        <button
          className="QR-btn"
          onClick={() => (window.location.href = "/EditUser")}
        >
          Editar Usuari
        </button>

        {/* Botón para LogOut */}
        <button
          className="QR-btn"
          onClick={() => (window.location.href = "/Logout")}
        >
          Logout
        </button>

        {/* Botón para redirigir a login (localhost:3000) */}
        <button
          className="menu-btn delete-btn"
          onClick={() => (window.location.href = "/DeleteUser")}
        >
          Eliminar Usuari
        </button>
      </div>
    </div>
  );
}
