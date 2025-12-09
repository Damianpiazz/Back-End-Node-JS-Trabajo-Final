import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Cargar .env
dotenv.config();

// Importar
import "./config/firebase.config.js";
import authRouter from "./routes/auth.routes.js";
import productRouter from "./routes/products.routes.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

// Configuración CORS
const corsConfig = {
  origin: ["http://localhost:3000", "https://midominio.com"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsConfig));

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);

// Logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// 404
app.use((req, res) => res.status(404).json({ error: "Ruta no encontrada" }));

// Start
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
