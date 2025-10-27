import Roll from "roll";
import { useState } from "react";
import { useDiceRollSFX } from "../utils/diceRollSFX";
import EmojiPickerButton from "./EmojiPickerButton";

export default function ChatInput({ onSendMessage, disabled = false }) {
  const [text, setText] = useState("");
  const roll = new Roll();
  const playDiceRoll = useDiceRollSFX();

  const handleSubmit = async (e) => { //Funcion para manejar el envio de mensajes
    e.preventDefault();
    
    if (!text.trim()) return;

    try {
      let messageToSend = text;

      //Validar si es un dice roll command
      const diceResult = handleRoll(text); 

      if (diceResult) {
        playDiceRoll(); //Reproducir el sonido de dado
        messageToSend = `🎲 ${diceResult.notation} = ${diceResult.result}`;
        if (diceResult.details && diceResult.details.length > 0) {
          const diceValues = diceResult.details.join(', ');
          messageToSend += ` [${diceValues}]`;
        }
      }

      await onSendMessage(messageToSend, diceResult); 
      setText(""); // Limpiar después de enviar
    } catch (error) {
      console.error("Error al enviar:", error);
      alert("No se pudo enviar el mensaje");
    }
  };

  const handleEmojiSelect = async (emoji) => {
  if (!emoji || disabled) return;

  try {
    await onSendMessage(emoji, null); // Enviar solo el emoji, sin diceResult
  } catch (error) {
    console.error("Error al enviar emoji:", error);
    alert("No se pudo enviar el emoji");
  }
};


  const handleRoll = (text) => {  //Funcion para manejar los comandos de dados
    try {
      let diceResult = null;

      if (text.trim().startsWith('/roll ')) {
        const diceNotation = text.trim().substring(6); //remueve Roll y deja la notacion del dado

        if (roll.validate(diceNotation)) {
          const rollResult = roll.roll(diceNotation); 

          diceResult = {
            notation: diceNotation,
            result: rollResult.result,  
            details: rollResult.rolled 
          };
        }
      }

      return diceResult;
    } catch (error) {
      console.error("Error al procesar el comando de dado:", error);
      return null;
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
    <EmojiPickerButton 
      onEmojiSelect={handleEmojiSelect}
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