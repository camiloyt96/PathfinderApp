// PathfinderApp/src/components/Chat/ChatCard.test.jsx
import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { expect, vi, describe, it, beforeEach, afterEach } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extiende expect con los matchers de @testing-library/jest-dom
expect.extend(matchers);

// Mocks: deben coincidir con las rutas que resuelve ChatCard.jsx
vi.mock('../src/components/hooks/useChat', () => {
  return {
    useChat: vi.fn(),
  };
});

vi.mock('../src/components/hooks/useAutoScroll', () => {
  return {
    useAutoScroll: vi.fn(),
  };
});

// Mocks de componentes hijos (ubicación real bajo src/components/Chat)
vi.mock('../src/components/Chat/ChatHeader', () => {
  return {
    default: () => <div data-testid="mock-header">MockChatHeader</div>,
  };
});

vi.mock('../src/components/Chat/ChatMessageList', () => {
  return {
    default: ({ messages, scrollRef }) => (
      <div data-testid="mock-messages">
        {Array.isArray(messages)
          ? messages.map((m) => (
              <div key={m.id ?? m.key} data-testid="chat-message">
                {m.text}
              </div>
            ))
          : null}
        <div data-testid="mock-scroll-ref">{scrollRef ? 'has-ref' : 'no-ref'}</div>
      </div>
    ),
  };
});

vi.mock('../src/components/Chat/ChatInput', () => {
  return {
    default: ({ onSendMessage }) => (
      <div>
        <button onClick={() => onSendMessage('mensaje de prueba')}>MockSendButton</button>
      </div>
    ),
  };
});

// Importar después de vi.mock para recibir los mocks
import ChatCard from '../src/components/Chat/ChatCard.jsx';
import { useChat } from '../src/components/hooks/useChat';
import { useAutoScroll } from '../src/components/hooks/useAutoScroll';

describe('ChatCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('muestra el estado de carga cuando loading es true', () => {
    useChat.mockReturnValue({
      messages: [],
      loading: true,
      error: null,
      sendMessage: vi.fn(),
    });
    useAutoScroll.mockReturnValue(null);

    render(<ChatCard />);

    expect(screen.getByText('Cargando chat...')).toBeInTheDocument();
  });

  it('muestra el mensaje de error cuando hay un error', () => {
    useChat.mockReturnValue({
      messages: [],
      loading: false,
      error: 'Error de prueba',
      sendMessage: vi.fn(),
    });
    useAutoScroll.mockReturnValue(null);

    render(<ChatCard />);

    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Error de prueba')).toBeInTheDocument();
  });

  it('renderiza mensajes y pasa onSendMessage a ChatInput (invoca sendMessage)', () => {
    const sendMessage = vi.fn();
    useChat.mockReturnValue({
      messages: [{ id: 1, text: 'Hola desde test' }],
      loading: false,
      error: null,
      sendMessage,
    });
    useAutoScroll.mockReturnValue({ current: null });

    render(<ChatCard />);

    expect(screen.getByText('Hola desde test')).toBeInTheDocument();

    fireEvent.click(screen.getByText('MockSendButton'));

    expect(sendMessage).toHaveBeenCalledWith('mensaje de prueba');
  });
});