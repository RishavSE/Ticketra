import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";

dotenv.config();
connectDB();

const app = express();

// __dirname fix (ES module)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// API routes FIRST
app.use("/api", authRoutes);
app.use("/api/tickets", ticketRoutes);

// React build
app.use(express.static(path.join(__dirname, "../client/build")));

// ✅ FIXED ROUTE
app.get("/*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../client/build", "index.html")
  );
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
