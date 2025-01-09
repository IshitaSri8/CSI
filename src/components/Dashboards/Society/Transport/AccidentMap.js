import React from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import ADA_Boundary from "../../Environment/Maps/ADA_Boundary.json";
import zones from "assets/GeoJson_Zone/Zone_Boundary_Merge.json";

const AccidentMap = () => {
  const boundaryStyle = {
    color: "#166c7d",
    weight: 2,
    opacity: 0.6,
  };

  const zoneStyle = {
    color: "#FFBB5C",
    weight: 2,
    opacity: 0.5,
    fillColor: "#FFDD77",
    fillOpacity: 0.3,
  };

  // Function to add popups to each feature in GeoJSON
  const onEachFeature = (feature, layer) => {
    if (feature.properties) {
      // Customize this based on your GeoJSON properties
      const zoneName = feature.properties.name || "Unknown Zone"; // Adjust according to your GeoJSON structure
      layer.bindPopup(`<strong>${zoneName}</strong>`);
    }
  };

  return (
    <MapContainer
      center={[26.783869, 82.144132]} // Center of your map
      zoom={11}
      style={{ height: "14rem", width: "100%" }}
      attributionControl={false}
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png" />
      
      {/* Render ADA Boundary */}
      <GeoJSON data={ADA_Boundary} style={boundaryStyle} onEachFeature={onEachFeature} />

      {/* Render Village Boundaries with Popups */}
      <GeoJSON data={zones} style={zoneStyle} onEachFeature={onEachFeature} />
    </MapContainer>
  );
};

export default AccidentMap;
