import { useState } from "react";

interface Gasto {
  nombre: string;
  valor: number;
}

const Gastos = () => {
  const [gastos, setGastos] = useState<Gasto[]>([
    { nombre: "Sello", valor: 0 },
    { nombre: "Despachador", valor: 0 },
    { nombre: "Hoja", valor: 0 },
    { nombre: "Agua", valor: 0 },
    { nombre: "Almuerzo", valor: 0 },
    { nombre: "Guardia", valor: 0 },
    { nombre: "Sello Portoviejo", valor: 0 },
    { nombre: "Fenacotip", valor: 0 },
    { nombre: "Diesel-1", valor: 0 },
    { nombre: "Diesel-2", valor: 0 },
    { nombre: "Diesel-3", valor: 0 },
    { nombre: "Chofer", valor: 0 },
  ]);

  const handleChangeGasto = (index: number, value: string) => {
    const nuevosGastos = [...gastos];
    nuevosGastos[index].valor = parseFloat(value) || 0;
    setGastos(nuevosGastos);
  };

  const totalGastos = gastos.reduce((acc, gasto) => acc + gasto.valor, 0);

  return (
    <section className="gastos-section">
      <h3>Tipo de Gasto</h3>

      <div className="gastos-listado">
        {gastos.map((gasto, index) => (
          <div className="gasto-item" key={index}>
            <label className="gasto-nombre">{gasto.nombre}</label>
            <input
              type="text"
              inputMode="decimal"
              pattern="^\d*(\.\d{0,2})?$"
              className="input-valor"
              value={gasto.valor === 0 ? "" : gasto.valor}
              onChange={(e) => handleChangeGasto(index, e.target.value)}
              placeholder="$ 0.00"
            />
          </div>
        ))}
      </div>

      <div className="total-gastos">
        <span className="total">Total: ${totalGastos.toFixed(2)}</span>
      </div>
    </section>
  );
};

export default Gastos;
