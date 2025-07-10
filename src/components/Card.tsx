import { useState } from "react";

function Card() {
  const [efectivos, setEfectivos] = useState<number[]>([]);

  const addVuelta = () => {
    setEfectivos([...efectivos, 0]);
  };

  const handleEfectivoChange = (value: string, index: number) => {
    const parsed = parseFloat(value) || 0;
    const updated = [...efectivos];
    updated[index] = parsed;
    setEfectivos(updated);
  };

  const total = (arr: number[]) =>
    arr.reduce((acc, val) => acc + val, 0).toFixed(2);

  return (
    <>
      <header className="navbar">
        <nav>
          <ul>
            <li>
              <a className="mini" href="#">
                Ingreso de Buses
              </a>
            </li>
            <li>
              <a className="mini" href="#">
                Reportes Diarios
              </a>
            </li>
            <li>
              <a className="mini" href="#">
                Contacto
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main className="center-container">
        <div className="center-box">
          <h2 className="title">Reporte Diario</h2>

          <div className="chofer-box">Chofer: ____________________</div>

          <div className="content-section">
            {/* Vueltas caja */}
            <div className="vueltas-box">
              <h4>Vueltas</h4>

              {efectivos.map((val, i) => (
                <div key={i} className="vuelta-row">
                  <div className="vuelta-num">Vuelta {i + 1}</div>
                  <input
                    type="number"
                    placeholder="Efectivo"
                    value={val}
                    onChange={(e) => handleEfectivoChange(e.target.value, i)}
                    className="input-efectivo"
                  />
                </div>
              ))}

              <div className="total">Total efectivo: {total(efectivos)}</div>

              <div className="add-button-container">
                <button className="add-vuelta-button" onClick={addVuelta}>
                  Añadir Vuelta
                </button>
              </div>
            </div>

            {/* Gastos */}
            <div className="gastos-section">
              <h4>Gastos</h4>
              <div className="gasto-placeholder"></div>
              <div className="total">Total Gastos: _____</div>
            </div>
          </div>

          {/* Observaciones */}
          <div className="observaciones">
            <h4>Observaciones</h4>
            <textarea
              rows={4}
              placeholder="Escribe aquí tus observaciones..."
            ></textarea>
          </div>
        </div>
      </main>
    </>
  );
}

export default Card;
