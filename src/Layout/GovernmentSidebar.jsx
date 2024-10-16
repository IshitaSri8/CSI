import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Ripple } from "primereact/ripple";
import { Button } from "primereact/button";
import "../components/landingPage/Landing.css";

import RainMain from "components/Dashboards/Environment/Rain/RainMain";
import LandMain from "components/Dashboards/Environment/Land/LandMain";
import WaterMain from "components/Dashboards/Environment/Water/WaterMain";
import WasteMain from "components/Dashboards/Environment/Waste/WasteMain";
// import HeaderLogout from "components/HeaderLogout";
import KnowYourCity from "../pages/KnowYourCity";
import TransportDashboard from "components/Dashboards/Society/Transport/TransportDashboard";
import Healthcare from "components/Dashboards/Society/Healthcare";
import CityReportCardGov from "pages/CityReportCardGov";
import { BreadCrumb } from "primereact/breadcrumb";
import { useNavigate } from "react-router-dom";
import {
  BookOpenText,
  BriefcaseBusiness,
  Building,
  Bus,
  CloudHail,
  Droplet,
  EarthLock,
  FileChartPie,
  HeartPulse,
  Landmark,
  LandPlot,
  LogOut,
  Sprout,
  ThermometerSun,
  Trash,
  Users,
  Wind,
} from "lucide-react";
import AqiDashboard from "components/Dashboards/Environment/AQI/AqiDashboard";
import Arahas from "assets/arahas_logo.png";
import TempDashboard from "components/Dashboards/Environment/Temperature/TempDashboard";
import EducationDashboard from "components/Dashboards/Society/Education/EducationDashboard";

