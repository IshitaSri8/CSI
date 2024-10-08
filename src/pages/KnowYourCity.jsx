import React, { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";

import CityDemographics from "../components/knowYourCity/CityDemographics";
import CityProgress from "../components/knowYourCity/CityProgress";
import { Card } from "primereact/card";

const KnowYourCity = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="px-2">
      <h1 className="text-theme text-2xl text-left w-full justify-content-start m-0 p-3">
        Know your city
      </h1>
      <TabView
        activeIndex={activeTab}
        onTabChange={(e) => setActiveTab(e.index)}
      >
        <TabPanel header="City Demographics">
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
