import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// =============================
// PATH
// =============================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// =============================
// STATIC FILES
// =============================
app.use(express.static(__dirname));

// =============================
// HOME PAGE
// =============================
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "coach.html"));
});

// =============================
// HEALTH
// =============================
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server Working"
  });
});

// =============================
// ANALYSE
// =============================
app.post("/api/analyse", (req, res) => {

  const { topic, claim } = req.body;

  const result = `
AI Debate Coach Feedback

TOPIC:
${topic}

MAIN CLAIM:
${claim}

✔ Strong argumentative structure
✔ Good attempt at reasoning
✔ Clear debate positioning

Suggestions:
• Add statistics
• Add evidence
• Improve rebuttal
• Use emotional appeal

Overall Score: 8/10
`;

  res.json({
    success: true,
    result
  });
});

// =============================
// DEBATE
// =============================
app.post("/api/debate", (req, res) => {

  const { topic } = req.body;

  const result = `
Opening Statement:

I strongly disagree with "${topic}".

My arguments:
1. Ethical concerns
2. Social impact
3. Long-term risks
`;

  res.json({
    success: true,
    result
  });
});

// =============================
// SCORE
// =============================
app.post("/api/score", (req, res) => {

  const result = `
LOGIC: 8/10
CLARITY: 7/10
REBUTTAL: 8/10
OVERALL: 8/10
`;

  res.json({
    success: true,
    result
  });
});

// =============================
// SERVER
// =============================
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
