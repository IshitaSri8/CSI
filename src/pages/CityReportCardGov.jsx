import React, { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import Report from "../components/CityReportCard/Report";
import Recommendations from "components/CityReportCard/Recommendations";
import GenerateReport from "components/CityReportCard/GenerateReport";

const CityReportCardGov = ({ show }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex align-items-start jutify-content-center flex-column w-full p-2 ">
      <div className="w-full ">
        <h1 className="text-primary1 text-xl text-left text-medium w-full justify-content-start m-0 p-0 ml-3">
          City Report Card
          {show}
        </h1>
      </div>

      <TabView
        activeIndex={activeTab}
        onTabChange={(e) => setActiveTab(e.index)}
        className="w-full"
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

export default CityReportCardGov;
