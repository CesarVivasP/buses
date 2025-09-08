// src/pages/RegistroDiario.tsx
import { useState, useEffect } from "react";
import Select from "react-select";
import Header from "../components/Header";
import VueltaSection from "../components/Vueltas";
import Gastos, { Gasto } from "../components/Gastos";
import Observ from "../components/Observ";
import "../App.css";

function RegistroDiario() {
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

  // ======================
  // 📌 Guardar en la base
  // ======================
  const handleGuardar = () => {
    if (!selectedBus || !selectedChofer) {
      alert("⚠️ Selecciona un bus y un chofer antes de guardar.");
      return;
    }

    const registro = {
      id_bus: Number(selectedBus.value),
      id_usuario: Number(selectedChofer.value),
      observaciones,
      vueltas: vueltas.map((v, i) => ({
        numero_vuelta: i + 1,
        valor: parseFloat(efectivo[i]) || 0,
      })),
      gastos: gastos.map((g) => ({
        id_tipo_gasto: g.id_tipo_gasto,
        monto: parseFloat(g.valor) || 0,
      })),
    };

    console.log("📤 Enviando al backend:", registro);

    fetch("http://localhost:3001/reportes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registro),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Guardado con éxito:", data);
        alert("Registro guardado correctamente ✅");
      })
      .catch((err) => console.error("❌ Error al guardar:", err));
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
              onChange={(option) => setSelectedBus(option)}
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
              onChange={(option) => setSelectedChofer(option)}
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
            onChange={(value, index, type) => {
              if (type === "vueltas") {
                const updated = [...vueltas];
                updated[index] = parseFloat(value) || 0;
                setVueltas(updated);
              } else {
                const updated = [...efectivo];
                updated[index] = value;
                setEfectivo(updated);
              }
            }}
            onAdd={() => {
              setVueltas([...vueltas, 0]);
              setEfectivo([...efectivo, ""]);
            }}
          />
          <Gastos gastos={gastos} setGastos={setGastos} />
        </div>

        <Observ value={observaciones} onChange={setObservaciones} />

        {/* Botón de guardar */}
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <button type="button" onClick={handleGuardar} className="btn-guardar">
            Guardar Registro
          </button>
        </div>
      </main>
    </>
  );
}

export default RegistroDiario;
