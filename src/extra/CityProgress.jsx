import React from "react";
import { Card } from "primereact/card";
import CanvasJSReact from "@canvasjs/react-charts";
import "primeflex/primeflex.css";

// Importing the CanvasJS library
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

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

  // Function to create a DonutChart
  const renderDonutChart = (data) => {
    const options = {
      animationEnabled: true,
      title: {
        text: data.title,
        fontSize: 12,
        fontFamily: "DM Sans",
        fontWeight: "800",
      },
      height: 200,
      width: 300,
      data: [
        {
          type: "doughnut",
          startAngle: 60,

          toolTipContent: "<b>{label}</b>: {y} (#percent%)",
          showInLegend: false,
          indexLabelFontSize: 8,
          // color: colors,
          indexLabel: "{label} - #percent%",
          dataPoints: data.labels.map((label, index) => ({
            y: data.series[index],
            label: label,
          })),
        },
      ],
    };

    return <CanvasJSChart options={options} />;
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
      {/* First Row: Cards */}
      <div className="flex gap-4 flex-wrap">
        {cardData.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            className="mb-4 h-8rem"
            style={{
              backgroundColor: "white",
              border: "2px solid #166C7D",
              color: "black",
              flex: "1 1 calc(33.33% - 1rem)",
            }} // Adjust to fit three cards in one row
          >
            {card.content.map((item, idx) => (
              <p style={{ marginTop: -10 }} key={idx}>
                {item}
              </p>
            ))}
            <p style={{ marginTop: -10 }}>Source: {card.source}</p>
          </Card>
        ))}
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
          {renderDonutChart(wasteGenerationData)}
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
          {renderDonutChart(solidWasteProcessedData)}
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
          {renderDonutChart(electricityConsumptionData)}
          <p>Source: Vidyut Vibhag Ayodhya</p>
        </Card>
      </div>
    </div>
  );
};

export default CityProgress;
