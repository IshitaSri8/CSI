import React, { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";

import CityDemographics from "../components/knowYourCity/CityDemographics";
import CityProgress from "../components/knowYourCity/CityProgress";
import { Card } from "primereact/card";

const KnowYourCity = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="p-3">
      <h1 className="text-primary1 text-xl text-left text-medium w-full m-0 p-0 ml-3">
        Know your City
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
