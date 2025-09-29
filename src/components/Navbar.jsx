// Navbar.jsx
import dice20 from '../assets/dice20.png'
import '../css_modules/Navbar.css'
import NavButton from './NavButton'

export default function Navbar() {
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
            <NavButton text="Iniciar Sesion" to="/login" />
            <NavButton text="Registrarse" to="/register" />
            <NavButton text="Acerca de" onClick={() => alert('Sobre nosotros')} />
          </div>
        </div>
      </div>
    </nav>
  )
}