const GovernmentSidebar = () => {
  const [activeTab, setActiveTab] = useState("kyc"); // State for active tab
  const [visible, setVisible] = useState(false);
  const [activeSections, setActiveSections] = useState({
    environment: false,
    knowYourCity: false,
    cityReportCard: false,
    society: false,
    governance: false,
  });
  const navigate = useNavigate(); // For navigation
  const toggleSection = (section) => {
    setActiveSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab); // Set the clicked tab as active
    setVisible(false); // Show the sidebar when a tab is clicked
  };

  const getTabStyle = (tab) => ({
    backgroundColor: activeTab === tab ? "#69ABB9" : "#003940",
    borderRight: activeTab === tab ? "5px solid #F9C849" : "none",
  });

  const activeTabStyle = (tab) => ({
    backgroundColor: activeTab === tab ? "#69ABB9" : "#003940",
    border: activeTab === tab ? "#F9C849" : "none",
  });

  // Dynamically assign breadcrumb items based on the active tab
  const breadcrumbItems =
    activeTab === "kyc"
      ? [
          { label: "CSI For Government", url: "/government" },
          { label: "Know Your City" },
        ]
      : activeTab === "cityReportCard"
      ? [
          { label: "CSI For Government", url: "/government" },
          { label: "City Report Card" },
        ]
      : activeTab === "aqi"
      ? [
          { label: "CSI For Government", url: "/government" },
          { label: "Nature" },
          { label: "AQI" },
        ]
      : activeTab === "temperature"
      ? [
          { label: "CSI For Government", url: "/government" },
          { label: "Nature" },
          { label: "Temperature" },
        ]
      : activeTab === "rain"
      ? [
          { label: "CSI For Government", url: "/government" },
          { label: "Nature" },

          { label: "Rainfall" },
        ]
      : activeTab === "land"
      ? [
          { label: "CSI For Government", url: "/government" },
          { label: "Nature" },
          { label: "Land Use" },
        ]
      : activeTab === "water"
      ? [
          { label: "CSI For Government", url: "/government" },
          { label: "Nature" },
          { label: "Water Quality" },
        ]
      : activeTab === "waste"
      ? [
          { label: "CSI For Government", url: "/government" },
          { label: "Nature" },
          { label: "Waste Management" },
        ]
      : activeTab === "transport"
      ? [
          { label: "CSI For Government", url: "/government" },
          { label: "Society" },
          { label: "Transport" },
        ]
      : activeTab === "healthcare"
      ? [
          { label: "CSI For Government", url: "/government" },
          { label: "Society" },
          { label: "Healthcare" },
        ]
      : activeTab === "education"
      ? [
          { label: "CSI For Government", url: "/government" },
          { label: "Society" },
          { label: "Education" },
        ]
      : activeTab === "employment"
      ? [
          { label: "CSI For Government", url: "/government" },
          { label: "Society" },
          { label: "Employment" },
        ]
      : activeTab === "cultural"
      ? [
          { label: "CSI For Government", url: "/government" },
          { label: "Society" },
          { label: "Cultural Preservation" },
        ]
      : [];

  const home = {
    icon: "pi pi-home",
    url: "/",
    className: "font-bold text-cyan-800",
  };

  const onBreadcrumbClick = (url) => {
    navigate(url); // Navigate to the URL when breadcrumb is clicked
  };

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
          <img src={Arahas} alt="Arahas" className="w-5rem mb-4" />
          <Button
            icon={<Building size={18} />}
            onClick={() => handleTabClick("kyc")}
            tooltip="Know your city"
            style={activeTabStyle("gov")}
            className="border-none border-round-lg mb-2"
          />
          <Button
            icon={<FileChartPie size={18} />}
            onClick={() => handleTabClick("cityReportCard")}
            tooltip="City Report Card"
            style={activeTabStyle("gov")}
            className="border-none border-round-lg mb-2"
          />
          <Button
            icon={<Sprout size={18} />}
            onClick={() => setVisible(true)}
            tooltip="Nature"
            style={activeTabStyle("gov")}
            className="border-none border-round-lg mb-2"
          />
          <Button
            icon={<Users size={18} />}
            onClick={() => setVisible(true)}
            tooltip="Society"
            style={activeTabStyle("gov")}
            className="border-none border-round-lg mb-2"
          />

          <Button
            icon={<Landmark size={20} />}
            onClick={() => setVisible(true)}
            tooltip="Governance"
            style={activeTabStyle("gov")}
            className="border-none border-round-lg"
          />

          <Button
            icon={<LogOut size={20} />}
            onClick={() => setVisible(true)}
            className="border-none border-round-lg"
            style={{
              backgroundColor: "transparent",
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
          <img src={Arahas} alt="Arahas" className="w-8rem mb-2" />
          <ul className="list-none p-0 m-0" style={{ textDecoration: "none" }}>
            {/* Know Your City Section */}
            <li>
              <div
                style={getTabStyle("kyc")}
                onClick={() => handleTabClick("kyc")}
                className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 no-underline hover:bg-cyan-600 transition-duration-150 transition-colors w-full"
              >
                <Building className="text-white mr-2" size={20} />
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
                <FileChartPie className="text-white mr-2" size={20} />
                <span className="font-medium text-white">City Report Card</span>
                <Ripple />
              </div>
            </li>

            {/* Environment Section */}
            <li>
              <div
                onClick={() => {
                  setVisible(true);
                  toggleSection("environment");
                  // handleTabClick("environment");
                }}
                style={getTabStyle("environment")}
                className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 no-underline hover:bg-cyan-600 transition-duration-150 transition-colors w-full"
              >
                <Sprout className="text-white mr-2" size={20} />
                <span className="font-medium text-white">Nature</span>
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
                      className="p-ripple flex align-items-center cursor-pointer p-2  border-round text-700 no-underline hover:bg-cyan-600 transition-duration-150 transition-colors ml-4"
                    >
                      {/* <i className="pi pi-cloud mr-2 text-xl text-white"></i> */}
                      <Wind className="text-white mr-2" size={15} />
                      <span className="font-medium text-sm text-white">
                        AQI
                      </span>
                      <Ripple />
                    </div>
                  </li>
                  <li>
                    <div
                      style={getTabStyle("temperature")}
                      onClick={() => handleTabClick("temperature")}
                      className="p-ripple flex align-items-center cursor-pointer p-2 ml-4 border-round text-700 no-underline hover:bg-cyan-600 transition-duration-150 transition-colors"
                    >
                      <ThermometerSun className="text-white mr-2" size={15} />
                      <span className="font-medium text-sm text-white">
                        Temperature
                      </span>
                      <Ripple />
                    </div>
                  </li>
                  <li>
                    <div
                      style={getTabStyle("rain")}
                      onClick={() => handleTabClick("rain")}
                      className="p-ripple flex align-items-center cursor-pointer p-2 ml-4 border-round text-700 no-underline hover:bg-cyan-600 transition-duration-150 transition-colors"
                    >
                      <CloudHail className="text-white mr-2" size={15} />
                      <span className="font-medium text-sm text-white">
                        Rainfall
                      </span>
                      <Ripple />
                    </div>
                  </li>
                  <li>
                    <div
                      style={getTabStyle("land")}
                      onClick={() => handleTabClick("land")}
                      className="p-ripple flex align-items-center cursor-pointer p-2 ml-4 border-round text-700 no-underline hover:bg-cyan-600 transition-duration-150 transition-colors"
                    >
                      <LandPlot className="text-white mr-2" size={15} />
                      {/* <i className="pi pi-map mr-2 text-xl text-white"></i> */}
                      <span className="font-medium text-sm text-white">
                        Land
                      </span>
                      <Ripple />
                    </div>
                  </li>

                  <li>
                    <div
                      style={getTabStyle("water")}
                      onClick={() => handleTabClick("water")}
                      className="p-ripple flex align-items-center cursor-pointer p-2 ml-4 border-round text-700 no-underline hover:bg-cyan-600 transition-duration-150 transition-colors"
                    >
                      <Droplet className="text-white mr-2" size={15} />
                      {/* <i className="pi pi-cloud mr-2 text-xl text-white"></i> */}
                      <span className="font-medium text-sm text-white">
                        Water
                      </span>
                      <Ripple />
                    </div>
                  </li>
                  <li>
                    <div
                      style={getTabStyle("waste")}
                      onClick={() => handleTabClick("waste")}
                      className="p-ripple flex align-items-center cursor-pointer p-2 ml-4 border-round text-700 no-underline hover:bg-cyan-600 transition-duration-150 transition-colors"
                    >
                      <Trash className="text-white mr-2" size={15} />
                      <span className="font-medium text-sm text-white">
                        Waste
                      </span>
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
                  //  handleTabClick("society");
                  setVisible(true);
                }}
                style={getTabStyle("society")}
                className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 no-underline hover:bg-cyan-600 transition-duration-150 transition-colors"
              >
                <Users className="text-white mr-2" size={20} />
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
                      className="p-ripple flex align-items-center cursor-pointer p-2 ml-4 border-round text-700 no-underline hover:bg-cyan-600 transition-duration-150 transition-colors"
                    >
                      <Bus className="text-white mr-2" size={15} />
                      <span className="font-medium text-sm text-white">
                        Transport
                      </span>
                      <Ripple />
                    </div>
                  </li>
                  <li>
                    <div
                      style={getTabStyle("healthcare")}
                      onClick={() => handleTabClick("healthcare")}
                      className="p-ripple flex align-items-center cursor-pointer p-2 ml-4 border-round text-700 no-underline hover:bg-cyan-600 transition-duration-150 transition-colors"
                    >
                      <HeartPulse className="text-white mr-2" size={15} />
                      <span className="font-medium text-sm text-white">
                        Healthcare
                      </span>
                      <Ripple />
                    </div>
                  </li>
                  <li>
                    <div
                      style={getTabStyle("education")}
                      onClick={() => handleTabClick("education")}
                      className="p-ripple flex align-items-center cursor-pointer p-2 ml-4 border-round text-700 no-underline hover:bg-cyan-600 transition-duration-150 transition-colors"
                    >
                      <BookOpenText className="text-white mr-2" size={15} />
                      <span className="font-medium text-sm text-white">
                        Education
                      </span>
                      <Ripple />
                    </div>
                  </li>
                  <li>
                    <div
                      style={getTabStyle("employment")}
                      onClick={() => handleTabClick("employment")}
                      className="p-ripple flex align-items-center cursor-pointer p-2 ml-4 border-round text-700 no-underline hover:bg-cyan-600 transition-duration-150 transition-colors"
                    >
                      <BriefcaseBusiness
                        className="text-white mr-2"
                        size={15}
                      />
                      <span className="font-medium text-sm text-white">
                        Employment
                      </span>
                      <Ripple />
                    </div>
                  </li>
                  <li>
                    <div
                      style={getTabStyle("cultural")}
                      onClick={() => handleTabClick("cultural")}
                      className="p-ripple flex align-items-center cursor-pointer p-2 ml-4 border-round text-700 no-underline hover:bg-cyan-600 transition-duration-150 transition-colors"
                    >
                      <EarthLock className="text-white mr-2" size={15} />
                      <span className="font-medium text-sm text-white">
                        Cultural Preservation
                      </span>
                      <Ripple />
                    </div>
                  </li>
                  <li>
                    <div
                      style={getTabStyle("community")}
                      onClick={() => handleTabClick("community")}
                      className="p-ripple flex align-items-center cursor-pointer p-2 ml-4 border-round text-700 no-underline hover:bg-cyan-600 transition-duration-150 transition-colors"
                    >
                      <EarthLock className="text-white mr-2" size={15} />
                      <span className="font-medium text-sm text-white">
                        Community Engagement & Holistic Well-Being
                      </span>
                      <Ripple />
                    </div>
                  </li>
                </ul>
              )}
            </li>
            {/* Governance Section */}
            <li>
              <div
                onClick={() => {
                  toggleSection("governance");
                  //  handleTabClick("governance");
                  setVisible(true);
                }}
                style={getTabStyle("governance")}
                className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 no-underline hover:bg-cyan-600 transition-duration-150 transition-colors"
              >
                <Landmark className="text-white mr-2" size={20} />
                <span className="font-medium text-white">Governance</span>
                <i
                  className={`pi pi-chevron-${
                    activeSections.governance ? "up" : "down"
                  } ml-auto text-white`}
                ></i>
                <Ripple />
              </div>
              {activeSections.governance && (
                <ul className="list-none py-0 pl-3 pr-0 m-0 mt-2">
                  <li>
                    <div
                      style={getTabStyle("transport")}
                      onClick={() => handleTabClick("transport")}
                      className="p-ripple flex align-items-center cursor-pointer p-2 ml-4 border-round text-700 no-underline hover:bg-cyan-600 transition-duration-150 transition-colors"
                    >
                      <Bus className="text-white mr-2" size={15} />
                      <span className="font-medium text-sm text-white">
                        Disaster Management
                      </span>
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

      {/* Breadcrumb */}
      <BreadCrumb
        model={breadcrumbItems.map((item) => ({
          ...item,
          command: () => onBreadcrumbClick(item.url),
          // style: {
          //   color: item.isSelected ? "#69ABB9" : "inherit", // Change color if selected
          //   fontWeight: item.isSelected ? "bold" : "normal", // Optional: make the text bold
          // },
        }))}
        home={home}
        style={{
          marginLeft: "6rem",
        }}
      />

      {/* Render components based on activeTab */}
      <div className="content" style={{ marginLeft: "6rem" }}>
        {activeTab === "kyc" && <KnowYourCity />}
        {activeTab === "cityReportCard" && <CityReportCardGov />}
        {activeTab === "aqi" && <AqiDashboard show={true} />}
        {activeTab === "temperature" && <TempDashboard show={true} />}
        {activeTab === "rain" && <RainMain />}
        {activeTab === "land" && <LandMain />}
        {activeTab === "water" && <WaterMain />}
        {activeTab === "waste" && <WasteMain />}

        {activeTab === "transport" && <TransportDashboard />}
        {activeTab === "healthcare" && <Healthcare />}
        {activeTab === "education" && <EducationDashboard />}
      </div>
    </div>
  );
};

export default GovernmentSidebar;
