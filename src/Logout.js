import React, { useEffect } from "react";

export default function Logout() {
  useEffect(() => {
    // Función para borrar la cookie
    const clearCookie = () => {
      document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/"; // Borra la cookie 'username'
    };

    // Llamamos a la función para borrar la cookie
    clearCookie();

    // Redirigimos a la página principal
    window.location.href = "http://localhost:3000";
  }, []); // Este useEffect se ejecuta una vez cuando el componente se monta

  return <div>Sortint...</div>; // Mensaje mientras se hace logout
}
