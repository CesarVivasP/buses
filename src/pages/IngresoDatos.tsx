import { useState } from "react";
import "../App.css";

const IngresoDatos = () => {
  const [opcion, setOpcion] = useState("");

  return (
    <div className="form-alingreso">
      {/* Selector principal */}
      <label className="form-subtitle">Seleccione qué desea ingresar:</label>
      <select
        className="form-select"
        value={opcion}
        onChange={(e) => setOpcion(e.target.value)}
      >
        <option value="">-- Seleccione --</option>
        <option value="buses">Ingreso de Buses</option>
        <option value="usuario">Ingreso de Usuario</option>
      </select>

      {/* 🚍 Formulario de Buses */}
      {opcion === "buses" && (
        <div className="form-section">
          <h3 className="form-title">Ingreso de Bus</h3>

          <label className="form-ingreso">Placa:</label>
          <input
            className="form-input"
            type="text"
            placeholder="Ej: ABC-1234"
          />

          <label className="form-ingreso">Marca:</label>
          <input
            className="form-input"
            type="text"
            placeholder="Ej: Hino, Mercedes"
          />

          <label className="form-ingreso">Año:</label>
          <input className="form-input" type="number" placeholder="Ej: 2020" />

          <label className="form-ingreso">Dueño:</label>
          <input
            className="form-input"
            type="text"
            placeholder="Nombre del dueño"
          />
        </div>
      )}

      {/* 👤 Formulario de Usuario */}
      {opcion === "usuario" && (
        <div className="form-section">
          <h3 className="form-title">Ingreso de Usuario</h3>

          <label className="form-ingreso">Nombres:</label>
          <input
            className="form-input"
            type="text"
            placeholder="Ingrese nombres"
          />

          <label className="form-ingreso">Apellidos:</label>
          <input
            className="form-input"
            type="text"
            placeholder="Ingrese apellidos"
          />

          <label className="form-ingreso">Cédula:</label>
          <input
            className="form-input"
            type="text"
            placeholder="Ingrese cédula"
          />

          <label className="form-ingreso">Teléfono:</label>
          <input
            className="form-input"
            type="tel"
            placeholder="Ingrese teléfono"
          />

          <label className="form-ingreso">Edad:</label>
          <input
            className="form-input"
            type="number"
            placeholder="Ingrese edad"
          />

          <label className="form-ingreso">Tipo de carnet de conducir:</label>
          <select className="form-select">
            <option value="A">Tipo A</option>
            <option value="B">Tipo B</option>
            <option value="C">Tipo C</option>
            <option value="D">Tipo D</option>
            <option value="E">Tipo E</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default IngresoDatos;
