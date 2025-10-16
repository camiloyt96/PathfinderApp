import React from 'react';
import { expect, vi, describe, it, beforeEach } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegisterBox from './RegisterBox';

// Extiende expect con los matchers de @testing-library/jest-dom (para Vitest)
expect.extend(matchers);

// Mock de Firebase
vi.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: vi.fn(),
  getAuth: vi.fn(() => ({})),
}));
vi.mock('firebase/analytics', () => ({
  getAnalytics: () => ({})
}));

import { createUserWithEmailAndPassword } from 'firebase/auth';

describe('RegisterBox', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('muestra mensaje de éxito cuando el registro es correcto', async () => {
    // Simula respuesta exitosa de Firebase
    createUserWithEmailAndPassword.mockResolvedValue({
      user: { email: 'test@email.com', uid: '123' }
    });

    render(<RegisterBox />);
    fireEvent.change(screen.getByLabelText('Nombre de Usuario'), { target: { value: 'TestUser' } });
    fireEvent.change(screen.getByLabelText('Correo Electronico'), { target: { value: 'test@email.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: '123456' } });
    fireEvent.change(screen.getByLabelText('Repite Password'), { target: { value: '123456' } });

    fireEvent.click(screen.getByText('Registrarse'));

    await waitFor(() => {
      expect(screen.getByText('¡Registro exitoso! Ya puedes iniciar sesión.')).toBeInTheDocument();
    });

    // Verifica que se llamó la función de Firebase
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(expect.anything(), 'test@email.com', '123456');
  });
});