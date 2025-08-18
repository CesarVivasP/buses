import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import IngresoDatos from "./pages/IngresoDatos";
import RegistroDiario from "./pages/RegistroDiario";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<IngresoDatos />} />
        <Route path="/registro-diario" element={<RegistroDiario />} />
      </Routes>
    </>
  );
}

export default App;
