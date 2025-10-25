import { useChat } from "../hooks/useChat";
import { useAutoScroll } from "../hooks/useAutoScroll";
import ChatHeader from "./ChatHeader";
import ChatMessageList from "./ChatMessageList";
import ChatInput from "./ChatInput";

export default function ChatCard() {
  const { messages, loading, error, sendMessage } = useChat();
  const scrollRef = useAutoScroll(messages);

  if (loading) {
    return (
      <div className="container-lg d-flex justify-content-end">
        <div className="card shadow-sm" style={{ width: "400px" }}>
          <div className="card-body text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-3 mb-0 text-muted">Cargando chat...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-lg d-flex justify-content-end">
        <div className="alert alert-danger" style={{ width: "400px", minHeight: "800px" }}>
          <h5 className="alert-heading">Error</h5>
          <p className="mb-0">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-lg d-flex justify-content-end">
      <div className="card card-details shadow-sm" style={{ width: "400px" }}>
        <ChatHeader />
        <ChatMessageList messages={messages} scrollRef={scrollRef} />
        <ChatInput onSendMessage={sendMessage} />
      </div>
    </div>
  );
}