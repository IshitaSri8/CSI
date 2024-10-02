import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/KnowYourCity/Footer";
import { ParetoChart } from "./GraphVisuals";
import sum_img from "./assets/plus.png";
import equal_img from "./assets/equal.png";
import esg from "./assets/ESG_ESG.png";
import renewable from "./assets/renewable-energy.png";
import air from "./assets/air.png";
import water from "./assets/water.png";
import earth from "./assets/earth.png";
import climate from "./assets/climate.png";
import n from "./assets/n-letter.png";
import s from "./assets/s-letter.png";
import a from "./assets/a.png";
import home from "./assets/home.png";
import health from "./assets/healthcare.png";
import transport from "./assets/transport.png";
import cultue from "./assets/culture.png";
import gov from "./assets/governance.png";
import rights from "./assets/human-rights.png";
import corruption from "./assets/corruption.png";

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

  const handleEClick = () => {
    navigate("/csi/report-map-page");
  };

  return (
    <div className="admin-main">
      <div className="admin-sub-container">
        <div className="admin-left">
          <div className="row-1">
            <div className="row-1-cols">
              <div className="indicator">
                <div className="name-container">
                  <div
                    className={`indicator-name ${activeTab === "E" ? "tab-active" : ""}`}
                    onClick={() => handleTabClick("E")}
                  >
                    <img src={n} style={{ height: "2vw", width: "2vw" }} alt="nature" />
                    <h1>Nature</h1>
                    <span
                      style={{
                        backgroundColor: "#00A269",
                        borderRadius: "100%",
                        fontSize: "0.8vw",
                        fontWeight: "700",
                        padding: "0.4vw 0.5vw",
                        color: "white",
                      }}
                    >
                      80
                    </span>
                  </div>
                  <div
                    className={`indicator-name ${activeTab === "S" ? "tab-active" : ""}`}
                    onClick={() => handleTabClick("S")}
                  >
                    <img src={s} style={{ height: "2vw", width: "2vw" }} alt="society" />
                    <h1>Society</h1>
                    <span
                      style={{
                        backgroundColor: "#00A269",
                        borderRadius: "100%",
                        fontSize: "0.8vw",
                        fontWeight: "700",
                        padding: "0.4vw 0.5vw",
                        color: "white",
                      }}
                    >
                      60
                    </span>
                  </div>
                  <div
                    className={`indicator-name ${activeTab === "G" ? "tab-active" : ""}`}
                    onClick={() => handleTabClick("G")}
                  >
                    <img src={a} style={{ height: "2vw", width: "2vw" }}  alt="administration"/>
                    <h1>Administration</h1>
                    <span
                      style={{
                        backgroundColor: "#00A269",
                        borderRadius: "100%",
                        fontSize: "0.8vw",
                        fontWeight: "700",
                        padding: "0.4vw 0.5vw",
                        color: "white",
                      }}
                    >
                      70
                    </span>
                  </div>
                </div>
                <div className="content">
                  {activeTab === "E" && indicators.E.map((indicator, index) => (
                    <div key={index} className="indicator-box">
                      <img src={indicator.icon} style={{ height: "2.5vw", width: "2.5vw" }} />
                      <span>{indicator.text}</span>
                    </div>
                  ))}
                  {activeTab === "S" && indicators.S.map((indicator, index) => (
                    <div key={index} className="indicator-box">
                      <img src={indicator.icon} style={{ height: "3vw", width: "3vw" }} />
                      <span>{indicator.text}</span>
                    </div>
                  ))}
                  {activeTab === "G" && indicators.G.map((indicator, index) => (
                    <div key={index} className="indicator-box">
                      <img src={indicator.icon} style={{ height: "3vw", width: "3vw" }} />
                      <span>{indicator.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="row-2-top">
            <div className="row-2">
              <ParetoChart
                title={categories[selectedCategory].title}
                categories={[
                  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                ]}
                data={categories[selectedCategory].data}
                height="160"
                width="400"
                xtitle=""
                ytitle=""
              />
            </div>
            <div className="admin-total-score" onClick={handleTotalScoreClick}>
              <div className="Summary">
                <img src={n} className="letter" alt="E" />
                <img src={sum_img} className="operator" alt="+" />
                <img src={s} className="letter" alt="S" />
                <img src={sum_img} className="operator" alt="+" />
                <img src={a} className="letter" alt="G" />
                <img src={equal_img} className="operator" alt="=" />
                <img src={esg} className="esg" alt="ESG" style={{ height: "4vw", width: "4vw" }} />
              </div>
              <h1>Overall Score</h1>
              <h2>70</h2>
              <p>Click to View Individual Scores</p>
            </div>
          </div>
        </div>
        <div className="admin-right">
          <div className="improvement">
            <h1><span>Summary</span></h1>
            <ul>
              <li>
                The score 70 is combined output of all the indicators falling under SDG 11. This score indicates the actual picture of City Ayodhya and also the areas where improvements are required.
              </li>
              <li>
                CSI serves as a benchmarking tool, allowing cities to compare their sustainability performance with peers regionally and globally, fostering healthy competition and knowledge exchange.
              </li>
              <li>
                CSI promotes integrated and balanced urban development strategies.
              </li>
            </ul>
            <h1><span>Areas of Improvement</span></h1>
            <ul>
              <li>Air Quality</li>
              <li>Green space</li>
              <li>Land Use</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CityReportCard;
