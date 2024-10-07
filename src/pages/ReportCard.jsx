import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ParetoChart } from "../components/GraphVisuals";
import sum_img from "../assets/City report card/plus.png";
import equal_img from "../assets/City report card/equal.png";
import esg from "../assets/City report card/ESG_ESG.png";
import renewable from "../assets/City report card/renewable-energy.png";
import air from "../assets/City report card/air.png";
import water from "../assets/City report card/water.png";
import earth from "../assets/City report card/earth.png";
import climate from "../assets/City report card/climate.png";
import n from "../assets/City report card/n-letter.png";
import s from "../assets/City report card/s-letter.png";
import a from "../assets/City report card/a.png";
import home from "../assets/City report card/home.png";
import health from "../assets/City report card/healthcare.png";
import transport from "../assets/City report card/transport.png";
import cultue from "../assets/City report card/culture.png";
import gov from "../assets/City report card/governance.png";
import rights from "../assets/City report card/human-rights.png";
import corruption from "../assets/City report card/corruption.png";
import { Card } from "primereact/card";

const CityReportCard = () => {
  const [selectedCategory, setSelectedCategory] = useState("Environment");
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [activeTab, setActiveTab] = useState("E");

  useEffect(() => {
    switch (activeTab) {
      case "E":
        setSelectedCategory("Environment");
        break;
      case "S":
        setSelectedCategory("Social");
        break;
      case "G":
        setSelectedCategory("Governance");
        break;
      default:
        setSelectedCategory("Environment");
        break;
    }
  }, [activeTab]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const indicators = {
    E: [
      { text: "Air Quality", icon: air },
      { text: "Water Conservation & Preservation", icon: water },
      { text: "Earth", icon: earth },
      { text: "Fire and Energy", icon: renewable },
      { text: "Climate Quality", icon: climate },
    ],
    S: [
      { text: "Housing", icon: home },
      { text: "Healthcare", icon: health },
      { text: "Transport", icon: transport },
      { text: "Cultural preservation", icon: cultue },
    ],
    G: [
      { text: "Government Schemes", icon: gov },
      { text: "Anti-Corruption", icon: corruption },
      { text: "Citizen Rights (Human Rights)", icon: rights },
    ],
  };

  const categories = {
    Environment: {
      title: "Nature Metrics",
      data: [10, 80, 30, 3, 50, 78, 70, 60, 90, 80, 110, 90],
    },
    Social: {
      title: "Society Metrics",
      data: [15, 5, 25, 45, 55, 95, 75, 85, 105, 87, 115, 65],
    },
    Governance: {
      title: "Administration Metrics",
      data: [20, 10, 80, 50, 60, 70, 76, 40, 10, 110, 180, 130],
    },
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  const handleTotalScoreClick = () => {
    navigate("/csi/sdg");
  };

  return (
    <div className="flex flex-column gap-3 p-8 mt-5">
      {/* First Row: Indicator Tabs */}
      <div className="flex gap-4">
        {/* Nature Tab */}
        <Card className="w-full cursor-pointer">
          <div
            className={`flex gap-6 align-items-center ${
              activeTab === "E" ? "surface-border" : ""
            }`}
            onClick={() => handleTabClick("E")}
          >
            <img src={n} className="h-4rem w-4rem" alt="nature" />
            <h1 className="text-2xl">Nature</h1>
            <span className="bg-green-500 text-white border-round px-2 py-1 text-xl font-bold">
              80
            </span>
          </div>
        </Card>

        {/* Society Tab */}
        <Card className="w-full cursor-pointer">
          <div
            className={`flex gap-6 align-items-center ${
              activeTab === "S" ? "surface-border" : ""
            }`}
            onClick={() => handleTabClick("S")}
          >
            <img src={s} className="h-4rem w-4rem" alt="society" />
            <h1 className="text-2xl">Society</h1>
            <span className="bg-green-500 text-white border-round px-2 py-1 text-xl font-bold">
              60
            </span>
          </div>
        </Card>

        {/* Administration Tab */}
        <Card className="w-full cursor-pointer">
          <div
            className={`flex gap-6 align-items-center ${
              activeTab === "G" ? "surface-border" : ""
            }`}
            onClick={() => handleTabClick("G")}
          >
            <img src={a} className="h-4rem w-4rem" alt="administration" />
            <h1 className="text-2xl">Administration</h1>
            <span className="bg-green-500 text-white border-round px-2 py-1 text-xl font-bold">
              70
            </span>
          </div>
        </Card>
      </div>

      {/* Second Row: Indicator Content */}
      <div className="flex">
        <Card className="w-full">
          <div className="flex flex-wrap gap-6 justify-content-center">
            {" "}
            {/* Flex container to align icons */}
            {activeTab === "E" &&
              indicators.E.map((indicator, index) => (
                <div
                  key={index}
                  className="flex flex-column align-items-center"
                >
                  {" "}
                  {/* Align items in a column */}
                  <img
                    src={indicator.icon}
                    className="h-3rem w-3rem mb-1" // Margin bottom for spacing
                    alt="icon"
                  />
                  <span className="text-center">{indicator.text}</span>{" "}
                  {/* Centered text below icon */}
                </div>
              ))}
            {activeTab === "S" &&
              indicators.S.map((indicator, index) => (
                <div
                  key={index}
                  className="flex flex-column align-items-center"
                >
                  {" "}
                  {/* Align items in a column */}
                  <img
                    src={indicator.icon}
                    className="h-3rem w-3rem mb-1" // Margin bottom for spacing
                    alt="icon"
                  />
                  <span className="text-center">{indicator.text}</span>{" "}
                  {/* Centered text below icon */}
                </div>
              ))}
            {activeTab === "G" &&
              indicators.G.map((indicator, index) => (
                <div
                  key={index}
                  className="flex flex-column align-items-center"
                >
                  {" "}
                  {/* Align items in a column */}
                  <img
                    src={indicator.icon}
                    className="h-3rem w-3rem mb-1" // Margin bottom for spacing
                    alt="icon"
                  />
                  <span className="text-center">{indicator.text}</span>{" "}
                  {/* Centered text below icon */}
                </div>
              ))}
          </div>
        </Card>
      </div>

      {/* Third Row: Two-Column Layout */}
      <div className="flex gap-4">
        {/* First Column: ParetoChart */}
        <Card className="w-6">
          <div className="surface-border p-4">
            <ParetoChart
              title={categories[selectedCategory].title}
              categories={[
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ]}
              data={categories[selectedCategory].data}
              height="160"
              width="400"
              xtitle=""
              ytitle=""
            />
          </div>
        </Card>

        {/* Second Column: Total CSI Score */}
        <Card className="w-6 flex flex-column justify-content-between align-items-center">
          <div
            className="surface-border text-center p-5 mt-5 cursor-pointer"
            onClick={handleTotalScoreClick}
          >
            <div className="flex justify-content-center gap-2 align-items-center">
              <img src={n} className="h-3rem" alt="nature" />
              <img src={sum_img} className="h-2rem" alt="plus" />
              <img src={s} className="h-3rem" alt="society" />
              <img src={sum_img} className="h-2rem" alt="plus" />
              <img src={a} className="h-3rem" alt="admin" />
              <img src={equal_img} className="h-2rem" alt="equals" />
              <img src={esg} className="h-5rem" alt="esg" />
            </div>
            <h1 className="text-xl font-bold">Total CSI Score</h1>
            <span className="bg-green-500 text-white border-round px-2 py-1 text-sm font-bold">
              70
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CityReportCard;
