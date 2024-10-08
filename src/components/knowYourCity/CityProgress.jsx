import React from "react";
import { Card } from "primereact/card";
import "primeflex/primeflex.css";
import { DonutChart } from "components/GraphVisuals";

const CityProgress = () => {
  const wasteGenerationData = {
    title: "Waste Generation",
    labels: ["Residential", "Commercial", "Institutional"],
    series: [238800, 119400, 59700],
  };

  const solidWasteProcessedData = {
    title: "Solid Waste Processed (in TPD)",
    labels: ["Domestic", "Dry", "Sanitary", "Wet"],
    series: [5.43, 72.39, 3.62, 99.53],
  };

  const electricityConsumptionData = {
    title: "Electricity Consumption (KWH)",
    labels: [
      "Residential",
      "Commercial",
      "Industrial",
      "Agricultural",
      "Others",
    ],
    series: [15343985, 2541529, 144440, 4675, 2100829],
  };

  const cardData = [
    {
      title: "Water Management Ranking",
      content: ["State Category Rank: 21/67"],
      source: "Jal Jeevan Mission",
    },
    {
      title: "Water Supply",
      content: ["Quantity of Water Supply: 39.55 MLD"],
      source: "Jal Kal Vibhag 2020",
    },
    {
      title: "Houses Allocated",
      content: ["Houses Allocated: 362", "Houses Built: 384"],
      source: "Pradhan Mantri Awas Yojana",
    },
    {
      title: "Garbage Free City",
      content: ["Rating: 1 star"],
      source: "Ministry of Housing and Urban Affairs",
    },
    {
      title: "Swachh Survekshan",
      content: ["Rank: 389"],
      source: "Swachh Survekshan Mission",
    },
    {
      title: "CT/PT",
      content: ["Functional: 62/62"],
      source: "Swachh Bharat Mission",
    },
  ];

  return (
    <div className="flex flex-column p-5 gap-4">
      <div className="flex gap-4 flex-wrap">
        <Card>
          <p>Garbage Free City</p>
          <p>
          Ministry of Housing and Urban Affairs
          </p>
          <p>
          Ministry of Housing and Urban Affairs
          </p>
        </Card>
      </div>

      {/* Third Row: Donut Charts */}
      <div className="flex gap-4">
        <Card
          className="w-full flex-1"
          style={{
            backgroundColor: "white",
            border: "2px solid #166C7D",
            color: "black",
          }}
        >
          {DonutChart(wasteGenerationData)}
          <p>Source: Ayodhya Industrial Dept 2020</p>
        </Card>

        <Card
          className="w-full flex-1"
          style={{
            backgroundColor: "white",
            border: "2px solid #166C7D",
            color: "black",
            flex: "1 1 calc(33.33% - 1rem)",
          }}
        >
          {DonutChart(solidWasteProcessedData)}
          <p>Source: Swachh Bharat Mission</p>
        </Card>

        <Card
          className="w-full flex-1"
          style={{
            backgroundColor: "white",
            border: "2px solid #166C7D",
            color: "black",
            flex: "1 1 calc(33.33% - 1rem)",
          }}
        >
          {DonutChart(electricityConsumptionData)}
          <p>Source: Vidyut Vibhag Ayodhya</p>
        </Card>
      </div>
    </div>
  );
};

export default CityProgress;
