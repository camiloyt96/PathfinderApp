export default function RegisterBox()  {
    return (
      
         <div className="container-lg mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <div className="card shadow">
                <div className="card-body p-5">
                    <h3 className="card-title text-center fs-1">Bienvenido a PathFinder Society!</h3>
                    <p className="card-text text-center fw-bold fs-4">
                        Registra tu nueva cuenta para entrar<br></br> en el Mundo de PathFinder!.
                    </p>
                    <form>
                        <div className="mb-3 fw-bold fs-3">
                            <label htmlFor="email" className="form-label">Nombre de Usuario</label>
                            <input type="email" className="form-control" id="text" />
                        </div>
                        <div className="mb-3 fw-bold fs-3">
                            <label htmlFor="email" className="form-label">Correo Electronico</label>
                            <input type="email" className="form-control" id="email" />
                        </div>
                        <div className="mb-3 fw-bold fs-2">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" />
                        </div>
                         <div className="mb-3 fw-bold fs-2">
                            <label htmlFor="password" className="form-label">Repite Password</label>
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