import { Dispatch, SetStateAction } from "react";

export interface Gasto {
  id_tipo_gasto: number; // ← este es el que faltaba

  nombre: string;
  valor: string;
}

interface GastosProps {
  gastos: Gasto[];
  setGastos: Dispatch<SetStateAction<Gasto[]>>;
}

const Gastos = ({ gastos, setGastos }: GastosProps) => {
  const handleChangeGasto = (index: number, value: string) => {
    const nuevosGastos = [...gastos];
    nuevosGastos[index].valor = value;
    setGastos(nuevosGastos);
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
            {/* Nombre del gasto fijo, no editable */}
            <label className="gasto-nombre">{gasto.nombre}</label>

            {/* Valor editable */}
            <input
              type="text"
              className="input-valor"
              value={gasto.valor}
              placeholder="$ 0.00"
              onChange={(e) => {
                let value = e.target.value;
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
    </section>
  );
};

export default Gastos;
