# Brickbro Frontend Test

Esta es una pequeña aplicación web desarrollada para el Brickbro Frontend Test. La aplicación permite a los usuarios ingresar una dirección, geolocalizarla y mostrarla en un mapa utilizando la API de Google Maps. Además, se registra y muestra el historial de búsquedas realizadas . Al realizar una búsqueda en la pagina principal, el usuario es redirigido a una página secundaria donde se muestran el mapa y el historial de búsquedas.

## Tecnologías Utilizadas

- Next.js
- TypeScript
- Google Maps API(https://developers.google.com/maps/documentation/javascript)

## Instrucciones para Ejecutar el Proyecto

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/brickbro-frontend-test.git
   cd brickbro-frontend-test
   ```

## Tecnologías Utilizadas

- Next.js
- TypeScript
- Google Maps API

## Instrucciones para Ejecutar el Proyecto

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/brickbro-frontend-test.git
   cd brickbro-frontend-test
   ```

2. Instala las dependencias:

   ```bash
   npm install
   npm i -S @react-google-maps/api
   ```

3. Crea un archivo `.env` en la raíz del proyecto y añade tu API key de Google Maps:

   ```env
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
   ```

4. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

5. Abre [http://localhost:3000] en tu navegador para ver la aplicación.

## Funcionalidades

- Ingresar una dirección y mostrarla en un mapa y el historial de búsquedas.

## Aspectos Técnicos

- Uso de Next.js para la renderización del lado del servidor y la navegación entre páginas.
- Uso de TypeScript para asegurar la calidad del código.
- Consumo de la API de Google Maps para la geolocalización.
