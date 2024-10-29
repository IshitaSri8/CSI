import React from "react";
import { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import "primereact/resources/themes/saga-blue/theme.css"; // Choose your theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import WasteDashboard from "./WasteDashboard";
import WasteRecommendations from "./WasteRecommendations";
import GenerateWasteReport from "./GenerateWasteReport";

const WasteMain = () => {
  return (
    <div className="p-2">
      <TabView>
        <TabPanel header="Performance">
          <WasteDashboard />
        </TabPanel>
        <TabPanel header="Recommendations">
          <WasteRecommendations />
        </TabPanel>
        <TabPanel header="Report">
          <GenerateWasteReport />
        </TabPanel>
      </TabView>
    </div>
  );
};

export default WasteMain;
