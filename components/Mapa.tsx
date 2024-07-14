"use client";
import React from "react"; // Importa React
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api"; // Importa componentes de Google Maps API

// Define las propiedades que espera recibir el componente
interface MapaProps {
  posicionMarcador: google.maps.LatLng;
  contenidoInfoWindow: {
    nombre: string;
    direccion: string;
  };
}

// Componente para mostrar el mapa con un marcador y una InfoWindow
const Mapa: React.FC<MapaProps> = ({
  posicionMarcador,
  contenidoInfoWindow,
}) => {
  return (
    <div className="flex items-center justify-center mt-8 mx-4 sm:mx-8 lg:mx-auto">
      <div className="w-full sm:w-3/4 lg:w-1/2 h-64">
        <GoogleMap
          mapContainerClassName="w-full h-full" // Clase CSS para el contenedor del mapa
          center={posicionMarcador} // Centro del mapa
          zoom={17} // Nivel de zoom del mapa
        >
          <Marker position={posicionMarcador}>
            <InfoWindow position={posicionMarcador}>
              <div>
                <span className="font-bold">{contenidoInfoWindow.nombre}</span>{" "}
                <br />
                <span>{contenidoInfoWindow.direccion}</span>{" "}
              </div>
            </InfoWindow>
          </Marker>
        </GoogleMap>
      </div>
    </div>
  );
};

export default Mapa;
