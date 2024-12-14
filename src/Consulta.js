import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

// Función para obtener el valor de una cookie por nombre
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

export default function Consulta() {
  // Obtener el username de la cookie
  const token = getUsernameFromCookie();

  // Estado del formulario para almacenar los síntomas
  const [formData, setFormData] = useState({
    username: token,
    suffocate: false,
    cough: false,
    mucus: false,
    congestion: false,
    throat: false,
    fever: false,
    chest_pain: false,
    whistle: false,
    malaise: false,
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
    setError(""); // Limpiar el mensaje de error cuando se cambian los valores
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:1000/qresp_api/symptoms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Consulta enviada correctament.");
        navigate("../MetgeConsulta");
        setFormData({
          ...formData,
          username: token,
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
    <div className="Consulta">
      <h1>Consulta de Síntomas</h1>
      <form onSubmit={handleSubmit} className="symptoms-form">
        <div className="form-group">
          <label htmlFor="suffocate">Dificultat per respirar:</label>
          <input
            type="checkbox"
            id="suffocate"
            name="suffocate"
            checked={formData.suffocate}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cough">Tos:</label>
          <input
            type="checkbox"
            id="cough"
            name="cough"
            checked={formData.cough}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="mucus">Moc:</label>
          <input
            type="checkbox"
            id="mucus"
            name="mucus"
            checked={formData.mucus}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="congestion">Congestió nasal:</label>
          <input
            type="checkbox"
            id="congestion"
            name="congestion"
            checked={formData.congestion}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="throat">Dolor de coll:</label>
          <input
            type="checkbox"
            id="throat"
            name="throat"
            checked={formData.throat}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="fever">Febre:</label>
          <input
            type="checkbox"
            id="fever"
            name="fever"
            checked={formData.fever}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="chest_pain">Dolor al pit:</label>
          <input
            type="checkbox"
            id="chest_pain"
            name="chest_pain"
            checked={formData.chest_pain}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="whistle">Xiulet al pit:</label>
          <input
            type="checkbox"
            id="whistle"
            name="whistle"
            checked={formData.whistle}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="malaise">Malestar general:</label>
          <input
            type="checkbox"
            id="malaise"
            name="malaise"
            checked={formData.malaise}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn-submit">Enviar Consulta</button>
      </form>

      {error && <p className="error">{error}</p>}
      {message && <p className="success-message">{message}</p>}
    </div>
  );
}
