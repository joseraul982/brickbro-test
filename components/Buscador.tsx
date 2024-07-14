"use client";

import React, { MutableRefObject } from "react"; // Importa React y el tipo MutableRefObject
import { Autocomplete } from "@react-google-maps/api"; // Importa el componente Autocomplete de Google Maps API

interface BuscadorProps {
  referenciaAutocomplete: MutableRefObject<google.maps.places.Autocomplete | null>;
  manejarBusqueda: () => void;
}

// Componente de búsqueda
const Buscador: React.FC<BuscadorProps> = ({
  referenciaAutocomplete,
  manejarBusqueda,
}) => {
  return (
    <div className="w-full flex justify-center">
      <Autocomplete
        onLoad={
          (autocomplete) => (referenciaAutocomplete.current = autocomplete) // Asigna la instancia de Autocomplete a la referencia
        }
      >
        <input
          type="text"
          placeholder="🔍 Search..."
          className="w-full p-2 border-2 border-gray-300 rounded-l-xl text-center"
        />
      </Autocomplete>
      <button
        onClick={manejarBusqueda} // Llama a la función manejarBusqueda al hacer clic
        className="bg-blue-600 text-white px-4 py-2 border-2 border-blue-600 rounded-r-xl hover:bg-blue-700"
      >
        Search
      </button>
    </div>
  );
};

export default Buscador; // Exporta el componente Buscador
