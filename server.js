import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;

// =============================
// ROOT
// =============================
app.get("/", (req, res) => {
  res.send("✅ Debate Coach Pro Backend Running");
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
// FAKE AI RESPONSE GENERATOR
// =============================
function generateFeedback(topic, claim) {

  return `
AI Debate Coach Feedback

TOPIC:
${topic}

MAIN CLAIM:
${claim}

✔ Strong argumentative structure
✔ Good attempt at reasoning
✔ Clear debate positioning

Suggestions for Improvement:
• Add more statistical evidence
• Include expert quotations
• Strengthen rebuttal against the opposing side
• Improve emotional appeal in conclusion

Advanced Debate Tips:
• Use comparative examples
• Address counterarguments earlier
• Use persuasive transitions

Overall Performance: 8/10

This argument demonstrates strong debate fundamentals and good persuasive potential.
`;
}

// =============================
// ANALYSE
// =============================
app.post("/api/analyse", async (req, res) => {

  try {

    const {
      topic,
      claim
    } = req.body;

    const result = generateFeedback(topic, claim);

    res.json({
      success: true,
      result
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// =============================
// LIVE DEBATE
// =============================
app.post("/api/debate", async (req, res) => {

  try {

    const {
      topic,
      stance,
      action
    } = req.body;

    let result = "";

    if (action === "start") {

      result = `
Opening Statement:

I strongly disagree with the motion "${topic}".

While some benefits exist, the negative consequences significantly outweigh them.

My arguments will focus on:
1. Social impact
2. Ethical concerns
3. Long-term consequences

I challenge the opposition to justify these harms.
`;

    } else if (action === "reply") {

      result = `
Your argument contains some valid points, however it lacks sufficient evidence and ignores broader societal consequences.

A stronger rebuttal would require:
• factual support
• comparative analysis
• clearer logical connection

Therefore, your position remains unconvincing.
`;

    } else {

      result = `
Coach Hint:

Focus on:
• evidence
• emotional appeal
• counterattack strategy
• concise rebuttals
`;
    }

    res.json({
      success: true,
      result
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// =============================
// SCORE
// =============================
app.post("/api/score", async (req, res) => {

  try {

    const result = `
LOGIC: 8/10
CLARITY: 7/10
REBUTTAL: 8/10
OVERALL: 8/10

Strengths:
• Strong structure
• Clear position
• Effective language

Weaknesses:
• Needs more evidence
• Rebuttal could be deeper
• Conclusion can be stronger

Overall this is a competitive debate argument with good persuasive quality.
`;

    res.json({
      success: true,
      result
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// =============================
// START SERVER
// =============================
app.listen(PORT, () => {

  console.log(`✅ Server running on http://localhost:${PORT}`);

});
