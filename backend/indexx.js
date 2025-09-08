// backend/indexx.js
import express from "express";
import cors from "cors";
import db from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

/* =======================
   📋 Obtener usuarios
======================= */
app.get("/usuarios", (req, res) => {
  const sql = "SELECT id_usuario, cedula, nombres, apellidos FROM usuarios";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Error al obtener usuarios:", err);
      return res.status(500).json({ message: "Error al obtener usuarios" });
    }
    res.json(results);
  });
});

/* =======================
   👤 Crear usuario
======================= */
app.post("/usuarios", (req, res) => {
  const { nombres, apellidos, cedula, telefono, edad, carnet } = req.body;

  const sql = `
    INSERT INTO usuarios (nombres, apellidos, cedula, telefono, edad, carnet)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [nombres, apellidos, cedula, telefono, edad, carnet],
    (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res
            .status(400)
            .json({ message: "❌ La cédula ya está registrada" });
        }
        console.error("❌ Error al insertar usuario:", err);
        return res.status(500).json({ message: "Error al insertar usuario" });
      }
      res.json({
        message: "✅ Usuario insertado con éxito",
        id: result.insertId,
      });
    }
  );
});

/* =======================
   🚌 Obtener buses
======================= */
app.get("/buses", (req, res) => {
  const sql = `
    SELECT b.id_bus, b.n_bus, b.placa, b.marca, b.anio,
           u.id_usuario, u.cedula, u.nombres, u.apellidos
    FROM buses b
    JOIN usuarios u ON b.Cedula_dueno = u.cedula
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Error al obtener buses:", err);
      return res.status(500).json({ message: "Error al obtener buses" });
    }
    res.json(results);
  });
});

/* =======================
   🚌 Crear bus
======================= */
app.post("/buses", (req, res) => {
  const { placa, n_bus, marca, anio, Cedula_dueno } = req.body;

  const sql = `
    INSERT INTO buses (placa, n_bus, marca, anio, Cedula_dueno)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [placa, n_bus, marca, anio, Cedula_dueno], (err, result) => {
    if (err) {
      if (
        err.code === "ER_NO_REFERENCED_ROW_2" ||
        err.code === "ER_NO_REFERENCED_ROW"
      ) {
        return res
          .status(400)
          .json({ message: "❗ La cédula del dueño no existe" });
      }
      if (err.code === "ER_DUP_ENTRY") {
        return res
          .status(409)
          .json({ message: "❗ Placa o número de bus ya existe" });
      }
      console.error("❌ Error al insertar bus:", err);
      return res.status(500).json({ message: "Error al insertar bus" });
    }
    res.json({ message: "✅ Bus registrado con éxito", id: result.insertId });
  });
});

/* =======================
   💰 Obtener tipos de gasto
======================= */
app.get("/tipos_gasto", (req, res) => {
  const sql = "SELECT id_tipo_gasto, nombre FROM tipos_gasto";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Error al obtener tipos de gasto:", err);
      res.status(500).json({ error: "Error al obtener tipos de gasto" });
    } else {
      res.json(results);
    }
  });
});

/* =======================
   📑 Crear reporte diario
======================= */
app.post("/reportes", (req, res) => {
  console.log("📩 Datos recibidos en /reportes:", req.body);

  const { id_bus, id_usuario, observaciones, vueltas, gastos } = req.body;

  const sql = `
    INSERT INTO reportes (id_bus, id_usuario, observaciones)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [id_bus, id_usuario, observaciones], async (err, result) => {
    if (err) {
      console.error("❌ Error al insertar reporte:", err);
      return res.status(500).json({ message: "Error al insertar reporte" });
    }

    const reporteId = result.insertId;
    console.log("✅ Reporte insertado con ID:", reporteId);

    try {
      // Guardar vueltas
      if (vueltas && vueltas.length > 0) {
        for (const v of vueltas) {
          await new Promise((resolve, reject) => {
            const sqlVuelta = `
              INSERT INTO vueltas (id_reporte, numero_vuelta, valor)
              VALUES (?, ?, ?)
            `;
            db.query(
              sqlVuelta,
              [reporteId, v.numero_vuelta, v.valor],
              (err) => {
                if (err) {
                  console.error("❌ Error al insertar vuelta:", err);
                  return reject(err);
                }
                console.log(
                  `✅ Vuelta ${v.numero_vuelta} guardada (Reporte ${reporteId})`
                );
                resolve();
              }
            );
          });
        }
      }

      // Guardar gastos
      if (gastos && gastos.length > 0) {
        for (const g of gastos) {
          await new Promise((resolve, reject) => {
            const sqlGasto = `
              INSERT INTO gastos (id_reporte, id_tipo_gasto, monto)
              VALUES (?, ?, ?)
            `;
            db.query(sqlGasto, [reporteId, g.id_tipo_gasto, g.monto], (err) => {
              if (err) {
                console.error("❌ Error al insertar gasto:", err);
                return reject(err);
              }
              console.log(
                `✅ Gasto tipo ${g.id_tipo_gasto} guardado (Reporte ${reporteId})`
              );
              resolve();
            });
          });
        }
      }

      res.json({ message: "✅ Reporte guardado con éxito", id: reporteId });
    } catch (error) {
      console.error("❌ Error al guardar detalle:", error);
      res.status(500).json({ message: "Error al guardar vueltas o gastos" });
    }
  });
});

/* =======================
   📑 Obtener reportes
======================= */
app.get("/reportes", (req, res) => {
  const sql = `
    SELECT r.id_reporte, r.observaciones,
           u.id_usuario, u.nombres, u.apellidos, u.cedula,
           b.id_bus, b.n_bus, b.placa
    FROM reportes r
    JOIN usuarios u ON r.id_usuario = u.id_usuario
    JOIN buses b ON r.id_bus = b.id_bus
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Error al obtener reportes:", err);
      return res.status(500).json({ message: "Error al obtener reportes" });
    }
    res.json(results);
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
