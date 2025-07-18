import { useState } from "react";
import Header from "./components/Header";
import VueltaSection from "./components/Vueltas"; // importa con el nombre exacto
import "./App.css";

function App() {
  const [vueltas, setVueltas] = useState<number[]>([]);
  const [efectivo, setEfectivo] = useState<number[]>([]);

  const handleChange = (
    value: string,
    index: number,
    type: "vueltas" | "efectivo"
  ) => {
    const parsed = parseFloat(value) || 0;
    if (type === "vueltas") {
      const updated = [...vueltas];
      updated[index] = parsed;
      setVueltas(updated);
    } else {
      const updated = [...efectivo];
      updated[index] = parsed;
      setEfectivo(updated);
    }
  };

  const addVuelta = () => {
    setVueltas([...vueltas, vueltas.length + 1]);
    setEfectivo([...efectivo, 0]);
  };

  return (
    <>
      <Header />
      <main className="main-content-wrapper">
        <VueltaSection
          vueltas={vueltas}
          efectivo={efectivo}
          onChange={handleChange}
          onAdd={addVuelta}
        />
      </main>
    </>
  );
}

export default App;
