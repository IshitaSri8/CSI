import React, { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import Report from "../components/CityReportCard/Report";
import Recommendations from "components/CityReportCard/Recommendations";
import GenerateReport from "components/CityReportCard/GenerateReport";

const CityReportCardCitizen = ({ show }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="px-2 py-4">
      <h1 className="text-primary1 text-xl text-left text-medium w-full m-0 p-0 ml-3 mb-3">
        City Report Card
        {show}
      </h1>
      <Report />
    </div>
  );
};

export default CityReportCardCitizen;
