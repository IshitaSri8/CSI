import React from "react";
import { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import "primereact/resources/themes/saga-blue/theme.css"; // Choose your theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import AqiDashboard from "../src/components/Dashboards/Environment/AQI/AqiDashboard";
import AQIRecommendations from "../src/components/Dashboards/Environment/AQI/AQIRecommendations";
import AQIReportPrint from "../src/components/Dashboards/Environment/AQI/AQIReportPrint";
import GenerateAqiReport from "./GenerateAQIReport";

const AQI = () => {
  const [aqiValue, setAqiValue] = useState(null);
  const [pm25Value, setPM25Value] = useState(null);
  const [pm10Value, setPM10Value] = useState(null);
  const handleAqiData = (data) => {
    setAqiValue(data.aqiValue);
    setPM25Value(data.pm25Value);
    setPM10Value(data.pm10Value);
  };
  return (
    <div className="p-2">
      <TabView>
        <TabPanel header="Performance">
          <AqiDashboard onDataChange={handleAqiData} show={true} />
        </TabPanel>
        <TabPanel header="Recommendations">
          <AQIRecommendations
            aqi={aqiValue}
            pm25={pm25Value}
            pm10={pm10Value}
          />
        </TabPanel>
        <TabPanel header="Report">
          <GenerateAqiReport />
        </TabPanel>
      </TabView>
    </div>
  );
};

export default AQI;
