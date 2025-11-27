export default function CatalogFilter() {
    return (
        <div>
            <aside className="card mb-4">
                        <div className="card-header">
                        <h5>Filtros</h5>
                        </div>
                        <div className="card-body">
                        {/* Categorías */}
                        <div className="mb-4">
                            <h6>Categoría</h6>
                            <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="cat1"/>
                            <label className="form-check-label">Electrónica</label>
                            </div>
                        </div>

                        {/* Rango precio */}
                        <div className="mb-4">
                            <h6>Precio</h6>
                            <input type="range" className="form-range" min="0" max="100000"/>
                            <div className="d-flex justify-content-between">
                            <small>$0</small>
                            <small>$100.000</small>
                            </div>
                        </div>

                        {/* Disponibilidad */}
                        <div className="form-check form-switch">
                            <input type="checkbox" className="form-check-input" id="stock"/>
                            <label className="form-check-label">Solo disponibles</label>
                        </div>

                        <button className="btn btn-primary w-100 mt-3">Aplicar</button>
                        <button className="btn btn-outline-secondary w-100 mt-2">Limpiar</button>
                        </div>
                    </aside>
        </div>
    );      
}