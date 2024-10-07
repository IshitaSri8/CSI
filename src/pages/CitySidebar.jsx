import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Ripple } from "primereact/ripple";
import { Button } from "primereact/button";
import "../components/landingPage/Landing.css";
import CityDemographics from "components/knowYourCity/CityDemographics";
import AqiDashboard from "components/Dashboards/Environment/AQI/AqiDashboard";
import TempDashboard from "components/Dashboards/Environment/Temperature/TempDashboard";
import LandDashboard from "components/Dashboards/Environment/Land/LandDashboard";
import RainDashboard from "components/Dashboards/Environment/Rain/RainDashboard";
import WaterDashboard from "components/Dashboards/Environment/Water/WaterDashboard";
import Waste from "components/Dashboards/Environment/Waste/WasteDashboard";
import CityReportCard from "./CityReportCard";
import AQI from "components/Dashboards/Environment/AQI/AQI";
import TempMain from "components/Dashboards/Environment/Temperature/TempMain";
import RainMain from "components/Dashboards/Environment/Rain/RainMain";
import LandMain from "components/Dashboards/Environment/Land/LandMain";
import WaterMain from "components/Dashboards/Environment/Water/WaterMain";
import WasteMain from "components/Dashboards/Environment/Waste/WasteMain";
import HeaderLogout from "components/HeaderLogout";

