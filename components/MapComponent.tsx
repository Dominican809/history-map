"use client";

import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = () => {
  return (
    <MapContainer
      center={[20, 0]} // Initial map center (latitude, longitude)
      zoom={3} // Initial zoom level
      style={{ height: "60vh", width: "100%" }} // Define map container size
      zoomControl={false} // Disables default zoom control (customizable placement below)
      className="z-0" // Tailwind CSS class for layering
    >
      {/* OpenStreetMap Tile Layer */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // URL for tile images
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* Add Zoom Control at the Bottom-Right */}
      <ZoomControl position="bottomright" />
    </MapContainer>
  );
};

export default MapComponent;
