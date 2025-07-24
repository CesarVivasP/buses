import { useState } from "react";
import Header from "./components/Header";
import VueltaSection from "./components/Vueltas";
import Gastos from "./components/Gastos";
import Observ from "./components/Observ";
import "./App.css";

function App() {
  const [observaciones, setObservaciones] = useState("");

  const [vueltas, setVueltas] = useState<number[]>([]);
  // Cambié de number[] a string[] para manejar mejor inputs parciales
  const [efectivo, setEfectivo] = useState<string[]>([]);

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
      // Guardamos el valor tal cual (string), sin parsear
      const updated = [...efectivo];
      updated[index] = value;
      setEfectivo(updated);
    }
  };

  const addVuelta = () => {
    setVueltas([...vueltas, vueltas.length + 1]);
    // Agregamos string vacío en lugar de 0 numérico
    setEfectivo([...efectivo, ""]);
  };

  return (
    <>
      <Header />
      <main className="main-content-wrapper">
        <div className="contenido-flex">
          <VueltaSection
            vueltas={vueltas}
            efectivo={efectivo}
            onChange={handleChange}
            onAdd={addVuelta}
          />
          <Gastos />
        </div>
      </main>
    </>
  );
}
export default App;