const CitySidebar = () => {
<<<<<<< HEAD
  const [visible, setVisible] = useState(false); // Sidebar visibility
  const [activeSections, setActiveSections] = useState({
    cityReportCard: false,
    environment: false,
  });
  const [activeTab, setActiveTab] = useState(""); // State for active tab
  const [aqiValue, setAqiValue] = useState(null);
  const [pm25Value, setPM25Value] = useState(null);
  const [pm10Value, setPM10Value] = useState(null);
  const [tempValue, setTempValue] = useState(null);
  const [humidityValue, setHumidityValue] = useState(null);
=======
    const [visible, setVisible] = useState(false);
    const [activeSections, setActiveSections] = useState({
        environment: false,
        knowYourCity: false,
        cityReportCard: false,
        social: false,
    });
>>>>>>> b1311c0ff98518bcbf8ec1416b3e0c3c6c47c3db

  const handleAqiData = (data) => {
    setAqiValue(data.aqiValue);
    setPM25Value(data.pm25Value);
    setPM10Value(data.pm10Value);
  };
  const handleTempData = (data) => {
    setTempValue(data.tempValue);
    setHumidityValue(data.humidityValue);
  };
  const toggleSection = (section) => {
    setActiveSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab); // Set the clicked tab as active
    setVisible(true); // Show the sidebar when a tab is clicked
  };

  const getTabStyle = (tab) => ({
    backgroundColor: activeTab === tab ? "#166c7d" : "#003940",
    borderRight: activeTab === tab ? "5px solid orange" : "none",
  });

  return (
    <div className="">
      <HeaderLogout />
      {/* Display icons in the collapsed sidebar */}
      {!visible && (
        <div
          style={{
            width: "6rem", // Adjust the width for the collapsed sidebar
            backgroundColor: "#003940",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "1rem", // This causes the top margin/padding
            position: "fixed", // For positioning the toggle button at the bottom
          }}
        >
          <Button
            icon="pi pi-search"
            onClick={() => handleTabClick("kyc")}
            style={{ backgroundColor: "#166c7d", marginBottom: "1rem" }}
          />
          <Button
            icon="pi pi-file"
            onClick={() => handleTabClick("cityReportCard")}
            style={{ backgroundColor: "#166c7d", marginBottom: "1rem" }}
          />
          <Button
            icon="pi pi-globe"
            onClick={() => handleTabClick("environment")}
            style={{ backgroundColor: "#166c7d" }}
          />
          {/* Bottom-right toggle button */}
          <Button
            icon="pi pi-angle-double-right"
            onClick={() => setVisible(true)}
            style={{
              backgroundColor: "#166c7d",
              position: "fixed",
              bottom: "20px",
              left: "1rem",
            }}
          />
        </div>
      )}

      {/* Full Sidebar */}
      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        position="left"
        header={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#003940",
            }}
          ></div>
        }
      >
        <div
          style={{
            backgroundColor: "#003940",
            padding: "1rem",
            height: "100vh",
            position: "relative", // For positioning the toggle button
          }}
        >
          <ul className="list-none p-0 m-0" style={{ textDecoration: "none" }}>
            {/* Know Your City Section */}
            <li>
              <div
                style={getTabStyle("kyc")}
                onClick={() => handleTabClick("kyc")}
                className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 no-underline hover:bg-cyan-600 transition-duration-150 transition-colors w-full"
              >
                <i className="pi pi-compass mr-2 text-xl text-white"></i>
                <span className="font-medium text-white">Know Your City</span>
                <Ripple />
              </div>
            </li>
            <li>
              <div
                style={getTabStyle("cityReportCard")}
                onClick={() => handleTabClick("cityReportCard")}
                className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 no-underline hover:bg-cyan-600 transition-duration-150 transition-colors w-full"
              >
                <i className="pi pi-file mr-2 text-xl text-white"></i>
                <span className="font-medium text-white">City Report Card</span>
                <Ripple />
              </div>
            </li>

            {/* Environment Section */}
            <li>
              <div
                onClick={() => {
                  toggleSection("environment");
                  handleTabClick("environment");
                }}
                style={getTabStyle("environment")}
                className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 no-underline hover:bg-cyan-600 transition-duration-150 transition-colors w-full"
              >
                <i className="pi pi-globe mr-2 text-xl text-white"></i>
                <span className="font-medium text-white">Environment</span>
                <i
                  className={`pi pi-chevron-${
                    activeSections.environment ? "up" : "down"
                  } ml-auto text-white`}
                ></i>
                <Ripple />
              </div>
              {activeSections.environment && (
                <ul className="list-none py-0 pl-3 pr-0 m-0 mt-2">
                  <li>
                    <div
                      style={getTabStyle("aqi")}
                      onClick={() => handleTabClick("aqi")}
                      className="p-ripple flex align-items-center cursor-pointer p-2 border-round text-700 no-underline hover:bg-cyan-600 transition-duration-150 transition-colors w-full"
                    >
                      <i className="pi pi-cloud mr-2 text-xl text-white"></i>
                      <span className="font-medium text-white">AQI</span>
                      <Ripple />
                    </div>
                  </li>
                  <li>
                    <div
                      style={getTabStyle("temperature")}
                      onClick={() => handleTabClick("temperature")}
                      className="p-ripple flex align-items-center cursor-pointer p-2 border-round text-700 no-underline hover:bg-cyan-600 transition-duration-150 transition-colors w-full"
                    >
                      <i className="pi pi-sun mr-2 text-xl text-white"></i>
                      <span className="font-medium text-white">
                        Temperature
                      </span>
                      <Ripple />
                    </div>
                  </li>
                  <li>
                    <div
                      style={getTabStyle("rain")}
                      onClick={() => handleTabClick("rain")}
                      className="p-ripple flex align-items-center cursor-pointer p-2 border-round text-700 no-underline hover:bg-cyan-600 transition-duration-150 transition-colors w-full"
                    >
                      <i className="pi pi-cloud mr-2 text-xl text-white"></i>
                      <span className="font-medium text-white">Rainfall</span>
                      <Ripple />
                    </div>
                  </li>
                  <li>
                    <div
                      style={getTabStyle("land")}
                      onClick={() => handleTabClick("land")}
                      className="p-ripple flex align-items-center cursor-pointer p-2 border-round text-700 no-underline hover:bg-cyan-600 transition-duration-150 transition-colors w-full"
                    >
                      <i className="pi pi-map mr-2 text-xl text-white"></i>
                      <span className="font-medium text-white">Land</span>
                      <Ripple />
                    </div>
                  </li>

                  <li>
                    <div
                      style={getTabStyle("water")}
                      onClick={() => handleTabClick("water")}
                      className="p-ripple flex align-items-center cursor-pointer p-2 border-round text-700 no-underline hover:bg-cyan-600 transition-duration-150 transition-colors w-full"
                    >
                      <i className="pi pi-cloud mr-2 text-xl text-white"></i>
                      <span className="font-medium text-white">Water</span>
                      <Ripple />
                    </div>
                  </li>
                  <li>
                    <div
                      style={getTabStyle("waste")}
                      onClick={() => handleTabClick("waste")}
                      className="p-ripple flex align-items-center cursor-pointer p-2 border-round text-700 no-underline hover:bg-cyan-600 transition-duration-150 transition-colors w-full"
                    >
                      <i className="pi pi-cloud mr-2 text-xl text-white"></i>
                      <span className="font-medium text-white">Waste</span>
                      <Ripple />
                    </div>
                  </li>
                </ul>
              )}
            </li>
          </ul>

          {/* Bottom-right toggle button for the full sidebar */}
          <Button
            icon="pi pi-angle-double-left"
            onClick={() => setVisible(false)}
            style={{
              backgroundColor: "#166c7d",
              position: "fixed",
              bottom: "20px",
              left: "15rem",
            }}
          />
        </div>
      </Sidebar>

      {/* Render components based on activeTab */}
      <div className="content" style={{ marginLeft: "6rem" }}>
        {activeTab === "kyc" && <CityDemographics />}
        {activeTab === "cityReportCard" && <CityReportCard />}
        {activeTab === "aqi" && <AQI />}
        {activeTab === "temperature" && <TempMain />}
        {activeTab === "land" && <LandMain />}
        {activeTab === "rain" && <RainMain />}
        {activeTab === "water" && <WaterMain />}
        {activeTab === "waste" && <WasteMain />}
      </div>
    </div>
  );
};

export default CitySidebar;
