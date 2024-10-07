import React, { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import Report from "../components/CityReportCard/Report";
import Recommendations from "components/CityReportCard/Recommendations";
import GenerateReport from "components/CityReportCard/GenerateReport";

const CityReportCard = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="p-2">
      <h1 className="text-left text-theme text-2xl m-0 p-0">
        City Report Card
      </h1>
      <TabView
        activeIndex={activeTab}
        onTabChange={(e) => setActiveTab(e.index)}
      >
        <TabPanel header="Performance" className="text-black">
          <Report />
        </TabPanel>
        <TabPanel header="Recommendations">
          <Recommendations />
        </TabPanel>
        <TabPanel header="Report">
          <GenerateReport />
        </TabPanel>
      </TabView>
    </div>
  );
};

export default CityReportCard;
