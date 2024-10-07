import React from "react";
import { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import "primereact/resources/themes/saga-blue/theme.css"; // Choose your theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import RainDashboard from "./RainDashboard";
import RainRecommendations from "./RainRecommendations";
import GenerateRainReport from "./GenerateRainReport";

const RainMain = () => {
  return (
    <div className="p-2">
      <TabView>
        <TabPanel header="Performance">
          <RainDashboard />
        </TabPanel>
        <TabPanel header="Recommendations">
          <RainRecommendations />
        </TabPanel>
        <TabPanel header="Report">
          <GenerateRainReport />
        </TabPanel>
      </TabView>
    </div>
  );
};

export default RainMain;
