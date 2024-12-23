import React from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import ADA_Boundary from "../../Environment/Maps/ADA_Boundary.json";
import villageData from "../../Environment/Maps/ayodhya_village.json"; // Import village GeoJSON data

const AccidentMap = ({ accidentData }) => {
  // Function to determine color based on severity
  const getSeverityColor = (severity) => {
    switch (severity) {
      case "severe":
        return "red"; // Severe accidents
      case "moderate":
        return "orange"; // Moderate accidents
      case "low":
        return "yellow"; // Low accidents
      default:
        return "gray"; // Default color for unknown severity
    }
  };

  // Create custom marker icon based on severity
  const createMarkerIcon = (severity) => {
    return L.divIcon({
      className: "custom-marker-icon",
      html: `
        <div style="
          width: 20px;
          height: 20px;
          background-color: ${getSeverityColor(severity)};
          border-radius: 50%;
          border: 2px solid white;
        "></div>
      `,
      iconSize: [20, 20],
      iconAnchor: [10, 20], // Adjust anchor to bottom of the pin
    });
  };

  const boundaryStyle = {
    color: "#166c7d",
    weight: 2,
    opacity: 0.6,
  };

  const villageStyle = {
    color: "#FFBB5C",
    weight: 2,
    opacity: 0.5,
    fillColor: "#FFDD77",
    fillOpacity: 0.3,
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
      <GeoJSON data={ADA_Boundary} style={boundaryStyle} />

      {/* Render Village Boundaries */}
      <GeoJSON data={villageData} style={villageStyle} />

      {/* Render accident markers */}
      {accidentData.map((accident, index) => (
        <Marker
          key={index}
          position={[accident.lat, accident.lon]}
          icon={createMarkerIcon(accident.severity)}
        >
          <Popup>
            <div>
              <strong>{accident.location}</strong>
              <br />
              Severity: {accident.severity}
              <br />
              Number of Accidents: {accident.count}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default AccidentMap;
