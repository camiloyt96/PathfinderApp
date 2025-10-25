import ChatMessage from "./ChatMessage";

export default function ChatMessageList({ messages, scrollRef }) {
  return (
    <div
      ref={scrollRef}
      className="card-body overflow-auto"
      style={{ maxHeight: "400px", minHeight: "400px" }}
    >
      {messages.length === 0 ? (
        <div className="text-muted text-center py-5">
          No hay mensajes aún
        </div>
      ) : (
        messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))
      )}
    </div>
  );
}