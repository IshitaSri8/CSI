import React, { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";

import CityDemographics from "../components/knowYourCity/CityDemographics";
import CityProgress from "../components/knowYourCity/CityProgress";
import { useUser } from "components/context/UserContext";
import { useRef } from "react";
import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";

const KnowYourCity = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { citizenDetails } = useUser(); // Accessing user details from context
  const { name, phone, email, city, state } = citizenDetails; // Extracting the city
  const overlayPanelRef = useRef(null);

  const handleProfileClick = (event) => {
    overlayPanelRef.current.toggle(event);
  };

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

        {/* Profile Section */}
        <div
          className="flex align-items-center"
          style={{ position: "absolute", right: "10px" }}
        >
          <Button
            icon="pi pi-user"
            className="p-button-rounded text-white text-primary1"
            onClick={handleProfileClick}
            raised
          />
          <OverlayPanel
            ref={overlayPanelRef}
            // showCloseIcon dismissable
          >
            <div className="flex flex-column gap-2 p-3">
              <p className="card-title p-0 m-0">Citizen Profile</p>
              <div className="flex flex-column">
                <label htmlFor="name" className="card-text">Name:</label>
                <input
                  id="name"
                  value={name}
                  readOnly
                  className="p-inputtext p-component"
                />
              </div>
              <div className="flex gap-4">
                <div className="flex flex-column">
                  <label htmlFor="phone">Phone:</label>
                  <input
                    id="phone"
                    value={phone}
                    readOnly
                    className="p-inputtext p-component"
                  />
                </div>
                <div className="flex flex-column">
                  <label htmlFor="email">Email:</label>
                  <input
                    id="email"
                    value={email}
                    readOnly
                    className="p-inputtext p-component"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-column">
                  <label htmlFor="city">City:</label>
                  <input
                    id="city"
                    value={city}
                    readOnly
                    className="p-inputtext p-component"
                  />
                </div>
                <div className="flex flex-column">
                  <label htmlFor="state">State:</label>
                  <input
                    id="state"
                    value={state}
                    readOnly
                    className="p-inputtext p-component"
                  />
                </div>
              </div>
            </div>
          </OverlayPanel>
        </div>
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
