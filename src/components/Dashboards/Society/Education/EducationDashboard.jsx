import React, { useState } from "react";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { DonutChart } from "Layout/GraphVisuals";
import { primaryData } from "./PrimaryData";
import { secondaryData } from "./SecondaryData";
import { higherEducationData } from "./HigherEducationData";
import { collegeData } from "./CollegeData";

const EducationDashboard = () => {
  const [selectedLevel, setSelectedLevel] = useState("Primary");
  const educationDataMap = {
    Primary: primaryData,
    Secondary: secondaryData,
    "Higher Education": higherEducationData,
    College: collegeData,
  };
  const educationData = educationDataMap[selectedLevel];

  const levels = ["Primary", "Secondary", "Higher Education", "College"];

  return (
    <div className="w-full p-5">
     <div className="flex justify-content-around">
     <h1 className="text-2xl font-bold mb-4">Education</h1>
      {/* Dropdown for selecting education level */}
      <Dropdown
        value={selectedLevel}
        options={levels}
        onChange={(e) => setSelectedLevel(e.value)}
        placeholder="Select Education Level"
        className="mb-4"
      />
     </div>
      <h1 className="text-2xl font-bold mb-4">{selectedLevel}</h1>
      {/* First row with parameter cards */}
      <div className="flex gap-4 justify-content-between mb-6">
        {educationData.parameters.map((param, index) => (
          <Card key={index} title={param.title} className="w-full">
            <h1 className="text-xl m-0 p-0">{param.value}</h1>
          </Card>
        ))}
      </div>

      {/* Second row with corresponding charts */}
      <div className="flex gap-4 justify-content-between">
        {educationData.parameters.map((param, index) => (
          <Card key={index} title={`${param.title} Chart`} className="w-full">
            <DonutChart
              labels={["A", "B", "C"]}
              series={param.chartData}
              height={150}
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EducationDashboard;
