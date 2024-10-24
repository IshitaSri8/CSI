import React from "react";
import { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import "primereact/resources/themes/saga-blue/theme.css"; // Choose your theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import WaterDashboard from "../src/components/Dashboards/Environment/Water/WaterDashboard";
import WaterRecommendations from "../src/components/Dashboards/Environment/Water/WaterRecommendations";
import GenerateWaterReport from "./GenerateWaterReport";

const WaterMain = () => {
  return (
    <div className="p-2">
      <TabView>
        <TabPanel header="Performance">
          <WaterDashboard />
        </TabPanel>
        <TabPanel header="Recommendations">
          <WaterRecommendations />
        </TabPanel>
        <TabPanel header="Report">
          <GenerateWaterReport />
        </TabPanel>
      </TabView>
    </div>
  );
};

export default WaterMain;
