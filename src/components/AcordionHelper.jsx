import React from "react";

export default function AcordionHelper() {
  return (
    <div className="accordion mt-2" id="accordionExample">
      <div className="accordion-item bg-dark">
        <h2 className="accordion-header">
          <button
            className="accordion-button bg-dark text-white fs-4"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            ¿Cómo lanzar Dados?
          </button>
        </h2>
        <div
          id="collapseOne"
          className="accordion-collapse collapse show"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body text-white fs-4">
            <p>
              Para lanzar dados escribe /roll [número de dados]d[número de caras]
            </p>
            <p className="mb-0">
              <strong>Ejemplo:</strong> /roll 2d6
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}