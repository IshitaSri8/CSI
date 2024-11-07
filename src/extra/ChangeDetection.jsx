import React, { useRef, useEffect } from "react";
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Style, Fill, Stroke } from "ol/style";
import ADABoundary from "../components/Dashboards/Environment/Maps/ADA_Boundary.json";

const ChangeDetection = () => {
  const mapRef = useRef();

  useEffect(() => {
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([82.144132, 26.783869]),
        zoom: 11,
      }),
    });

    const geojsonSource = new VectorSource({
      features: new GeoJSON().readFeatures(ADABoundary, {
        featureProjection: "EPSG:3857",
      }),
    });

    const geojsonLayer = new VectorLayer({
      source: geojsonSource,
      style: new Style({
        stroke: new Stroke({
          color: "#00a269",
          width: 2,
        }),
        fill: new Fill({
          color: "rgba(169, 243, 224, 0.3)",
        }),
      }),
    });

    map.addLayer(geojsonLayer);
  }, []);

  return (
    <div>
      <div
        ref={mapRef}
        style={{
          height: "50rem",
          overflow: "hidden",
        }}
      />
    </div>
  );
};

export default ChangeDetection;
