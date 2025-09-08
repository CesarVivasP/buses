// src/App.tsx
import { useState, useEffect } from "react";
import Select from "react-select";
import Header from "./components/Header";
import VueltaSection from "./components/Vueltas";
import Gastos, { Gasto } from "./components/Gastos";
import Observ from "./components/Observ";
import "./App.css";

function App() {
  const [buses, setBuses] = useState<
    { id_bus: number; placa: string; n_bus: number }[]
  >([]);
  const [usuarios, setUsuarios] = useState<
    { id_usuario: number; cedula: string; nombres: string; apellidos: string }[]
  >([]);
  const [tiposGasto, setTiposGasto] = useState<
    { id_tipo_gasto: number; nombre: string }[]
  >([]);

  const [selectedBus, setSelectedBus] = useState<{
    value: number;
    label: string;
  } | null>(null);
  const [selectedChofer, setSelectedChofer] = useState<{
    value: number;
    label: string;
  } | null>(null);

  const [vueltas, setVueltas] = useState<number[]>([]);
  const [efectivo, setEfectivo] = useState<string[]>([]);
  const [observaciones, setObservaciones] = useState<string>("");

  // 📌 Gastos vinculados a la tabla tipos_gasto
  const [gastos, setGastos] = useState<Gasto[]>([]);

  // ======================
  // 📌 Cargar datos iniciales
  // ======================
  useEffect(() => {
    fetch("http://localhost:3001/buses")
      .then((res) => res.json())
      .then((data) => setBuses(data))
      .catch(console.error);

    fetch("http://localhost:3001/usuarios")
      .then((res) => res.json())
      .then((data) => setUsuarios(data))
      .catch(console.error);

    fetch("http://localhost:3001/tipos_gasto")
      .then((res) => res.json())
      .then((data) => {
        setTiposGasto(data);
        // Inicializar gastos con id_tipo_gasto y valor vacío
        setGastos(
          data.map((tg: any) => ({
            id_tipo_gasto: tg.id_tipo_gasto,
            nombre: tg.nombre,
            valor: "",
          }))
        );
      })
      .catch(console.error);
  }, []);

  // Opciones para react-select
  const busOptions = buses.map((b) => ({
    value: b.id_bus,
    label: `${b.placa} - Bus ${b.n_bus}`,
  }));

  const choferOptions = usuarios.map((u) => ({
    value: u.id_usuario,
    label: `${u.nombres} ${u.apellidos} - ${u.cedula}`,
  }));

  // ======================
  // 📌 Manejo cambios vueltas y efectivo
  // ======================
  const handleChange = (
    value: string,
    index: number,
    type: "vueltas" | "efectivo"
  ) => {
    if (type === "vueltas") {
      const parsed = parseFloat(value) || 0;
      const updated = [...vueltas];
      updated[index] = parsed;
      setVueltas(updated);
    } else {
      const updated = [...efectivo];
      updated[index] = value;
      setEfectivo(updated);
    }
  };

  const addVuelta = () => {
    setVueltas([...vueltas, 0]); // siempre inicia en 0
    setEfectivo([...efectivo, ""]);
  };

  // ======================
  // 📌 Guardar registro diario
  // ======================
  const handleSubmit = async () => {
    if (!selectedBus || !selectedChofer) {
      alert("⚠️ Selecciona un bus y un chofer antes de guardar.");
      return;
    }

    // ✅ Usar directamente el id_tipo_gasto
    const gastosFinales = gastos.map((g) => ({
      id_tipo_gasto: g.id_tipo_gasto,
      monto: parseFloat(g.valor) || 0,
    }));

    const registro = {
      id_bus: selectedBus.value,
      id_usuario: selectedChofer.value,
      observaciones,
      vueltas: vueltas.map((_, i) => ({
        numero_vuelta: i + 1,
        valor: parseFloat(efectivo[i]) || 0,
      })),
      gastos: gastosFinales,
    };

    console.log("📤 Enviando al backend:", registro);

    try {
      const res = await fetch("http://localhost:3001/reportes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registro),
      });

      const data = await res.json();
      console.log("✅ Guardado con éxito:", data);
      alert("Registro diario guardado con éxito ✅");

      // Reset opcional
      setVueltas([]);
      setEfectivo([]);
      setObservaciones("");
      setSelectedBus(null);
      setSelectedChofer(null);
      setGastos(
        tiposGasto.map((tg) => ({
          id_tipo_gasto: tg.id_tipo_gasto,
          nombre: tg.nombre,
          valor: "",
        }))
      );
    } catch (error) {
      console.error("❌ Error al guardar:", error);
      alert("Error al guardar el registro diario ❌");
    }
  };

  return (
    <>
      <Header />
      <main className="main-content-wrapper">
        {/* Selección bus y chofer */}
        <div className="select-container">
          <div>
            <label className="form-label">Número del Bus:</label>
            <Select
              options={busOptions}
              value={selectedBus}
              onChange={setSelectedBus}
              placeholder="Seleccione su bus..."
              isSearchable
              classNamePrefix="react-select"
            />
          </div>

          <div>
            <label className="form-label">Nombre del chofer:</label>
            <Select
              options={choferOptions}
              value={selectedChofer}
              onChange={setSelectedChofer}
              placeholder="Seleccione chofer..."
              isSearchable
              classNamePrefix="react-select"
            />
          </div>
        </div>

        {/* Sección de vueltas y gastos */}
        <div className="contenido-flex">
          <VueltaSection
            vueltas={vueltas}
            efectivo={efectivo}
            onChange={handleChange}
            onAdd={addVuelta}
          />
          <Gastos gastos={gastos} setGastos={setGastos} />
        </div>

        {/* Observaciones */}
        <Observ value={observaciones} onChange={setObservaciones} />

        {/* Botón guardar */}
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <button className="btn-guardar" onClick={handleSubmit}>
            Guardar Registro Diario
          </button>
        </div>
      </main>
    </>
  );
}

export default App;
