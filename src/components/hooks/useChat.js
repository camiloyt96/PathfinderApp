import { useState, useEffect } from "react";
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  serverTimestamp 
} from "firebase/firestore";
import { db } from "../../firebase";
import { getCurrentUser } from "../utils/chatUtils";

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const msgs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(msgs);
        setLoading(false);
      },
      (err) => {
        console.error("Error al escuchar mensajes:", err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const user = getCurrentUser();

    try {
      await addDoc(collection(db, "messages"), {
        text: text.trim(),
        user,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.error("Error al enviar mensaje:", err);
      throw err;
    }
  };

  return { messages, loading, error, sendMessage };
}