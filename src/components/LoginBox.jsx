export default function LoginBox()  {
    return (
      
         <div className="container-lg mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <div className="card shadow">
                <div className="card-body p-5">
                    <h3 className="card-title text-center fs-1">Bienvenido a PathFinder Society!</h3>
                    <p className="card-text text-center fw-bold fs-2">
                        Porfavor inicia sesion o registrate para continuar.
                    </p>
                    <form>
                        <div className="mb-3 fw-bold">
                            <label htmlFor="email" className="form-label">Correo Electronico</label>
                            <input type="email" className="form-control" id="email" />
                        </div>
                        <div className="mb-3 fw-bold">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" />
                        </div>
                        <button type="submit" className="btn btn-primary w-100 mb-2">Login</button>
                        <button type="submit" className="btn btn-primary w-100">Registrarse</button>
                    </form>
                </div>
            </div>
        </div>
    )
}