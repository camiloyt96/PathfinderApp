// RegisterBox.jsx
import React, { useState } from 'react';
import { auth } from '../firebase.js'; // Import the 'auth' instance from your config
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import the registration function
import {useNavigate} from 'react-router-dom';

export default function RegisterBox() {
    const [username, setUsername] = useState(''); // State for username (optional for Firebase Auth, but good for display name later)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        setError(''); // Clear previous errors
        setSuccessMessage(''); // Clear previous success messages

        // Basic validation
        if (!email || !password || !confirmPassword) {
            setError('Todos los campos son obligatorios.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }
        if (password.length < 6) { // Firebase requires at least 6 characters for password
            setError('La contraseña debe tener al menos 6 caracteres.');
            return;
        }

        try {
            //Crea usuario en firebase
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            

            console.log('Usuario registrado con éxito:', user);
            setSuccessMessage('¡Registro exitoso! Ya puedes iniciar sesión.');
            // Optionally clear the form or redirect
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');

            const success = true;

            if (success) {
                setTimeout(() => {
                navigate('/login'); // Redirect to login page after successful registration    
                }, 2000);
                
            }



        } catch (firebaseError) {
            console.error('Error al registrar el usuario:', firebaseError.message);
            // Display a user-friendly error message based on Firebase error codes
            switch (firebaseError.code) {
                case 'auth/email-already-in-use':
                    setError('Este correo electrónico ya está registrado.');
                    break;
                case 'auth/invalid-email':
                    setError('El formato del correo electrónico no es válido.');
                    break;
                case 'auth/weak-password':
                    setError('La contraseña es demasiado débil.');
                    break;
                default:
                    setError('Ocurrió un error durante el registro. Inténtalo de nuevo.');
            }
        }
    };

    return (
        <div className="container-lg mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <div className="card shadow bg-dark text-white mt-5">
                <div className="card-body p-5">
                    <h3 className="card-title text-center fs-2">Bienvenido a PathFinder Society!</h3>
                    <p className="card-text text-center fw-bold fs-4">
                        Registra tu nueva cuenta para entrar<br></br> en el Mundo de PathFinder!.
                    </p>
                    <form onSubmit={handleRegister}> {/* Attach the handler to the form's onSubmit */}
                        <div className="mb-3 fw-bold fs-2">
                            <label htmlFor="username" className="form-label">Nombre de Usuario</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username" // Changed ID to username
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-3 fw-bold fs-3">
                            <label htmlFor="email" className="form-label">Correo Electronico</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3 fw-bold fs-2">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-3 fw-bold fs-2">
                            <label htmlFor="confirmPassword" className="form-label">Repite Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirmPassword" // Changed ID for clarity
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        {/* Display error or success messages */}
                        {error && <div className="alert alert-danger" role="alert">{error}</div>}
                        {successMessage && <div className="alert alert-success" role="alert">{successMessage}</div>}

                        {/* Changed the first button to type="button" as it seems to be for navigation */}
                        
                        {/* This button will now trigger the handleRegister function */}
                        <button type="submit" className="btn btn-primary w-100">Registrarse</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
