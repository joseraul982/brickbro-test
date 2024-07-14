"use client";

import React, { useRef, useState } from "react"; // Importa React y hooks necesarios
import { useRouter } from "next/navigation"; // Hook para manejar la navegación en Next.js
import { LoadScript } from "@react-google-maps/api"; // Componente para cargar scripts de Google Maps
import Buscador from "../components/Buscador"; // Componente de búsqueda
import Header from "@/components/Header"; // Componente de encabezado

const Home: React.FC = () => {
  // Referencia al Autocomplete de Google Maps
  const referenciaAutocomplete = useRef<google.maps.places.Autocomplete | null>(
    null
  );

  // Estado para almacenar el lugar seleccionado
  const [lugarSeleccionado, setLugarSeleccionado] =
    useState<google.maps.places.PlaceResult | null>(null);

  // Hook para manejar la navegación
  const router = useRouter();

  // Función para manejar el cambio de lugar seleccionado
  const manejarCambioLugar = () => {
    if (referenciaAutocomplete.current) {
      const lugar = referenciaAutocomplete.current.getPlace();
      if (!lugar || !lugar.geometry) {
        window.alert("No hay detalles disponibles para el lugar seleccionado."); // Alerta si no hay detalles
        return;
      }
      setLugarSeleccionado(lugar); // Actualiza el estado con el lugar seleccionado

      // Crea un objeto con la nueva búsqueda
      const nuevaBusqueda = {
        nombre: lugar.name || "", // Nombre del lugar
        direccion: lugar.formatted_address || "", // Dirección formateada del lugar
        ubicacion: lugar.geometry.location, // Ubicación (latitud y longitud)
      };

      // Obtiene el historial anterior del localStorage
      const historialAnterior = JSON.parse(
        localStorage.getItem("historialBusquedas") || "[]"
      );
      // Actualiza el localStorage con la nueva búsqueda
      localStorage.setItem(
        "historialBusquedas",
        JSON.stringify([nuevaBusqueda, ...historialAnterior])
      );

      router.push("/mapa"); // Navega a la página de mapa
    }
  };

  // Función para manejar la búsqueda invocando el manejo de cambio de lugar
  const manejarBusqueda = () => {
    if (referenciaAutocomplete.current) {
      manejarCambioLugar(); // Llama a la función para manejar el cambio de lugar
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""} // Clave API de Google Maps desde variables de entorno
      libraries={["places"]} // Especifica las bibliotecas necesarias
    >
      <Header />
      <div className="flex justify-center mt-4">
        <Buscador
          referenciaAutocomplete={referenciaAutocomplete} // Pasa la referencia al componente de búsqueda
          manejarBusqueda={manejarBusqueda} // Pasa la función para manejar la búsqueda
        />
      </div>
    </LoadScript>
  );
};

export default Home; // Exporta el componente Home
