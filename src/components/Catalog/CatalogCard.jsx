export default function CatalogCard({ product }) {
    return (
        <div className="card h-100 card-Filter text-white">
            <img 
                src={product.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'} 
                alt={product.nombre} 
                className='card-img-top' 
                style={{ objectFit: 'cover', height: '200px' }}
            />
            <div className="card-body d-flex flex-column">
                <span className="badge bg-secondary mb-2 align-self-start">
                    {product.categoriaNombre}
                </span>
                <h5 className="card-title">{product.nombre}</h5>
                <p className="card-text text-muted small">{product.marcaNombre}</p>
                <p className="card-text flex-grow-1">{product.descripcion}</p>
                <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <p className="h5 mb-0 text-primary">${product.precio.toFixed(2)}</p>
                        <p className="mb-0 text-muted small">Stock: {product.stock}</p>
                    </div>
                    <button className="btn btn-primary w-100">Add to Cart</button>
                </div>
            </div>
        </div>
    );
}