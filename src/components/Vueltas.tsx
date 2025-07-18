interface Props {
  vueltas: number[];
  efectivo: number[];
  onChange: (
    value: string,
    index: number,
    type: "vueltas" | "efectivo"
  ) => void;
  onAdd: () => void;
}

const VueltaSection = ({ vueltas, efectivo, onChange, onAdd }: Props) => {
  const total = (arr: number[]) =>
    arr.reduce((acc, val) => acc + val, 0).toFixed(2);

  return (
    <div className="vueltas-box">
      <h4>Vueltas</h4>
      {vueltas.map((_, i) => (
        <div className="vuelta-row" key={i}>
          <input
            type="text"
            value={`Vuelta ${i + 1}`}
            readOnly
            className="vuelta-label"
          />
          <input
            type="number"
            placeholder="Ingrese el valor"
            value={efectivo[i] === 0 ? "" : efectivo[i]}
            onChange={(e) => onChange(e.target.value, i, "efectivo")}
            className="efectivo-input"
          />
        </div>
      ))}
      <div className="total">Total: {total(efectivo)}</div>
      <button className="add-vuelta-button" onClick={onAdd}>
        Añadir Vuelta
      </button>
    </div>
  );
};

export default VueltaSection;
