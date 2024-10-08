import React, { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { Panel } from "primereact/panel";
import CityDemographics from "../components/knowYourCity/CityDemographics";
import CityProgress from "../components/knowYourCity/CityProgress";

const KnowYourCity = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="p-2">
      <h1 className="text-center text-theme text-3xl">Know your city</h1>
      <TabView
        activeIndex={activeTab}
        onTabChange={(e) => setActiveTab(e.index)}
      >
        <TabPanel header="City Demographics" className="text-black">
          <CityDemographics />
        </TabPanel>
        <TabPanel header="City Progress">
          <CityProgress />
        </TabPanel>
      </TabView>
    </div>
  );
};

export default KnowYourCity;
