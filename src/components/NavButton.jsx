import "../css_modules/Navbar.css";

export default function NavButton({ text, onClick }) {
    return (
        <button className="btn btn-primary border border-white nav-button fw-light me-2 fs-5" onClick={onClick}>
            {text}      
        </button>
    )
}