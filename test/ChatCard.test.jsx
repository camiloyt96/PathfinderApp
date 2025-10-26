import React from 'react';
import { expect, vi, describe, it, beforeEach, afterEach } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';

// Mocks: firebase and firestore
vi.mock('../src/firebase', () => ({
  auth: { currentUser: { displayName: 'TestUser', email: 'test@example.com' } },
  db: {},
}));

vi.mock('firebase/firestore', () => {
  let _snapshot = { docs: [] };
  const collection = vi.fn((db, name) => ({ _col: name }));
  const query = vi.fn(() => ({}));
  const orderBy = vi.fn(() => ({}));
  const onSnapshot = vi.fn((q, next) => {
    // call next synchronously with current snapshot
    next(_snapshot);
    return () => {};
  });
  const addDoc = vi.fn(() => Promise.resolve({}));
  const serverTimestamp = vi.fn(() => ({}));

  const __setSnapshot = (data) => { _snapshot = data; };

  return { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, __setSnapshot };
});

import ChatCard from '../src/components/ChatCard.jsx';
import { __setSnapshot, addDoc } from 'firebase/firestore';

// extend expect
expect.extend(matchers);

describe('ChatCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('muestra mensaje cuando no hay mensajes', async () => {
    __setSnapshot({ docs: [] });
    render(<ChatCard />);
    expect(await screen.findByText('No hay mensajes aún')).toBeInTheDocument();
  });

  it('renderiza mensajes desde firestore', async () => {
    const now = new Date();
    __setSnapshot({ docs: [
      { id: '1', data: () => ({ text: 'Hola', user: 'OtherUser', createdAt: now }) },
      { id: '2', data: () => ({ text: 'Mi mensaje', user: 'TestUser', createdAt: now }) },
    ] });

    render(<ChatCard />);

    expect(await screen.findByText('Hola')).toBeInTheDocument();
    expect(screen.getByText('Mi mensaje')).toBeInTheDocument();
    // user names shown
    expect(screen.getByText('OtherUser')).toBeInTheDocument();
    expect(screen.getByText('TestUser')).toBeInTheDocument();
  });

  it('envia un mensaje y limpia el input', async () => {
    __setSnapshot({ docs: [] });
    render(<ChatCard />);

    const input = screen.getByPlaceholderText('Escribe un mensaje...');
    const button = screen.getByText('Enviar');

    fireEvent.change(input, { target: { value: 'mensaje de prueba' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(addDoc).toHaveBeenCalled();
    });

    expect(input.value).toBe('');
  });
});
