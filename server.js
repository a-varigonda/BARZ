import http from "http";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const PORT = 4000;
const apiKey = process.env.OPENROUTER_API_KEY;

const server = http.createServer((req, res) => {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === "POST" && req.url === "/api/chat") {
    let body = "";

    req.on("data", (chunk) => (body += chunk));
    req.on("end", async () => {
      try {
        console.log("=== New POST /api/chat ===");
        console.log("Raw body:", body);

        const { messages } = JSON.parse(body);
        console.log("Parsed messages:", messages);

        if (!apiKey) throw new Error("OPENROUTER_API_KEY missing");

        // Claude requires content blocks
        const formattedMessages = messages.map((m) => ({
          role: m.role,
          content: Array.isArray(m.content)
            ? m.content
            : [{ type: "text", text: m.content }],
        }));

        console.log("Sending request to OpenRouter...");

        const response = await axios.post(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            model: "anthropic/claude-sonnet-4.5",
            messages: formattedMessages,
            max_tokens: 1024,
          },
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
              "HTTP-Referer": "http://localhost:3000",
              "X-Title": "React Claude Calculator",
            },
          },
        );

        console.log("OpenRouter response:", response.data);

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(response.data));
      } catch (err) {
        console.error(
          "Error in POST /api/chat:",
          err.response?.data || err.message,
        );
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: err.response?.data || err.message }));
      }
    });
    return;
  }

  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not found");
});

server.listen(PORT, () => console.log(`Node proxy running on port ${PORT}`));
