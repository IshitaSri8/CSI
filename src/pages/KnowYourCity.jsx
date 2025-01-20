import React, { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";

import CityDemographics from "../components/knowYourCity/CityDemographics";
import CityProgress from "../components/knowYourCity/CityProgress";
import { useUser } from "components/context/UserContext";

const KnowYourCity = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { citizenDetails } = useUser(); // Accessing user details from context
  const { city } = citizenDetails; // Extracting the city
  const { name } = citizenDetails;

  return (
    <div className="px-0 py-4">
      <div className="flex align-items-center gap-2">
        <p className="text-secondary2 text-3xl p-0 m-0 font-semibold ml-3">
          Hey {name}!
        </p>
        <h1 className="m-0 p-0 text-primary1 text-2xl font-medium">
          Know Your City-
        </h1>
        {city ? (
          <p className="text-secondary2 text-3xl p-0 m-0 font-semibold">
            {city}
          </p>
        ) : (
          // <p className="card-text p-0 m-0">No city selected.</p>
          <p className="card-text p-0 m-0">Ayodhya</p>
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
