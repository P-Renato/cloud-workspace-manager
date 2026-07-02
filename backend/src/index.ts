import express from "express";
import cors from "cors";
import healthRoutes from "./routes/healthRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", healthRoutes)

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});