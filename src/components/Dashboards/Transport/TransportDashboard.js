import React, { useState } from "react";
import { Panel } from "primereact/panel";
import Infrastructure from "./Infrastructure";
import Frequency from "./Frequency";
import Accessibility from "./Accessibility";
import Renewable from "./Renewable";
import Passenger from "./Passenger";
import PrivateVehicle from "./PrivateVehicle";
import Cleanliness from "./Cleanliness";
import Fare from "./Fare";

// const RoadComponent = () => (
//   <Card title="Road Component">This is the Road component.</Card>
// );

const TransportDashboard = () => {
  return (
    <div className="flex flex-column gap-3 ">
      <Panel toggleable header="Infrastructure Quality">
        <Infrastructure />
      </Panel>
      <Panel toggleable header="Accessibility-Mode of Transport">
        <Accessibility />
      </Panel>
      <Panel toggleable header="Frequency of Service">
        <Frequency />
      </Panel>
      <Panel toggleable header="Transport Renewable Energy Enabled">
        <Renewable/>
      </Panel>
      <Panel toggleable header="Private Vehicles in Public Transport">
        <PrivateVehicle />
      </Panel> 
       <Panel toggleable header="Capacity and Passenger Load">
        <Passenger/>
       </Panel>
      <Panel toggleable header="Cost and Fare Structure">
        <Fare/>
      </Panel>
      <Panel toggleable header="Cleanliness and Maintenance">
        <Cleanliness/>
      </Panel>
    </div>
  );
};

export default TransportDashboard;
