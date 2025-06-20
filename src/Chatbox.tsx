import { useState } from "react"
import axios from "axios"

export default function Chatbox() {
  const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [plannedTask, setPlannedTask] = useState("");


  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);


    try {
      const response = await axios.post("http://localhost:3000/api/v1/taskPlannerAgent", {
        task: input,
      })
      setPlannedTask(response.data);
      const botReply = { sender: "bot", text: ` ${response.data}` };
      setMessages((prev) => [...prev, botReply]);

    } catch (err) {
      console.error("Error sending task:", err);
    }
    setInput("");
  };

  const approveTask = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/task/post", {
        task: plannedTask
      });

      if (response.status == 200) {
        alert("Task sent successfully!");
        setPlannedTask("");
      } else {
        alert("Error while submitting the task.");
      }
    } catch (error) {
      console.error(error);
      alert("Error occurred.");
    }
  };

  const rejectTask = () => {
    setPlannedTask("");
  };


  return (
    <div
      style={{
        position: "fixed",
        right: 0,
        top: 0,
        width: "50vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#00000",
        borderLeft: "1px solid #ccc",
        zIndex: 10,
      }}
    >
      {/* Header */}
      <div style={{ padding: "16px", borderBottom: "1px solid #ddd" }}>
        <h2>Chatbot Assistant</h2>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          padding: "16px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              background: msg.sender === "user" ? "#007bff" : "#e0e0e0",
              color: msg.sender === "user" ? "#fff" : "#000",
              padding: "10px 14px",
              borderRadius: "16px",
              maxWidth: "70%",
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div
        style={{
          padding: "16px",
          borderTop: "1px solid #ddd",
          display: "flex",
          gap: "8px",
        }}
      >
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "20px",
            border: "1px solid #ccc",
          }}
        />
        <button onClick={sendMessage} style={{ padding: "10px 20px", borderRadius: "20px" }}>
          Send
        </button>
      </div>
      {/* Planned Task & Approve/Reject */}
      <div
        style={{
          padding: "16px",
          background: "#242424",
          color: "white",
          flexGrow: 1,
          overflowY: "auto",
        }}
      >
        <h4>Task planned:</h4>
        {plannedTask ? (
          <div style={{ marginBottom: "1rem" }}>{plannedTask}</div>
        ) : (
          <div style={{ fontStyle: "italic" }}>No task planned yet.</div>
        )}

        {plannedTask && (
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={approveTask}
              style={{
                background: "#28a745",
                padding: "8px 16px",
                border: "none",
                borderRadius: "4px",
                color: "#fff",
              }}
            >
              Approve
            </button>
            <button
              onClick={rejectTask}
              style={{
                background: "#dc3545",
                padding: "8px 16px",
                border: "none",
                borderRadius: "4px",
                color: "#fff",
              }}
            >
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
}