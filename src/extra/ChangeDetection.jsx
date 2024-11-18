import React, { useState } from "react";
import { Card } from "primereact/card";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
  LayersControl,
  FeatureGroup,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import ADABoundary from "../components/Dashboards/Environment/Maps/ADA_Boundary.json";
import water_layer_2016 from "./Assets/Water_2016.json";
import water_layer_2020 from "./Assets/Water_2020.json";
import water_layer_2024 from "./Assets/Water_2024_updated_1.json";
import river from "./Assets/River_Toposheet.json";
import riverbed from "./Assets/Riverbed_Toposheet.json";
import drainage from "./Assets/Drainage_Toposheet.json";
import canal from "./Assets/Canal_Toposheet.json";
import watebody from "./Assets/Waterbody_Toposheet.json";
import water_toposheet from "./Assets/Water_Toposheet_WB_withinA.json";
import area_2024 from "./Assets/Water_2024_poly_withinA.json";
import area_2020 from "./Assets/Water_2020_poly_withinA.json";
import area_2016 from "./Assets/Water_2016_poly_withinA.json";
import mark from "./Assets/Mark_WB_within_ADA.json";
import { MoveDown, MoveUp } from "lucide-react";

const ChangeDetection = () => {
  const mapCenter = [26.783869, 82.144132];

  // State to track selected layers for comparison
  const [selectedLayers, setSelectedLayers] = useState({
    2016: true,
    2020: true,
    2024: true,
  });

  const toggleLayer = (year) => {
    setSelectedLayers((prev) => ({
      ...prev,
      [year]: !prev[year],
    }));
  };
  const locations = [
    {
      lat: 26.75362556,
      lng: 82.13201167,
      area: 12.34,
      village: "Usroo",
      msg: "Remote sensing data analysis indicates a notable decline in both the surface area and volume of numerous waterbodies. In recent years, some of these waterbodies have dried out or reduced significantly in volume.",
    },
    {
      lat: 26.75143417,
      lng: 82.04260139,
      area: 12.34,
      village: "Salarpur",
      msg: "The decline in water resources, likely driven by factors such as changes in land use, climate variations, and increased demand for water.",
    },
    {
      lat: 26.73101278,
      lng: 82.10468167,
      area: 12.34,
      village: "Mau Yaduvansh Pur",
      msg: " An exceptional case has been identified where a new water body appears in satellite imagery, which is not represented in the old topographic map. This observation suggests significant hydrological changes in the region, potentially due to alterations in land use, climate variability, or other environmental factors.",
    },
    {
      lat: 26.75677167,
      lng: 82.05409667,
      area: 12.34,
      village: "Haripur Jalalabad",
      msg: " An exceptional case has been identified where a new water body appears in satellite imagery, which is not represented in the old topographic map. This observation suggests significant hydrological changes in the region, potentially due to alterations in land use, climate variability, or other environmental factors.",
    },
    {
      lat: 26.81128694,
      lng: 82.07886528,
      area: 12.34,
      village: "Haripur Jalalabad",
      msg: " Analysis of Satellite imagery has revealed significant transformations in several river channels, with many sections drying out over time. The recent images show only the impressions or remnants of the river channels, with no active water flow, indicating the severity of the drying process.",
    },
    {
      lat: 26.78043611,
      lng: 82.11455444,
      area: 12.34,
      village: "Haripur Jalalabad",
      msg: " Satellite imagery analysis has revealed a concerning trend: several river channels in the region have dried out over time. This change is visibly captured in comparative images, which show the gradual disappearance of water in these channels",
    },
  ];

  const markerIcon = L.divIcon({
    className: "custom-marker-icon",
    html: ` 
      <div style=" 
        position: relative; 
        width: 18px; 
        height: 18px; 
        background-color: red; 
        border-radius: 50%; 
        transform: rotate(-45deg); 
        border: 2px solid white; 
      "> 
        <div style=" 
          position: absolute; 
          bottom: -6px; 
          left: 6px; 
          width: 4px; 
          height: 4px; 
          background-color: white; 
          border-radius: 50%; 
        "> 
        </div> 
      </div> 
    `,
    iconSize: [18, 18],
    iconAnchor: [9, 18],
  });

  const geoJsonStyleBoundary = {
    color: "black",
    weight: 2,
  };

  const geoJsonStyleChange = (year) => {
    switch (year) {
      case 1975:
        return { color: "green", weight: 2, opacity: 0.7 };
      case 2016:
        return { color: "blue", weight: 2, opacity: 0.7 };
      case 2020:
        return { color: "yellow", weight: 2, opacity: 0.8 };
      case 2024:
        return { color: "red", weight: 2, opacity: 0.9 };
      default:
        return { color: "gray" };
    }
  };
  const onEachFeature = (feature, layer) => {
    if (feature.properties && feature.properties.Shape_Area) {
      const areaInMeters = feature.properties.Shape_Area * 1000000; // Convert km² to m²
      const formattedArea = areaInMeters.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }); // Format with commas and two decimal places

      // Bind tooltip to show the Shape Area
      layer.bindTooltip(`Shape Area: ${formattedArea} m²`, {
        permanent: false,
        direction: "top",
      });
    }
  };
  const renderMatchingMarkers = (data2016, data2020, data2024) => {
    const data2016Lookup = new Map(
      data2016.features.map((feature) => [feature.properties.Loc_ID, feature])
    );
    const data2020Lookup = new Map(
      data2020.features.map((feature) => [feature.properties.Loc_ID, feature])
    );
    const data2024Lookup = new Map(
      data2024.features.map((feature) => [feature.properties.Loc_ID, feature])
    );

    return data2016.features
      .filter(
        (feature2016) =>
          data2020Lookup.has(feature2016.properties.Loc_ID) &&
          data2024Lookup.has(feature2016.properties.Loc_ID)
      )
      .map((feature2016, index) => {
        const locId = feature2016.properties.Loc_ID;
        const feature2020 = data2020Lookup.get(locId);
        const feature2024 = data2024Lookup.get(locId);

        const area2016 = feature2016.properties.Area;
        const area2020 = feature2020.properties.Area;
        const area2024 = feature2024.properties.Area;

        // Calculate changes and percentages only for selected years
        const change2016to2020 =
          selectedLayers[2016] && selectedLayers[2020]
            ? area2020 - area2016
            : null;
        const change2020to2024 =
          selectedLayers[2020] && selectedLayers[2024]
            ? area2024 - area2020
            : null;
        const change2016to2024 =
          selectedLayers[2016] && selectedLayers[2024]
            ? area2024 - area2016
            : null;

        const percentChange2016to2020 = change2016to2020
          ? (change2016to2020 / area2016) * 100
          : null;
        const percentChange2020to2024 = change2020to2024
          ? (change2020to2024 / area2020) * 100
          : null;
        const percentChange2016to2024 = change2016to2024
          ? (change2016to2024 / area2016) * 100
          : null;

        return (
          <Card>
            <Marker
              key={`match-${index}`}
              position={[
                feature2016.properties.Latitude,
                feature2016.properties.Longitude,
              ]}
              icon={markerIcon}
            >
              <Popup>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedLayers[2016]}
                      onChange={() => toggleLayer(2016)}
                    />
                    2016
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedLayers[2020]}
                      onChange={() => toggleLayer(2020)}
                    />
                    2020
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedLayers[2024]}
                      onChange={() => toggleLayer(2024)}
                    />
                    2024
                  </label>
                </div>
                <strong>Area Comparison:</strong>
                <br />
                {selectedLayers[2016] && (
                  <>
                    Area of Water body in 2016: {area2016} sq. km
                    <br />
                  </>
                )}
                {selectedLayers[2020] && (
                  <p className="font-xs m-0 p-0 ">
                    Area of Water body in 2020: {area2020.toFixed(4)} sq. km
                    <br />
                  </p>
                )}
                {selectedLayers[2024] && (
                  <>
                    Area of Water body in 2024: {area2024.toFixed(4)} sq. km
                    <br />
                  </>
                )}

                {selectedLayers[2016] &&
                  selectedLayers[2020] &&
                  change2016to2020 !== null && (
                    <p className="m-0 p-0 font-semibold">
                      % Change between 2016 & 2020:{" "}
                      {change2016to2020.toFixed(6)} sq. km (
                      {percentChange2016to2020.toFixed(4)}%{" "}
                      {change2016to2020 >= 0 ? (
                        <MoveUp size={15} color="green" />
                      ) : (
                        <MoveDown size={15} color="red" />
                      )}
                      )
                      <br />
                    </p>
                  )}
                {selectedLayers[2020] &&
                  selectedLayers[2024] &&
                  change2020to2024 !== null && (
                    <p className="m-0 p-0 font-semibold">
                      % Change between 2020 & 2024:{" "}
                      {change2020to2024.toFixed(6)} sq. km (
                      {percentChange2020to2024.toFixed(4)}%{" "}
                      {change2020to2024 >= 0 ? (
                        <MoveUp size={15} color="green" />
                      ) : (
                        <MoveDown size={15} color="red" />
                      )}
                      )
                      <br />
                    </p>
                  )}
                {selectedLayers[2016] &&
                  selectedLayers[2024] &&
                  change2016to2024 !== null && (
                    <p className="m-0 p-0 font-semibold">
                      % Change between 2016 & 2024:{" "}
                      {change2016to2024.toFixed(6)} sq. km (
                      {percentChange2016to2024.toFixed(4)}%{" "}
                      {change2016to2024 >= 0 ? (
                        <MoveUp size={15} color="green" />
                      ) : (
                        <MoveDown size={15} color="red" />
                      )}
                      )
                    </p>
                  )}
              </Popup>
            </Marker>
          </Card>
        );
      });
  };

  return (
    <Card className="w-full">
      <MapContainer center={mapCenter} zoom={11} style={{ height: "50rem" }}>
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png" />

        <GeoJSON data={ADABoundary} style={geoJsonStyleBoundary} />

        <LayersControl position="topright">
          <LayersControl.Overlay name="Marked Area">
            <GeoJSON data={mark} style={geoJsonStyleChange(2025)} />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Water 1975">
            <GeoJSON
              data={[river, riverbed, drainage, canal, watebody].reduce(
                (acc, curr) => {
                  if (curr && curr.features) {
                    return acc.concat(curr.features);
                  }
                  return acc;
                },
                []
              )}
              style={geoJsonStyleChange(1975)}
              onEachFeature={onEachFeature}
            />
          </LayersControl.Overlay>
          {/* <LayersControl.Overlay name="Water 2016">
            <GeoJSON data={water_layer_2016} style={geoJsonStyleChange(2016)} />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Water 2020" checked>
            <GeoJSON data={water_layer_2020} style={geoJsonStyleChange(2020)} />
          </LayersControl.Overlay> */}
          <LayersControl.Overlay name="Water 2024" checked>
            <GeoJSON
              data={water_layer_2024}
              style={geoJsonStyleChange(2024)}
              onEachFeature={onEachFeature}
            />
          </LayersControl.Overlay>
        </LayersControl>

        {/* <FeatureGroup>
          {renderMatchingMarkers(area_2016, area_2020, area_2024)}
        </FeatureGroup> */}
        {locations.map((location, index) => (
          <Marker
            key={`marker-${index}`}
            position={[location.lat, location.lng]}
            icon={markerIcon}
          >
            <Tooltip direction="top">
              <strong>Area: {location.area.toFixed(2)} sq. km</strong>
              <p>Nearest Village: {location.village}</p>
              <p className="text-xs">Reason: {location.msg}</p>
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </Card>
  );
};

export default ChangeDetection;
