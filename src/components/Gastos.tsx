import { useState } from "react";

interface Gasto {
  nombre: string;
  valor: string;
  editable?: boolean;
}

const Gastos = () => {
  const [gastos, setGastos] = useState<Gasto[]>([
    { nombre: "Sello", valor: "" },
    { nombre: "Despachador", valor: "" },
    { nombre: "Hoja", valor: "" },
    { nombre: "Agua", valor: "" },
    { nombre: "Almuerzo", valor: "" },
    { nombre: "Guardia", valor: "" },
    { nombre: "Sello Portoviejo", valor: "" },
    { nombre: "Fenacotip", valor: "" },
    { nombre: "Diesel-1", valor: "" },
    { nombre: "Diesel-2", valor: "" },
    { nombre: "Diesel-3", valor: "" },
    { nombre: "Chofer", valor: "" },
  ]);

  const handleChangeGasto = (index: number, value: string) => {
    const nuevosGastos = [...gastos];
    nuevosGastos[index].valor = value;
    setGastos(nuevosGastos);
  };

  const handleChangeNombre = (index: number, value: string) => {
    const nuevosGastos = [...gastos];
    nuevosGastos[index].nombre = value;
    setGastos(nuevosGastos);
  };

  const agregarOtroGasto = () => {
    setGastos([...gastos, { nombre: "", valor: "", editable: true }]);
  };

  const normalizarValor = (valor: string) => {
    if (valor === "" || valor === ".") return "0.00";
    const n = parseFloat(valor);
    return isNaN(n) ? "0.00" : n.toFixed(2);
  };

  const totalGastos = gastos.reduce((acc, gasto) => {
    const n = parseFloat(gasto.valor);
    return acc + (isNaN(n) ? 0 : n);
  }, 0);

  return (
    <section className="gastos-section">
      <h2 className="titulo-gasto">Tipo de Gasto</h2>

      <div className="gastos-listado">
        {gastos.map((gasto, index) => (
          <div className="gasto-item" key={index}>
            {gasto.editable ? (
              <input
                type="text"
                className="input-otro-nombre"
                value={gasto.nombre}
                onChange={(e) => handleChangeNombre(index, e.target.value)}
                placeholder="Nuevo gasto"
              />
            ) : (
              <label className="gasto-nombre">{gasto.nombre}</label>
            )}

            <input
              type="text"
              className="input-valor"
              value={gasto.valor}
              placeholder="$ 0.00"
              onChange={(e) => {
                let value = e.target.value;

                // Permitir solo números con punto y hasta 2 decimales, o solo punto o vacío
                const regex = /^(\d+)?(\.\d{0,2})?$/;

                if (value === "." || value === "" || regex.test(value)) {
                  handleChangeGasto(index, value);
                }
              }}
              onBlur={() => {
                const normalizado = normalizarValor(gasto.valor);
                handleChangeGasto(index, normalizado);
              }}
            />
          </div>
        ))}
      </div>

      <div className="total-gastos">
        <span className="total">Total: ${totalGastos.toFixed(2)}</span>
      </div>

      <div className="agregar-gasto-extra">
        <button className="btn-agregar-otro" onClick={agregarOtroGasto}>
          + Añadir otro gasto
        </button>
      </div>
    </section>
  );
};

export default Gastos;
