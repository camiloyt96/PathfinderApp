import React from "react";
import { auth } from "../firebase.js";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function LogoutButton({ className }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Redirige al login después de cerrar sesión
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      alert("No se pudo cerrar sesión. Intenta de nuevo.");
    }
  };

  return (
    <button 
      onClick={handleLogout}
      className={className || "btn btn-danger"}
    >
      Cerrar Sesión
    </button>
  );
}