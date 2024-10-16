import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button"; // Assuming Button component is from PrimeReact
import { Card } from "primereact/card";
import BusDashboard from "./BusDashboard";
import RailDashboard from "./RailDashboard";

const RoadComponent = () => (
  <Card title="Road Component">This is the Road component.</Card>
);

const Transport = () => {
  const [selectedMode, setSelectedMode] = useState("Bus");
  const [activeComponent, setActiveComponent] = useState(<BusDashboard />);

  const modes = [
    { label: "Bus", value: "Bus" },
    { label: "Rail", value: "Rail" },
    { label: "Road", value: "Road" },
  ];

  const handleSearch = () => {
    switch (selectedMode) {
      case "Bus":
        setActiveComponent(<BusDashboard />);
        break;
      case "Rail":
        setActiveComponent(<RailDashboard />);
        break;
      case "Road":
        setActiveComponent(<RoadComponent />);
        break;
      default:
        setActiveComponent(null);
        break;
    }
  };

  return (
    <>
      <Panel toggleable header="Filter By">
        <div className="flex align-items-center  w-full  flex-row">
          <div className="flex align-items-end justify-content-between w-full ">
            <div className="flex flex-row gap-2rem">
              <label htmlFor="location" className="font-semibold p-2">
                Select Mode of Transport :
              </label>
              <Dropdown
                value={selectedMode}
                options={modes}
                optionLabel="label"
                optionValue="value"
                onChange={(e) => setSelectedMode(e.value)}
                placeholder="Select Mode"
                className="w-30rem"
              />
            </div>
          </div>
          <Button
            severity="success"
            label="Filter"
            icon="pi pi-search"
            onClick={handleSearch}
          />
        </div>
      </Panel>

      <div className="mt-2">{activeComponent}</div>
    </>
  );
};

export default Transport;
