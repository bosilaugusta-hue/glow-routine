import cors from "cors";
import "dotenv/config";
import express from "express";

import { pool } from "./db";
import authRouter from "./routes/authRoutes";

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
  }),
);

app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.json({
    message: "Glow Routine API fonctionne",
  });
});

app.get("/api/test-db", async (_request, response) => {
  try {
    const [rows] = await pool.query("SELECT 1 AS test");

    response.json({
      success: true,
      rows,
    });
  } catch (error) {
    console.error(error);

    response.status(500).json({
      success: false,
      message: "Erreur connexion MySQL",
    });
  }
});

app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log(`API lancée sur http://localhost:${port}`);
});