import { useState } from "react";

export default function ChatInput({ onSendMessage, disabled = false }) {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!text.trim()) return;

    try {
      await onSendMessage(text);
      setText(""); // Limpiar después de enviar
    } catch (error) {
      console.error("Error al enviar:", error);
      alert("No se pudo enviar el mensaje");
    }
  };

  return (
    <form className="card-footer d-flex gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-control"
        placeholder="Escribe un mensaje..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={disabled}
      />
      <button 
        type="submit" 
        className="btn btn-primary"
        disabled={disabled || !text.trim()}
      >
        Enviar
      </button>
    </form>
  );
}