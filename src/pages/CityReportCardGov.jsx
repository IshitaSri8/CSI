import React, { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import Report from "../components/CityReportCard/Report";
import Recommendations from "components/CityReportCard/Recommendations";
import GenerateReport from "components/CityReportCard/GenerateReport";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import ReportPrint from "components/CityReportCard/ReportPrint";
import { Divider } from "primereact/divider";

const CityReportCardGov = ({ show }) => {
  const [ReportVisible, setReportVisible] = useState(false);
  const [recommendationsVisible, setRecommendationsVisible] = useState(false);

  const handleToggleRecommendations = () => {
    setRecommendationsVisible(!recommendationsVisible);
  };
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex px-2 py-4 flex-column sec-theme">
      <div className="flex align-items-center justify-content-between w-full">
        <h1 className="m-0 p-0 text-2xl text">City Report Card</h1>
        <Button
          label="Generate Report"
          icon="pi pi-file"
          onClick={() => setReportVisible(true)}
          className="mb-4 bg-theme text-white"
          raised
        />
      </div>

      <Dialog
        visible={ReportVisible}
        style={{ width: "100rem" }}
        onHide={() => setReportVisible(false)}
      >
        <ReportPrint />
      </Dialog>

      {/* <div className="w-full">
        <h1 className="text-primary1 text-xl text-left text-medium w-full m-0 p-0 ml-3">
          City Report Card
        </h1>
      </div> */}

      <Report />
      <Divider />
      <div className="flex justify-content-end">
        <Button
          label={
            recommendationsVisible
              ? "Close Recommendations"
              : "Get Recommendations"
          }
          icon={recommendationsVisible ? "pi pi-times" : "pi pi-check-square"}
          onClick={handleToggleRecommendations}
          className="bg-theme text-white"
          raised
        />
      </div>

      {recommendationsVisible && <Recommendations />}
    </div>
  );
};

export default CityReportCardGov;

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
