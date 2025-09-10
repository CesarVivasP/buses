import { useState, useEffect } from "react";
import "../App.css";
import Header from "../components/Header"; // Ajusta la ruta si es necesario
import Select from "react-select";

const IngresoDatoss = () => {
  const [opcion, setOpcion] = useState("");

  // Estados BUS
  const [placa, setPlaca] = useState("");
  const [n_bus, setN_Bus] = useState("");
  const [marca, setMarca] = useState("");
  const [anio, setAnio] = useState<number | string>("");
  const [CedulaDueno, setCedulaDueno] = useState("");

  // Lista de usuarios para select dueño
  const [usuarios, setUsuarios] = useState<
    { cedula: string; nombres: string; apellidos: string }[]
  >([]);

  // Estados USUARIO
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [cedula, setCedula] = useState("");
  const [telefono, setTelefono] = useState("");
  const [edad, setEdad] = useState<number | string>("");
  const [carnet, setCarnet] = useState("A");

  // Traer usuarios para select dueño
  useEffect(() => {
    if (opcion === "buses") {
      fetch("http://localhost:3001/usuarios")
        .then((res) => res.json())
        .then((data) => setUsuarios(data))
        .catch(console.error);
    }
  }, [opcion]);

  const handleGuardar = async () => {
    try {
      let url = "";
      let data = {};

      if (opcion === "buses") {
        if (!placa || !n_bus || !marca || !anio || !CedulaDueno) {
          alert("⚠️ Todos los campos de Buses son obligatorios");
          return;
        }

        url = "http://localhost:3001/buses";
        data = {
          placa,
          n_bus,
          marca,
          anio: Number(anio),
          Cedula_dueno: Number(CedulaDueno),
        };
      } else if (opcion === "usuario") {
        if (
          !nombres ||
          !apellidos ||
          !cedula ||
          !telefono ||
          !edad ||
          !carnet
        ) {
          alert("⚠️ Todos los campos de Usuario son obligatorios");
          return;
        }

        url = "http://localhost:3001/usuarios";
        data = {
          nombres,
          apellidos,
          cedula: Number(cedula),
          telefono,
          edad: Number(edad),
          carnet,
        };
      } else {
        alert("⚠️ Seleccione una opción antes de guardar");
        return;
      }

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      console.log("✅ Respuesta del servidor:", result);
      alert(result.message || "Guardado correctamente");

      // Limpiar campos solo del formulario activo
      if (opcion === "buses") {
        setPlaca("");
        setN_Bus("");
        setMarca("");
        setAnio("");
        setCedulaDueno("");
      } else if (opcion === "usuario") {
        setNombres("");
        setApellidos("");
        setCedula("");
        setTelefono("");
        setEdad("");
        setCarnet("A");
      }
    } catch (error) {
      console.error("❌ Error al guardar:", error);
      alert("Error al guardar datos");
    }
  };

  const customStyles = {
    container: (provided: any) => ({
      ...provided,
      width: "100%",
    }),
    menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
  };

  return (
    <div>
      <Header />

      {/* Contenido del formulario */}
      <div className="form-alingreso">
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

        {/* Formulario Buses */}
        {opcion === "buses" && (
          <div className="form-section">
            <h3 className="form-title">Ingreso de Bus</h3>
            <label className="form-ingreso">Placa:</label>
            <input
              className="form-input"
              type="text"
              value={placa}
              onChange={(e) => setPlaca(e.target.value)}
            />

            <label className="form-ingreso">Número del Bus:</label>
            <input
              className="form-input"
              type="number"
              value={n_bus}
              onChange={(e) => setN_Bus(e.target.value)}
            />

            <label className="form-ingreso">Marca:</label>
            <input
              className="form-input"
              type="text"
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
            />

            <label className="form-ingreso">Año:</label>
            <input
              className="form-input"
              type="number"
              value={anio}
              onChange={(e) => setAnio(e.target.value)}
            />

            {/* React-Select para Dueño */}
            <label className="form-ingreso">Dueño:</label>
            <Select
              placeholder="Buscar por cédula o nombre..."
              options={usuarios.map((u) => ({
                value: u.cedula,
                label: `${u.cedula} - ${u.nombres} ${u.apellidos}`,
              }))}
              value={
                CedulaDueno
                  ? {
                      value: CedulaDueno,
                      label: usuarios.find((u) => u.cedula === CedulaDueno)
                        ? `${
                            usuarios.find((u) => u.cedula === CedulaDueno)
                              ?.cedula
                          } - ${
                            usuarios.find((u) => u.cedula === CedulaDueno)
                              ?.nombres
                          } ${
                            usuarios.find((u) => u.cedula === CedulaDueno)
                              ?.apellidos
                          }`
                        : "",
                    }
                  : null
              }
              onChange={(selectedOption) =>
                setCedulaDueno(selectedOption ? selectedOption.value : "")
              }
              isClearable
              styles={customStyles}
              menuPortalTarget={document.body} // Esto hace que el menú se muestre sobre todo
            />

            <button
              type="button"
              className="add-vuelta-button"
              onClick={handleGuardar}
            >
              Guardar
            </button>
          </div>
        )}

        {/* Formulario Usuario */}
        {opcion === "usuario" && (
          <div className="form-section">
            <h3 className="form-title">Ingreso de Usuario</h3>
            <label className="form-ingreso">Nombres:</label>
            <input
              className="form-input"
              type="text"
              value={nombres}
              onChange={(e) => setNombres(e.target.value)}
            />

            <label className="form-ingreso">Apellidos:</label>
            <input
              className="form-input"
              type="text"
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
            />

            <label className="form-ingreso">Cédula:</label>
            <input
              className="form-input"
              type="text"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
            />

            <label className="form-ingreso">Teléfono:</label>
            <input
              className="form-input"
              type="tel"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />

            <label className="form-ingreso">Edad:</label>
            <input
              className="form-input"
              type="number"
              value={edad}
              onChange={(e) => setEdad(e.target.value)}
            />

            <label className="form-ingreso">Tipo de carnet de conducir:</label>
            <select
              className="form-select"
              value={carnet}
              onChange={(e) => setCarnet(e.target.value)}
            >
              <option value="A">Tipo A</option>
              <option value="B">Tipo B</option>
              <option value="C">Tipo C</option>
              <option value="D">Tipo D</option>
              <option value="E">Tipo E</option>
            </select>

            <button
              type="button"
              className="add-vuelta-button"
              onClick={handleGuardar}
            >
              Guardar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default IngresoDatoss;
