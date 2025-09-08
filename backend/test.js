// backend/test.js
import db from "./db.js";

const usuario = {
  nombres: "Juan",
  apellidos: "Perez",
  cedula: "123456",
  telefono: "099999999",
  edad: 30,
  carnet: "B",
};

const sql = `
  INSERT INTO usuarios (nombres, apellidos, cedula, telefono, edad, carnet)
  VALUES (?, ?, ?, ?, ?, ?)
`;

db.query(
  sql,
  [
    usuario.nombres,
    usuario.apellidos,
    usuario.cedula,
    usuario.telefono,
    usuario.edad,
    usuario.carnet,
  ],
  (err, result) => {
    if (err) {
      console.error("❌ Error al insertar usuario:", err);
    } else {
      console.log("✅ Usuario insertado con éxito, ID:", result.insertId);
    }
    // Cerrar conexión después de la consulta
    db.end((err) => {
      if (err) console.error("❌ Error cerrando la conexión:", err);
      else console.log("🔒 Conexión cerrada");
    });
  }
);
