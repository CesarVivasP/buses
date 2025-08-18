import { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="logo">Mi App</div>

        {/* Botón hamburguesa */}
        <button className="menu-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
          <ul>
            <li>
              <Link to="/" onClick={() => setMenuOpen(false)}>
                Ingreso de Datos
              </Link>
            </li>
            <li>
              <Link to="/registro-diario" onClick={() => setMenuOpen(false)}>
                Reporte Diario
              </Link>
            </li>
            <li>
              <Link to="/contacto" onClick={() => setMenuOpen(false)}>
                Contacto
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
