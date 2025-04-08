import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- Import de useNavigate
import '../styles/Login.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate(); // <-- Initialiser le hook

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success && data.token) {
        localStorage.setItem("token", data.token); // Stocker le token dans le localStorage
        setSuccess("Connexion réussie !");
        onLogin(); // met à jour isAuthenticated dans App
        setTimeout(() => {
          navigate('/admin'); // <-- Redirige vers /admin après 1s
        }, 1000);
      } else {
        setError(data.message || "Erreur de connexion");
      }
    } catch (error) {
      console.error("Erreur lors de la tentative de connexion :", error);
      setError("Erreur serveur");
    }
  };

  return (
    <div className="Login">
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom d'utilisateur :</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default Login;
