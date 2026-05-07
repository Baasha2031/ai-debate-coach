import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "coach.html"));
});

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Server Working" });
});

app.post("/api/analyse", (req, res) => {
  const { topic, claim } = req.body;
  res.json({ success: true, result: `Feedback for: ${topic} - ${claim}` });
});

app.post("/api/debate", (req, res) => {
  const { topic } = req.body;
  res.json({ success: true, result: `Counter: ${topic}` });
});

app.post("/api/score", (req, res) => {
  res.json({ success: true, result: "OVERALL: 8/10" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
