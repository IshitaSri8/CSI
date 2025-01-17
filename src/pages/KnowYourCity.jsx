import React, { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";

import CityDemographics from "../components/knowYourCity/CityDemographics";
import CityProgress from "../components/knowYourCity/CityProgress";
import { useUser } from "components/context/UserContext";

const KnowYourCity = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { citizenDetails } = useUser(); // Accessing user details from context
  const { city } = citizenDetails; // Extracting the city

  return (
    <div className="px-0 py-4">
      <div className="flex align-items-center gap-2">
        <h1 className="m-0 p-0 text-primary1 text-2xl font-medium ml-3">
          Know Your City
        </h1>
        -
        {city ? (
          <p className="text-theme text-lg p-0 m-0 font-semibold">{city}</p>
        ) : (
          <p className="card-text p-0 m-0">No city selected.</p>
        )}
      </div>
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
