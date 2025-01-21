import React, { useState } from "react";
import Report from "../components/CityReportCard/Report";

const CityReportCardCitizen = ({ show }) => {
  return (
    <div className="px-2 py-4 sec-theme">
      <h1 className="text-primary1 text-2xl font-medium text-left w-full m-0 p-0 ml-3 mb-3">
        City Report Card
        {show}
      </h1>
      <Report />
    </div>
  );
};

export default CityReportCardCitizen;

{
  /* <TabView
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
      </TabView> */
}
