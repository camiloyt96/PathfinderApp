import React from 'react';
import { expect, vi, describe, it, beforeEach, afterEach } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import RegisterBox from '../src/components/RegisterBox.jsx';

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

  // Limpia el DOM entre tests para evitar que los renders se acumulen
  afterEach(() => {
    cleanup();
  });

  it('renderiza el título y subtítulo correctamente', () => {
    render(<RegisterBox />);
    // Comprueba el título principal y parte del subtítulo tal como está en el componente
    expect(screen.getByText('Bienvenido a PathFinder Society!')).toBeInTheDocument();
    expect(screen.getByText(/Registra tu nueva cuenta/)).toBeInTheDocument();
  });

  it('muestra validación cuando faltan campos', async () => {
    render(<RegisterBox />);
    // No rellenamos nada y pulsamos Registrarse
    fireEvent.click(screen.getByText('Registrarse'));

    await waitFor(() => {
      expect(screen.getByText('Todos los campos son obligatorios.')).toBeInTheDocument();
    });
  });

  it('muestra error cuando las contraseñas no coinciden', async () => {
    render(<RegisterBox />);
    fireEvent.change(screen.getByLabelText('Nombre de Usuario'), { target: { value: 'TestUser' } });
    fireEvent.change(screen.getByLabelText('Correo Electronico'), { target: { value: 'test@email.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: '123456' } });
    fireEvent.change(screen.getByLabelText('Repite Password'), { target: { value: '654321' } });

    fireEvent.click(screen.getByText('Registrarse'));

    await waitFor(() => {
      expect(screen.getByText('Las contraseñas no coinciden.')).toBeInTheDocument();
    });
  });

  it('muestra error cuando la contraseña es demasiado corta', async () => {
    render(<RegisterBox />);
    fireEvent.change(screen.getByLabelText('Nombre de Usuario'), { target: { value: 'TestUser' } });
    fireEvent.change(screen.getByLabelText('Correo Electronico'), { target: { value: 'test@email.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: '123' } });
    fireEvent.change(screen.getByLabelText('Repite Password'), { target: { value: '123' } });

    fireEvent.click(screen.getByText('Registrarse'));

    await waitFor(() => {
      expect(screen.getByText('La contraseña debe tener al menos 6 caracteres.')).toBeInTheDocument();
    });
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