import { useState, useRef } from "react";
import axios from "axios";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

export default function useChat() {
  const [reply, setReply] = useState("");
  const [isLoading, setLoading] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);

  const send = async (messages: Message[]) => {
    controllerRef.current?.abort();
    controllerRef.current = new AbortController();

    setLoading(true);
    setReply("");

    try {
      const res = await axios.post(
        "http://localhost:4000/api/chat",
        { messages },
        { signal: controllerRef.current.signal },
      );

      console.log("Server response:", res.data);

      const content = res.data?.choices?.[0]?.message?.content;

      // Claude returns content blocks, not a plain string
      if (Array.isArray(content)) {
        const text = content
          .filter((c: any) => c.type === "text")
          .map((c: any) => c.text)
          .join("");
        setReply(text || "No reply returned");
      } else {
        setReply(content || "No reply returned");
      }
    } catch (err: any) {
      console.error(
        "Error calling OpenRouter:",
        err.response?.data || err.message,
      );
      setReply("Error calling OpenRouter");
    } finally {
      setLoading(false);
    }
  };

  return { reply, isLoading, send };
}
