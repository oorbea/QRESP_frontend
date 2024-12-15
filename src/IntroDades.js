import React, { useState } from "react";
import "./styles.css";

function getUsernameFromCookie() {
  const name = "username=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export default function IntroDades() {
  // Llamar a esta función para obtener el username guardado en la cookie
  const token = getUsernameFromCookie();

  const [formData, setFormData] = useState({
    username: token,
    dni: "",
    name: "",
    last_name: "",
    birth: "",
    tel: "",
    gender: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
    setError(""); // Limpiar errores al modificar cualquier campo
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones básicas
    const { dni, name, last_name, birth, tel, gender, username } = formData;
    if (!dni || !name || !last_name || !birth || !tel || !gender || !username) {
      setError("Tots els camps són obligatoris.");
      return;
    }

    if (!/^\d{8}[A-Za-z]$/.test(dni)) {
      setError("El DNI no és vàlid.");
      return;
    }

    const telNumber = parseInt(tel, 10);

    if (isNaN(telNumber) || telNumber.toString().length < 9) {
      setError("El telèfon ha de tenir com a mínim 9 dígits numèrics.");
      return;
    }

    // La fecha ya está en formato aaaa-mm-dd por lo que no hace falta ningún cambio
    const formattedBirth = birth;

    try {
      // Función para guardar el username en la cookie    
      const response = await fetch("http://localhost:1000/qresp_api/patient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          birth: formattedBirth,
          tel: telNumber, // Enviar el tel como número
          username: username, // Asegurarse de que el username se pase
        }),
      });

      if (response.ok) {
        setMessage("Dades enviades correctament!");
        window.location.href = "../History"; // Redirigir a la página de historial
        setFormData({
          dni: "",
          name: "",
          last_name: "",
          birth: "",
          tel: "",
          gender: "",
          username: "", // Limpiar el username también
        });
      } else {
        const errorData = await response.json();
        setError(`Error: ${errorData.message}`);
      }
    } catch (err) {
      setError("Error al connectar amb el servidor.");
      console.error(err);
    }
  };

  return (
    <div className="FromHistory">
      <h1>Introdueix les teves dades personals</h1>
      <form onSubmit={handleSubmit} className="history-form">
        <div className="form-group-reg">
          <label htmlFor="dni">DNI:</label>
          <input
            type="text"
            id="dni"
            name="dni"
            value={formData.dni}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group-reg">
          <label htmlFor="name">Nom:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group-reg">
          <label htmlFor="last_name">Cognom:</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group-reg">
          <label htmlFor="birth">Data de Naixement:</label>
          <input
            type="date"
            id="birth"
            name="birth"
            value={formData.birth}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group-reg">
          <label htmlFor="tel">Telèfon:</label>
          <input
            type="text"
            id="tel"
            name="tel"
            value={formData.tel}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group-reg">
          <label htmlFor="gender">Sexe:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona...</option>
            <option value="Home">Home</option>
            <option value="Dona">Dona</option>
            <option value="Altres">Altres</option>
          </select>
        </div>
        <button type="submit" className="QR-btn">Enviar</button>
      </form>

      {error && <p className="error">{error}</p>}
      {message && <p className="success-message">{message}</p>}
    </div>
  );
}
