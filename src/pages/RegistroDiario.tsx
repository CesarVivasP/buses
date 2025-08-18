import { useState } from "react";
import Header from "../components/Header";
import VueltaSection from "../components/Vueltas";
import Gastos from "../components/Gastos";
import Observ from "../components/Observ";
import "../App.css";

function RegistroDiario() {
  const [vueltas, setVueltas] = useState<number[]>([]);
  const [efectivo, setEfectivo] = useState<string[]>([]);
  const [observaciones, setObservaciones] = useState<string>("");

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
    setVueltas([...vueltas, vueltas.length + 1]);
    setEfectivo([...efectivo, ""]);
  };

  return (
    <>
      <Header />
      <main className="main-content-wrapper">
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
        <div className="contenido-flex">
          <VueltaSection
            vueltas={vueltas}
            efectivo={efectivo}
            onChange={handleChange}
            onAdd={addVuelta}
          />
          <Gastos />
        </div>
        <Observ value={observaciones} onChange={setObservaciones} />
      </main>
    </>
  );
}

export default RegistroDiario;
