import React, { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import Report from "../components/CityReportCard/Report";
import Recommendations from "components/CityReportCard/Recommendations";
import GenerateReport from "components/CityReportCard/GenerateReport";

const CityReportCardCitizen = ({ show }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex align-items-start jutify-content-center flex-column w-full p-2 ">
      <div className="w-full ">
        <h1 className=" text-theme text-2xl m-2 p-1 text-left justify-content-start ">
          City Report Card
          {show}
        </h1>
      </div>
      <Report />
      {/* <TabView
        activeIndex={activeTab}
        onTabChange={(e) => setActiveTab(e.index)}
        className=" bg-cyan-500"
      > */}

      {/* <TabPanel header="Performance" className="text-black">
          <Report />
        </TabPanel> */}
      {/* <TabPanel header="Recommendations">
          <Recommendations />
        </TabPanel>
        <TabPanel header="Report" className="text-black ">
          <div className="w-full">
            <GenerateReport />
          </div>
        </TabPanel> */}
      {/* </TabView> */}
    </div>
  );
};

export default CityReportCardCitizen;
