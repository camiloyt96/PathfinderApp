import { useState, useEffect } from 'react';
import CatalogCard from "../components/Catalog/CatalogCard";
import CatalogFilter from "../components/Catalog/CatalogFilter";
import Navbar from "../components/Navbar";

export default function CatalogPage() {
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Estados de filtros
    const [filters, setFilters] = useState({
        categories: [],
        maxPrice: 50,
        onlyAvailable: false
    });

    // Estados de paginación
    const [currentPage, setCurrentPage] = useState(0);
    const productsPerPage = 9;

    // Cargar todos los productos
    useEffect(() => {
        fetch('http://52.203.213.140:8080/api/productos')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                return response.json();
            })
            .then(data => {
                setAllProducts(data);
                setFilteredProducts(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    // Aplicar filtros cuando cambien
    useEffect(() => {
        let result = [...allProducts];

        // Filtrar por categoría
        if (filters.categories.length > 0) {
            result = result.filter(product => 
                filters.categories.includes(product.categoriaNombre)
            );
        }

        // Filtrar por precio
        result = result.filter(product => product.precio <= filters.maxPrice);

        // Filtrar por disponibilidad
        if (filters.onlyAvailable) {
            result = result.filter(product => product.stock > 0);
        }

        setFilteredProducts(result);
        setCurrentPage(0); // Resetear a la primera página cuando se filtran
    }, [filters, allProducts]);

    // Manejar cambios en los filtros
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    // Limpiar filtros
    const handleClearFilters = () => {
        setFilters({
            categories: [],
            maxPrice: 50,
            onlyAvailable: false
        });
    };

    // Paginación
    const indexOfLastProduct = (currentPage + 1) * productsPerPage;
    const indexOfFirstProduct = currentPage * productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const renderPagination = () => {
        const pages = [];
        const maxPagesToShow = 5;
        
        let startPage = Math.max(0, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = Math.min(totalPages - 1, startPage + maxPagesToShow - 1);
        
        if (endPage - startPage < maxPagesToShow - 1) {
            startPage = Math.max(0, endPage - maxPagesToShow + 1);
        }

        pages.push(
            <li key="prev" className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                <button 
                    className="page-link" 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                >
                    Anterior
                </button>
            </li>
        );

        if (startPage > 0) {
            pages.push(
                <li key={0} className="page-item">
                    <button className="page-link" onClick={() => handlePageChange(0)}>1</button>
                </li>
            );
            if (startPage > 1) {
                pages.push(
                    <li key="dots1" className="page-item disabled">
                        <span className="page-link">...</span>
                    </li>
                );
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(i)}>
                        {i + 1}
                    </button>
                </li>
            );
        }

        if (endPage < totalPages - 1) {
            if (endPage < totalPages - 2) {
                pages.push(
                    <li key="dots2" className="page-item disabled">
                        <span className="page-link">...</span>
                    </li>
                );
            }
            pages.push(
                <li key={totalPages - 1} className="page-item">
                    <button className="page-link" onClick={() => handlePageChange(totalPages - 1)}>
                        {totalPages}
                    </button>
                </li>
            );
        }

        pages.push(
            <li key="next" className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
                <button 
                    className="page-link" 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages - 1}
                >
                    Siguiente
                </button>
            </li>
        );

        return pages;
    };

    if (loading) {
        return (
            <div>
                <Navbar />
                <div className="container mt-5">
                    <div className="text-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-2">Cargando productos...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <Navbar />
                <div className="container mt-5">
                    <div className="alert alert-danger" role="alert">
                        <h4 className="alert-heading">Error al cargar los productos</h4>
                        <p>{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    // Obtener categorías únicas
    const uniqueCategories = [...new Set(allProducts.map(p => p.categoriaNombre))];
    
    // Obtener precio máximo
    const maxProductPrice = Math.max(...allProducts.map(p => p.precio), 50);

    return (
        <div>
            <Navbar />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 mt-4">
                        <CatalogFilter 
                            categories={uniqueCategories}
                            maxPrice={maxProductPrice}
                            filters={filters}
                            onFilterChange={handleFilterChange}
                            onClearFilters={handleClearFilters}
                        />
                    </div>

                    <div className="col-md-9 mb-4">
                        {/* Info de resultados */}
                        <div className="row mt-4 mb-3">
                            <div className="col-12">
                                <p className="text-muted">
                                    Mostrando {filteredProducts.length > 0 ? indexOfFirstProduct + 1 : 0} - {Math.min(indexOfLastProduct, filteredProducts.length)} de {filteredProducts.length} productos
                                </p>
                            </div>
                        </div>

                        {/* Grid de productos */}
                        <div className="row">
                            {currentProducts.length > 0 ? (
                                currentProducts.map(product => (
                                    <div key={product.id} className="col-md-4 mb-4">
                                        <CatalogCard product={product} />
                                    </div>
                                ))
                            ) : (
                                <div className="col-12">
                                    <div className="alert alert-info" role="alert">
                                        No se encontraron productos con los filtros seleccionados
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Paginación */}
                        {totalPages > 1 && (
                            <div className="row mt-4">
                                <div className="col-12">
                                    <nav aria-label="Product pagination">
                                        <ul className="pagination justify-content-center">
                                            {renderPagination()}
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}