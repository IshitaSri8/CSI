import React, { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import Report from "../components/CityReportCard/Report";
import Recommendations from "components/CityReportCard/Recommendations";
import GenerateReport from "components/CityReportCard/GenerateReport";

const CityReportCard = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full p-4 flex align-items-start jutify-content-start flex-column">
      <div className="w-full">
        <h1 className=" text-theme text-2xl m-2 p-1 text-left justify-content-start ">
          City Report Card
        </h1>
      </div>

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
