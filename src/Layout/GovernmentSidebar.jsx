import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Ripple } from "primereact/ripple";
import { Button } from "primereact/button";
import "../components/landingPage/Landing.css";

import AQI from "components/Dashboards/Environment/AQI/AQI";
import TempMain from "components/Dashboards/Environment/Temperature/TempMain";
import RainMain from "components/Dashboards/Environment/Rain/RainMain";
import LandMain from "components/Dashboards/Environment/Land/LandMain";
import WaterMain from "components/Dashboards/Environment/Water/WaterMain";
import WasteMain from "components/Dashboards/Environment/Waste/WasteMain";
// import HeaderLogout from "components/HeaderLogout";
import KnowYourCity from "../pages/KnowYourCity";
import TransportDashboard from "components/Dashboards/Transport/TransportDashboard";
import Healthcare from "components/Dashboards/Healthcare";
import CityReportCardCitizen from "pages/CityReportCardCitizen";
import CityReportCardGov from "pages/CityReportCardGov";

const GovernmentSidebar = () => {
  const [activeTab, setActiveTab] = useState("kyc"); // State for active tab
  const [visible, setVisible] = useState(false);
  const [activeSections, setActiveSections] = useState({
    environment: false,
    knowYourCity: false,
    cityReportCard: false,
    social: false,
  });

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
      {/* <HeaderLogout /> */}
      {/* Display icons in the collapsed sidebar */}
      {!visible && (
        <div
          style={{
            width: "6rem", // Adjust the width for the collapsed sidebar
            backgroundColor: "#003940",
            height: "100%",
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
            tooltip="Know your city"
            style={{ backgroundColor: "#166c7d", marginBottom: "1rem" }}
          />
          <Button
            icon="pi pi-file"
            onClick={() => handleTabClick("cityReportCard")}
            tooltip="City Report Card"
            style={{ backgroundColor: "#166c7d", marginBottom: "1rem" }}
          />
          <Button
            icon="pi pi-globe"
            onClick={() => handleTabClick("environment")}
            tooltip="Environment"
            style={{ backgroundColor: "#166c7d", marginBottom: "1rem" }}
          />
          <Button
            icon="pi pi-users"
            onClick={() => handleTabClick("society")}
            tooltip="Society"
            style={{ backgroundColor: "#166c7d", marginBottom: "1rem" }}
          />

          <Button
            icon="pi pi-sign-out"
            onClick={() => setVisible(true)}
            style={{
              backgroundColor: "#166c7d",
              position: "fixed",
              bottom: "5rem",
              left: "1.5rem",
            }}
            tooltip="Logout"
          />

          {/* Bottom-right toggle button */}
          <i
            className="pi pi-angle-double-right"
            onClick={() => setVisible(true)}
            style={{
              color: "white",
              position: "fixed",
              bottom: "20px",
              left: "4rem",
              fontSize: "1rem",
              cursor: "pointer",
              //   border: "1px solid white",
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
            {/* City Report Card */}
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
            {/* Society Section */}
            <li>
              <div
                onClick={() => {
                  toggleSection("society");
                  handleTabClick("society");
                }}
                style={getTabStyle("society")}
                className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 no-underline hover:bg-cyan-600 transition-duration-150 transition-colors w-full"
              >
                <i className="pi pi-users mr-2 text-xl text-white"></i>
                <span className="font-medium text-white">Society</span>
                <i
                  className={`pi pi-chevron-${
                    activeSections.society ? "up" : "down"
                  } ml-auto text-white`}
                ></i>
                <Ripple />
              </div>
              {activeSections.society && (
                <ul className="list-none py-0 pl-3 pr-0 m-0 mt-2">
                  <li>
                    <div
                      style={getTabStyle("transport")}
                      onClick={() => handleTabClick("transport")}
                      className="p-ripple flex align-items-center cursor-pointer p-2 border-round text-700 no-underline hover:bg-cyan-600 transition-duration-150 transition-colors w-full"
                    >
                      <i className="pi pi-cloud mr-2 text-xl text-white"></i>
                      <span className="font-medium text-white">Transport</span>
                      <Ripple />
                    </div>
                  </li>
                  <li>
                    <div
                      style={getTabStyle("healthcare")}
                      onClick={() => handleTabClick("healthcare")}
                      className="p-ripple flex align-items-center cursor-pointer p-2 border-round text-700 no-underline hover:bg-cyan-600 transition-duration-150 transition-colors w-full"
                    >
                      <i className="pi pi-sun mr-2 text-xl text-white"></i>
                      <span className="font-medium text-white">Healthcare</span>
                      <Ripple />
                    </div>
                  </li>
                </ul>
              )}
            </li>
          </ul>

          {/* Bottom-right toggle button for the full sidebar */}
          <i
            className="pi pi-angle-double-left"
            onClick={() => setVisible(false)}
            style={{
              color: "white",
              cursor: "pointer",
              fontSize: "1rem",
              position: "fixed",
              bottom: "20px",
              left: "17rem",
            }}
          />
        </div>
      </Sidebar>

      {/* Render components based on activeTab */}
      <div className="content" style={{ marginLeft: "6rem" }}>
        {activeTab === "kyc" && <KnowYourCity />}
        {activeTab === "cityReportCard" && <CityReportCardGov />}
        {activeTab === "aqi" && <AQI />}
        {activeTab === "temperature" && <TempMain />}
        {activeTab === "rain" && <RainMain />}
        {activeTab === "land" && <LandMain />}
        {activeTab === "water" && <WaterMain />}
        {activeTab === "waste" && <WasteMain />}

        {activeTab === "transport" && <TransportDashboard />}
        {activeTab === "healthcare" && <Healthcare />}
      </div>
    </div>
  );
};

export default GovernmentSidebar;
