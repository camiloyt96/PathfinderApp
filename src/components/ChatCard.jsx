import { useState, useEffect, useRef } from "react";
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase"; // asegúrate de tener esta importación correcta

export default function ChatCard() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState(""); // Contenido del Input
  const listRef = useRef(null);

  useEffect(() => {
    // Consulta para leer mensajes
    const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));

    // onSnapshot para escuchar cambios en tiempo real
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const msgs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(msgs);

        // Desplazarse al último mensaje
        setTimeout(() => {
          if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
          }
        }, 50);
      },
      (error) => {
        console.log("Error al escuchar mensajes: ", error);
      }
    );

    // Cleanup al desmontar
    return () => unsubscribe();
  }, []);

  //Enviar mensaje 
  const handleSendMessage = async (e) => {
    e.preventDefault();
    const user = auth.currentUser?.displayName || auth.currentUser?.email || "Anonimo";

    if (!text.trim()) return; // No enviar mensajes vacíos
    try {
        await addDoc(collection(db, "messages"), {
            text: text.trim(),
            user,
            createdAt: serverTimestamp(),
        });
        setText(""); // Limpiar el input    
    } catch (error) {
        console.error("Error al enviar mensaje: ", error);
    }
    };

    return (
    <div className="container-lg d-flex justify-content-end">
      <div className="card card-details shadow-sm" style={{ width: "400px" }}>
        <div className="card-header bg-primary text-white fs-3 fw-semibold">
          Chat
        </div>

        <div
          className="card-body overflow-auto"
          ref={listRef}
          style={{ maxHeight: "400px" }}
        >
          {messages.length === 0 ? (
            <div className="text-muted text-center">No hay mensajes aún</div>
          ) : (
            messages.map(msg => (
              <div key={msg.id} className={`mb-2 ${msg.user === (auth.currentUser?.displayName || auth.currentUser?.email) ? 'text-end' : 'text-start'}`}>
                <small className="text-muted">{msg.user}</small>
                <div className={`p-2 rounded ${msg.user === (auth.currentUser?.displayName || auth.currentUser?.email) ? 'bg-primary text-white d-inline-block' : 'bg-light d-inline-block'}`}>
                  {msg.text}
                </div>
              </div>
            ))
          )}
        </div>

        <form className="card-footer d-flex" onSubmit={handleSendMessage}>
          <input
            type="text"
            className="form-control me-2"
            placeholder="Escribe un mensaje..."
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">Enviar</button>
        </form>
      </div>
    </div>
  );
}