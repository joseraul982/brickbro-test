import React from "react"; // Importa React

// Define las propiedades que espera recibir el componente
interface HistorialBusquedasProps {
  historialBusquedas: { nombre: string; direccion: string }[];
}

// Componente para mostrar el historial de búsquedas
const HistorialBusquedas: React.FC<HistorialBusquedasProps> = ({
  historialBusquedas = [],
}) => {
  return (
    <div className="flex items-center justify-center mt-8 mx-4 sm:mx-8 lg:mx-auto">
      <div className="w-full sm:w-3/4 lg:w-1/2 p-6 bg-gray-100 shadow-md rounded-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-500">
          Search history
        </h2>
        <ul className="divide-y divide-gray-200">
          {historialBusquedas.map((item, index) => (
            <li key={index} className="py-3">
              <div className="flex-col lg:flex-row justify-between items-start lg:items-center">
                <span className="font-semibold text-black mr-2">
                  {item.nombre}:
                </span>
                <span className="text-gray-600">{item.direccion}</span>{" "}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HistorialBusquedas;
