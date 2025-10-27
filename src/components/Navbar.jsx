// Navbar.jsx
import React, { useEffect, useState } from 'react'
import dice20 from '../assets/dice20.png'
import '../css_modules/Navbar.css'
import NavButton from './NavButton'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'

export default function Navbar() {
  const [user, setUser] = useState(auth.currentUser)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u))
    return unsubscribe
  }, [])

  return (
    <nav className="navbar navbar-expand-lg bg-dark p-2">
      <div className="container-fluid d-flex gap-2">
        <a className="navbar-brand text-white fw-semibold path-title fs-1" href="#">
          <img src={dice20} alt="" className='navbarlogo d-inline-block align-text-center fw-bold fs-1' />
          Pathfinder Society
        </a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon bg-light"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="d-flex flex-lg-row flex-column gap-2 justify-content-end w-100">
            <NavButton text="Home" to="/" />
            <NavButton text="Chat" to="/chat" />
            {/* Mostrar Perfil si hay sesión, si no mostrar Login/Register */}
            {user ? (
              <NavButton text="Perfil" to="/profile" />
            ) : (
              <>
                <NavButton text="Iniciar Sesion" to="/login" />
                <NavButton text="Registrarse" to="/register" />
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}