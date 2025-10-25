import { auth } from "../../firebase";

export const formatTime = (timestamp) => {
  if (!timestamp) return "";

  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
};

export const getCurrentUser = () => {
  return auth.currentUser?.displayName || auth.currentUser?.email || "Anonimo";
};

export const isCurrentUser = (messageUser) => {
  const currentUser = auth.currentUser?.displayName || auth.currentUser?.email;
  return messageUser === currentUser;
};