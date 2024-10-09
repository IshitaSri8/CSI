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
import Arahas from "assets/arahas_logo.png";
import { Building, FileChartPie, LogOut } from "lucide-react";

const CitizenSidebar = () => {
  const [activeTab, setActiveTab] = useState("kyc"); // State for active tab
  const [visible, setVisible] = useState(false);
  const [activeSections, setActiveSections] = useState({
    knowYourCity: false,
    cityReportCard: false,
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
          <img src={Arahas} alt="Arahas" className="w-5rem mb-4" />
          <Button
            icon={<Building size={18} />}
            onClick={() => handleTabClick("kyc")}
            style={{ backgroundColor: "#166c7d", marginBottom: "1rem" }}
            tooltip="Know Your City"
          />
          <Button
            icon={<FileChartPie size={18} />}
            onClick={() => handleTabClick("cityReportCard")}
            style={{ backgroundColor: "#166c7d", marginBottom: "1rem" }}
            tooltip="City Report Card"
          />

          <Button
            icon={<LogOut size={18} />}
            onClick={() => setVisible(true)}
            style={{
              backgroundColor: "#166c7d",
              position: "fixed",
              bottom: "5rem",
              left: "2rem",
            }}
            tooltip="Logout"
          />
          {/* Bottom-right toggle button */}
          <i
            className="pi pi-angle-double-right text-white"
            onClick={() => setVisible(true)}
            style={{
              position: "fixed",
              bottom: "20px",
              left: "4rem",
              cursor: "pointer",
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
              backgroundColor: "#000",
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
          <img src={Arahas} alt="Arahas" className="w-7rem mb-4" />
          <ul className="list-none p-0 m-0" style={{ textDecoration: "none" }}>
            {/* Know Your City Section */}
            <li>
              <div
                style={getTabStyle("kyc")}
                onClick={() => handleTabClick("kyc")}
                className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 no-underline hover:bg-cyan-600 transition-duration-150 transition-colors w-full"
              >
                <Building className="text-white mr-2" />
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
                <FileChartPie className="text-white mr-2" />
                <span className="font-medium text-white">City Report Card</span>
                <Ripple />
              </div>
            </li>
          </ul>

          {/* Bottom-right toggle button for the full sidebar */}
          <i
            className="pi pi-angle-double-left text-white"
            onClick={() => setVisible(false)}
            style={{
              position: "fixed",
              bottom: "20px",
              left: "17rem",
              cursor: "pointer",
            }}
          />
        </div>
      </Sidebar>

      {/* Render components based on activeTab */}
      <div className="content" style={{ marginLeft: "6rem" }}>
        {activeTab === "kyc" && <KnowYourCity />}
        {activeTab === "cityReportCard" && <CityReportCardCitizen />}
      </div>
    </div>
  );
};

export default CitizenSidebar;
