import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";

export default function LoginBox() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Por favor, ingresa correo y contraseña.");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Usuario logeado:", user);
      navigate("/"); // Redirige al home o donde prefieras
    } catch (fireBaseError) {
      console.error("Error al iniciar sesión", fireBaseError.code);

      switch (fireBaseError.code) {
        case "auth/invalid-email":
          setError("El correo electrónico no es válido.");
          break;
        case "auth/user-disabled":
          setError("El usuario ha sido deshabilitado.");
          break;
        case "auth/user-not-found":
          setError("No se encontró ningún usuario con este correo.");
          break;
        case "auth/wrong-password":
          setError("La contraseña es incorrecta.");
          break;
        default:
          setError("Error al iniciar sesión. Por favor intenta de nuevo.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container-lg mt-5 d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <div className="card shadow bg-dark text-white mt-5">
        <div className="card-body p-5">
          <h3 className="card-title text-center fs-1">Bienvenido a PathFinder Society!</h3>
          <p className="card-text text-center fw-bold fs-2">
            Por favor inicia sesión o regístrate para continuar.
          </p>

          <form onSubmit={handleLogin}>
            <div className="mb-3 fw-bold">
              <label htmlFor="email" className="form-label">Correo Electrónico</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3 fw-bold">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <button
              type="submit"
              className="btn btn-primary w-100 mb-2"
              disabled={loading}
            >
              {loading ? "Cargando..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
