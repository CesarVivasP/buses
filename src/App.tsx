// src/App.tsx
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom"; // solo Routes y Route
import Select from "react-select";
import Header from "./components/Header";
import VueltaSection from "./components/Vueltas";
import Gastos, { Gasto } from "./components/Gastos";
import Observ from "./components/Observ";
import IngresoDatos from "./pages/IngresoDatos";
import RegistroDiario from "./pages/RegistroDiario";
import Contacto from "./pages/Contacto";
import "./App.css";

function IngresoDatoss() {
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
  const [gastos, setGastos] = useState<Gasto[]>([]);

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

  const busOptions = buses.map((b) => ({
    value: b.id_bus,
    label: `${b.placa} - Bus ${b.n_bus}`,
  }));
  const choferOptions = usuarios.map((u) => ({
    value: u.id_usuario,
    label: `${u.nombres} ${u.apellidos} - ${u.cedula}`,
  }));

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
    setVueltas([...vueltas, 0]);
    setEfectivo([...efectivo, ""]);
  };

  const handleSubmit = async () => {
    if (!selectedBus || !selectedChofer) {
      alert("⚠️ Selecciona un bus y un chofer antes de guardar.");
      return;
    }

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

    try {
      const res = await fetch("http://localhost:3001/reportes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registro),
      });
      const data = await res.json();
      console.log("📤 Respuesta del servidor:", data);

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
      console.error(error);
      alert("Error al guardar el registro diario ❌");
    }
  };

  return (
    <>
      <Header />
      <main className="main-content-wrapper">
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

        <div className="contenido-flex">
          <VueltaSection
            vueltas={vueltas}
            efectivo={efectivo}
            onChange={handleChange}
            onAdd={addVuelta}
          />
          <Gastos gastos={gastos} setGastos={setGastos} />
        </div>

        <Observ value={observaciones} onChange={setObservaciones} />

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <button className="add-vuelta-button" onClick={handleSubmit}>
            Guardar Registro Diario
          </button>
        </div>
      </main>
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/registro-diario" element={<IngresoDatoss />} />
      <Route path="/" element={<IngresoDatos />} />
      <Route path="/registro-diario" element={<RegistroDiario />} />
      <Route path="/contacto" element={<Contacto />} />
    </Routes>
  );
}

export default App;
