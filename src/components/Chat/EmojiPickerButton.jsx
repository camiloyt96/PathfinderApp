import { useState, useRef, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';

export default function EmojiPickerButton({ onEmojiSelect, disabled }) {
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowPicker(false);
      }
    };

    if (showPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPicker]);

  const handleEmojiClick = (emojiObject) => {
    if (onEmojiSelect) {
      onEmojiSelect(emojiObject.emoji);
    }
    setShowPicker(false);
  };

  // Calcular ancho responsive
  const getPickerWidth = () => {
    const width = window.innerWidth;
    if (width < 576) return Math.min(width - 32, 300); // Mobile: ancho casi completo con padding
    return 320; // Desktop
  };

  const getPickerHeight = () => {
    const width = window.innerWidth;
    if (width < 576) return 350;
    return 400;
  };

  return (
    <div className="position-relative">
      <button
        ref={buttonRef}
        onClick={() => setShowPicker(!showPicker)}
        className="btn btn-primary"
        type="button"
        disabled={disabled}
      >
        Emoji
      </button>

      {showPicker && (
        <div
          ref={pickerRef}
          className="position-absolute shadow-lg rounded"
          style={{
            top: '100%',
            right: 0, // Alineado a la derecha para que no se salga
            zIndex: 1050,
            marginTop: '8px'
          }}
        >
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            autoFocusSearch={false}
            width={getPickerWidth()}
            height={getPickerHeight()}
            previewConfig={{
              showPreview: false
            }}
            searchPlaceHolder="Buscar..."
          />
        </div>
      )}
    </div>  
  );
}