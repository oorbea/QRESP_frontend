import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./styles.css";
import Register from "./Register"; // Importar el componente de registro
import IntroDades from "./IntroDades";
import medico1 from "./images/medico1.png";
import pulmon from "./images/pulmon.png";

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { username, password };

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage(`Bienvenido, ${result.username}`);
      } else {
        const error = await response.json();
        setMessage(`Error: ${error.message}`);
      }
    } catch (err) {
      setMessage("Error al conectar amb el servidor.");
      console.error(err);
    }
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Ruta principal (Login) */}
          <Route
            path="/"
            element={
              <div>
                <h1>Q-RESP</h1>
                <h2>Developed by ALUE</h2>
                <div className="content-container">
                  <div className="image-left">
                    <img src={medico1} alt="Médico 1" className="medico-image" />
                  </div>

                  <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                      <label htmlFor="username">Usuari:</label>
                      <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Contrasenya:</label>
                      <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <button type="submit" className="btn">Inicia sessió</button>
                  </form>

                  <div className="image-right">
                    <img src={pulmon} alt="Pulmón" className="medico-image" />
                  </div>
                </div>

                <p>
                  No tens conta? <Link to="/register">Registrat aquí</Link>
                </p>

                {message && <p className="message">{message}</p>}
              </div>
            }
          />
          {/* Ruta para el registro */}
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}