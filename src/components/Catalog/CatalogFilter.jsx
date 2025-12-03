import { useState, useEffect } from 'react';

export default function CatalogFilter({ categories, maxPrice, filters, onFilterChange, onClearFilters }) {
    const [localFilters, setLocalFilters] = useState(filters);
    const [priceValue, setPriceValue] = useState(filters.maxPrice);

    // Sincronizar con los filtros externos
    useEffect(() => {
        setLocalFilters(filters);
        setPriceValue(filters.maxPrice);
    }, [filters]);

    // Manejar cambio de categoría
    const handleCategoryChange = (category) => {
        const updatedCategories = localFilters.categories.includes(category)
            ? localFilters.categories.filter(c => c !== category)
            : [...localFilters.categories, category];
        
        const newFilters = { ...localFilters, categories: updatedCategories };
        setLocalFilters(newFilters);
        onFilterChange(newFilters);
    };

    // Manejar cambio de precio
    const handlePriceChange = (e) => {
        const newPrice = parseFloat(e.target.value);
        setPriceValue(newPrice);
        const newFilters = { ...localFilters, maxPrice: newPrice };
        setLocalFilters(newFilters);
        onFilterChange(newFilters);
    };

    // Manejar cambio de disponibilidad
    const handleAvailabilityChange = (e) => {
        const newFilters = { ...localFilters, onlyAvailable: e.target.checked };
        setLocalFilters(newFilters);
        onFilterChange(newFilters);
    };

    // Limpiar filtros
    const handleClear = () => {
        onClearFilters();
    };

    return (
        <div>
            <aside className="card mb-4 card-Filter text-white">
                <div className="card-header">
                    <h5>Filtros</h5>
                </div>
                <div className="card-body">
                    {/* Categorías */}
                    <div className="mb-4">
                        <h6>Categoría</h6>
                        {categories.map((category, index) => (
                            <div key={index} className="form-check">
                                <input 
                                    type="checkbox" 
                                    className="form-check-input" 
                                    id={`cat-${index}`}
                                    checked={localFilters.categories.includes(category)}
                                    onChange={() => handleCategoryChange(category)}
                                />
                                <label className="form-check-label" htmlFor={`cat-${index}`}>
                                    {category}
                                </label>
                            </div>
                        ))}
                    </div>

                    {/* Rango precio */}
                    <div className="mb-4">
                        <h6>Precio Máximo</h6>
                        <input 
                            type="range" 
                            className="form-range" 
                            min="0" 
                            max={maxPrice}
                            value={priceValue}
                            onChange={handlePriceChange}
                        />
                        <div className="d-flex justify-content-between">
                            <small>$0</small>
                            <small className="text-primary fw-bold">${priceValue.toFixed(2)}</small>
                            <small>${maxPrice.toFixed(0)}</small>
                        </div>
                    </div>

                    {/* Disponibilidad */}
                    <div className="form-check form-switch mb-3">
                        <input 
                            type="checkbox" 
                            className="form-check-input" 
                            id="stock"
                            checked={localFilters.onlyAvailable}
                            onChange={handleAvailabilityChange}
                        />
                        <label className="form-check-label" htmlFor="stock">
                            Solo disponibles
                        </label>
                    </div>

                    <button 
                        className="btn btn-outline-secondary w-100 mt-2"
                        onClick={handleClear}
                    >
                        Limpiar filtros
                    </button>
                </div>
            </aside>
        </div>
    );      
}