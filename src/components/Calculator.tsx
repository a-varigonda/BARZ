import { useState } from "react";
import useChat from "./useChat";

function Calculator() {
  const { reply, isLoading, send } = useChat();
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    send([{ role: "user", content: input }]);
  };

  return (
    <div style={{ padding: 16 }}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Message"
        style={{ width: "100%", marginBottom: 8 }}
      />
      <button onClick={handleSend} disabled={isLoading}>
        {isLoading ? "Loading..." : "Send"}
      </button>

      <div style={{ marginTop: 16, whiteSpace: "pre-wrap" }}>{reply}</div>
    </div>
  );
}

export default Calculator;
