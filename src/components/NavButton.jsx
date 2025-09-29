// NavButton.jsx - Opción 1: Usando Link (recomendado para navegación)
import { Link } from "react-router-dom";
import "../css_modules/Navbar.css";

export default function NavButton({ text, to }) {
    return (
        <Link 
            to={to} 
            className="btn btn-primary border border-white nav-button fw-light me-2 fs-5 text-decoration-none"
        >
            {text}
        </Link>
    );
}