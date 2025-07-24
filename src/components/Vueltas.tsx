interface Props {
  vueltas: number[];
  efectivo: string[];
  onChange: (
    value: string,
    index: number,
    type: "vueltas" | "efectivo"
  ) => void;
  onAdd: () => void;
}

const VueltaSection = ({ vueltas, efectivo, onChange, onAdd }: Props) => {
  // Suma total de efectivo, ignorando valores inválidos
  const total = (arr: string[]) =>
    arr.reduce((acc, val) => {
      const n = parseFloat(val);
      return acc + (isNaN(n) ? 0 : n);
    }, 0);

  // Normaliza el valor al formato "0.00"
  const normalizarValor = (valor: string) => {
    if (valor === "" || valor === ".") return "";
    const n = parseFloat(valor);
    return isNaN(n) ? "" : n.toFixed(2);
  };

  // Valida que el input sea vacío, o números con max 2 decimales y 1 solo punto
  const validarInput = (value: string) => {
    return /^(\d+)?(\.\d{0,2})?$/.test(value);
  };

  return (
    <div className="vueltas-box">
      <h2>Vueltas</h2>
      {vueltas.map((_, i) => (
        <div className="vuelta-row" key={i}>
          <input
            type="text"
            value={`Vuelta ${i + 1}`}
            readOnly
            className="vuelta-label"
          />
          <input
            type="text"
            placeholder="$ 0.00"
            value={efectivo[i] || ""}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || validarInput(value)) {
                onChange(value, i, "efectivo");
              }
            }}
            onBlur={() => {
              const normalizado = normalizarValor(efectivo[i]);
              onChange(normalizado, i, "efectivo");
            }}
            className="efectivo-input"
            inputMode="decimal"
          />
        </div>
      ))}
      <div className="total">Total: ${total(efectivo).toFixed(2)}</div>
      <button className="add-vuelta-button" onClick={onAdd}>
        Añadir Vuelta
      </button>
    </div>
  );
};

export default VueltaSection;
