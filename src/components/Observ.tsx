interface ObservProps {
  value: string;
  onChange: (value: string) => void;
}

const Observ = ({ value, onChange }: ObservProps) => {
  return (
    <div className="observ-container">
      <label htmlFor="observ-textarea" className="observ-label">
        Observaciones
      </label>
      <textarea
        id="observ-textarea"
        className="observ-textarea"
        placeholder="Escribe tus observaciones aquí..."
        value={value}
        onChange={(e) => onChange(e.target.value.trimStart())}
        rows={4}
      />
    </div>
  );
};

export default Observ;
