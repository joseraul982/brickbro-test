"use client";

import React, { useRef, useState, useEffect } from "react"; // Importa React y hooks necesarios
import { useLoadScript, Libraries } from "@react-google-maps/api"; // Importa funciones de Google Maps API
import Buscador from "../../components/Buscador"; // Componente de búsqueda
import Mapa from "../../components/Mapa"; // Componente del mapa
import HistorialBusquedas from "../../components/HistorialBusquedas"; // Componente del historial de búsquedas
import Header from "@/components/Header"; // Componente de encabezado

const MiComponenteMapa: React.FC = () => {
  // Carga los scripts de Google Maps
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "", // Clave API desde variables de entorno
    libraries: ["places"] as Libraries, // Especifica las bibliotecas necesarias
  });

  // Estados para manejar la posición del marcador, contenido de la infoWindow, historial de búsquedas y su visibilidad
  const [posicionMarcador, setPosicionMarcador] =
    useState<google.maps.LatLng | null>(null);
  const [contenidoInfoWindow, setContenidoInfoWindow] = useState({
    nombre: "",
    direccion: "",
  });
  const [historialBusquedas, setHistorialBusquedas] = useState<
    {
      nombre: string;
      direccion: string;
      ubicacion: { lat: number; lng: number };
    }[]
  >([]);
  const [mostrarHistorialBusquedas, setMostrarHistorialBusquedas] =
    useState(false);

  // Referencia para el Autocomplete de Google Maps
  const referenciaAutocomplete = useRef<google.maps.places.Autocomplete | null>(
    null
  );

  // useEffect para cargar el historial de búsquedas desde localStorage cuando el script de Google Maps esté cargado
  useEffect(() => {
    if (isLoaded) {
      const historialGuardado = JSON.parse(
        localStorage.getItem("historialBusquedas") || "[]"
      );
      setHistorialBusquedas(historialGuardado);
      if (historialGuardado.length > 0) {
        setMostrarHistorialBusquedas(true);

        const ultimaBusqueda = historialGuardado[0];
        if (ultimaBusqueda && ultimaBusqueda.ubicacion) {
          const ubicacion = new google.maps.LatLng(
            ultimaBusqueda.ubicacion.lat,
            ultimaBusqueda.ubicacion.lng
          );
          setPosicionMarcador(ubicacion);
          setContenidoInfoWindow({
            nombre: ultimaBusqueda.nombre,
            direccion: ultimaBusqueda.direccion,
          });
        }
      }
    }
  }, [isLoaded]);

  // Función para manejar el cambio de lugar seleccionado
  const manejarCambioLugar = () => {
    if (referenciaAutocomplete.current) {
      const lugar = referenciaAutocomplete.current.getPlace();
      if (!lugar || !lugar.geometry) {
        window.alert("No hay detalles disponibles para el lugar seleccionado.");
        return;
      }

      const ubicacion = lugar.geometry.location;
      if (ubicacion) {
        setPosicionMarcador(ubicacion);
        const nuevaInfo = {
          nombre: lugar.name || "",
          direccion: lugar.formatted_address || "",
        };
        setContenidoInfoWindow(nuevaInfo);
        setHistorialBusquedas((historialAnterior) => [
          {
            ...nuevaInfo,
            ubicacion: { lat: ubicacion.lat(), lng: ubicacion.lng() },
          },
          ...historialAnterior,
        ]);
        setMostrarHistorialBusquedas(true);

        const nuevaBusqueda = {
          nombre: lugar.name || "",
          direccion: lugar.formatted_address || "",
          ubicacion: { lat: ubicacion.lat(), lng: ubicacion.lng() },
        };
        const historialAnterior = JSON.parse(
          localStorage.getItem("historialBusquedas") || "[]"
        );
        localStorage.setItem(
          "historialBusquedas",
          JSON.stringify([nuevaBusqueda, ...historialAnterior])
        );
      } else {
        window.alert("No hay ubicación disponible para el lugar seleccionado.");
      }
    }
  };

  // Función para manejar la búsqueda invocando el manejo de cambio de lugar
  const manejarBusqueda = () => {
    if (referenciaAutocomplete.current) {
      manejarCambioLugar(); // Llama a la función para manejar el cambio de lugar
    }
  };

  // Manejo de errores en la carga del script de Google Maps
  if (loadError) {
    return <div>Error al cargar Google Maps</div>;
  }

  // Muestra un mensaje de carga mientras se carga el script de Google Maps
  if (!isLoaded) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <Header />
      <div className="flex justify-center mt-4">
        <Buscador
          referenciaAutocomplete={referenciaAutocomplete} // Pasa la referencia al componente de búsqueda
          manejarBusqueda={manejarBusqueda} // Pasa la función para manejar la búsqueda
        />
      </div>
      {posicionMarcador && (
        <Mapa
          posicionMarcador={posicionMarcador} // Pasa la posición del marcador al componente del mapa
          contenidoInfoWindow={contenidoInfoWindow} // Pasa el contenido de la infoWindow al componente del mapa
        />
      )}
      {mostrarHistorialBusquedas && (
        <div className="overflow-y-auto h-96 mt-4 mx-4 sm:mx-8 lg:mx-auto">
          <HistorialBusquedas historialBusquedas={historialBusquedas} />
        </div>
      )}
    </>
  );
};

export default MiComponenteMapa;
