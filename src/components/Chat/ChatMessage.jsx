import { formatTime, isCurrentUser } from "../utils/chatUtils";

export default function ChatMessage({ message }) {
  const isCurrent = isCurrentUser(message.user);

  return (
    <div className={`mb-3 ${isCurrent ? 'text-end' : 'text-start'}`}>
      {/* Username */}
      <div className="small fw-semibold text-secondary mb-1 px-2">
        {message.user}
      </div>

      {/* Message bubble */}
      <div
        className={`p-2 rounded d-inline-block ${
          isCurrent 
            ? 'bg-primary text-white' 
            : 'bg-light text-dark'
        }`}
        style={{ maxWidth: '70%' }}
      >
        {message.text}
      </div>

      {/* Timestamp */}
      <span className="small text-white mt-1 px-2">
        {formatTime(message.createdAt)}
      </span>
    </div>
  );
}