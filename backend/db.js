// backend/db.js
import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  port: 3306, // 🔹 puerto de MySQL
  user: "root", // ⚠️ cambia si usas otro usuario
  password: "", // ⚠️ tu contraseña de MySQL
  database: "sistema_buses",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Error al conectar a la base de datos:", err);
    return;
  }
  console.log("✅ Conexión exitosa a MySQL en puerto 3306");
});

export default db;
