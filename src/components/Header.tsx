const Header = () => {
  return (
    <>
      <header className="navbar">
        <nav>
          <ul>
            <li>
              <a className="mini" href="#">
                Ingreso de Buses
              </a>
            </li>
            <li>
              <a className="mini" href="#">
                Reportes Diarios
              </a>
            </li>
            <li>
              <a className="mini" href="#">
                Contacto
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Contenedor centrado debajo del navbar */}
      <div className="form-alineado">
        <label className="form-label">Número del Bus:</label>
        <select className="form-select">
          <option value="">Seleccione Su Bus</option>
          <option value="opcion1">Vuelta Larga 01</option>
          <option value="opcion2">Vuelta Larga 02</option>
          <option value="opcion3">Vuelta Larga 03</option>
          <option value="opcion4">Vuelta Larga 04</option>
        </select>

        <label className="form-label">Nombre del chofer:</label>
        <select className="form-select">
          <option value="">Seleccione Su nombre</option>
          <option value="opcion1">Pepe José Mero Garcia</option>
          <option value="opcion2">Keny Elan Nieto Plua</option>
          <option value="opcion3">Ivan Andrés Silva Briones</option>
        </select>
      </div>
    </>
  );
};

export default Header;
