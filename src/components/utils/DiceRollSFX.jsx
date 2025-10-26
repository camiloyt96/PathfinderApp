import { useEffect, useRef } from "react";
import diceSound from '../../assets/sounds/DiceRoll.wav';

  


export function useDiceRollSFX() {
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(diceSound);
    audioRef.current.volume = 0.5;
  }, []);

  const playDiceRoll = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => {
        console.error('Error al reproducir sonido:', error);
      });
    }
  };

  return playDiceRoll;
}