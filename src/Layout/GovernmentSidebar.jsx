import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Ripple } from "primereact/ripple";
import { Button } from "primereact/button";
import "../components/landingPage/Landing.css";

import KnowYourCity from "../pages/KnowYourCity";
import TransportDashboard from "components/Dashboards/Society/Transport/TransportDashboard";
import Healthcare from "components/Dashboards/Society/Healthcare/Healthcare";
import CityReportCardGov from "pages/CityReportCardGov";
import { BreadCrumb } from "primereact/breadcrumb";
import { useNavigate } from "react-router-dom";
import {
  Ambulance,
  BookOpenText,
  BriefcaseBusiness,
  Building,
  Bus,
  CloudHail,
  Droplet,
  EarthLock,
  FileChartPie,
  HeartHandshake,
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
import RainDashboard from "components/Dashboards/Environment/Rain/RainDashboard";
import Culture from "components/Dashboards/Society/Culture/Culture";
import Community from "components/Dashboards/Society/Community/Community";
import Disaster from "components/Dashboards/Administration/Disaster Management/Disaster";
import Employment from "components/Dashboards/Society/Employment/Employment";
import WasteDashboard from "components/Dashboards/Environment/Waste/WasteDashboard";
import WaterDashboard from "components/Dashboards/Environment/Water/WaterDashboard";
import Land from "components/Dashboards/Environment/Land/Land";
import EducationDashboard from "components/Dashboards/Society/Education/EducationDashboard";
import Transport from "components/Dashboards/Society/Transport/Transport/Transport";

const GovernmentSidebar = () => {
  const [activeTab, setActiveTab] = useState("kyc"); // State for active tab
  const [visible, setVisible] = useState(false);
  const [activeSections, setActiveSections] = useState({
    environment: false,
    knowYourCity: false,
    cityReportCard: false,
    society: false,
    administration: false,
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
          { label: "Land Usage" },
        ]
      : activeTab === "water"
      ? [
          { label: "CSI For Government", url: "/government" },
          { label: "Nature" },
          { label: "Water Management" },
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
          { label: "Employment Opportunity" },
        ]
      : activeTab === "cultural"
      ? [
          { label: "CSI For Government", url: "/government" },
          { label: "Society" },
          { label: "Cultural Preservation" },
        ]
      : activeTab === "community"
      ? [
          { label: "CSI For Government", url: "/government" },
          { label: "Society" },
          { label: "Community Enagagement & Holistic Well-Being" },
        ]
      : activeTab === "disaster"
      ? [
          { label: "CSI For Government", url: "/government" },
          { label: "Administration" },
          { label: "Disaster Management" },
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
            style={activeTabStyle("kyc")}
            className="border-none border-round-lg mb-2"
          />
          <Button
            icon={<FileChartPie size={18} />}
            onClick={() => handleTabClick("cityReportCard")}
            tooltip="City Report Card"
            style={activeTabStyle("cityReportCard")}
            className="border-none border-round-lg mb-2"
          />
          <Button
            icon={<Sprout size={18} />}
            onClick={() => setVisible(true)}
            tooltip="Nature"
            style={activeTabStyle("environment")}
            className="border-none border-round-lg mb-2"
          />
          <Button
            icon={<Users size={18} />}
            onClick={() => setVisible(true)}
            tooltip="Society"
            style={activeTabStyle("society")}
            className="border-none border-round-lg mb-2"
          />

          <Button
            icon={<Landmark size={20} />}
            onClick={() => setVisible(true)}
            tooltip="Administration"
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
        style={{
          backgroundColor: "#003940",
          overflowY: "auto", // Hide vertical scrollbar
        }}
      >
        <div
          style={{
            backgroundColor: "#003940",
            padding: "1rem",
            height: "100vh",
            position: "relative", // For positioning the toggle button
          }}
        >
          <img
            src={Arahas}
            alt="Arahas"
            className="w-9rem"
            style={{ position: "fixed", top: "1rem" }}
          />
          <ul
            className="list-none"
            style={{
              paddingTop: "2rem", // Add some padding to avoid overlapping the icon
              textDecoration: "none",
              overflowY: "auto", // Enable scrolling for the list items
              height: "calc(100vh - 8rem)", // Adjust the height to leave space for the toggle button
              scrollbarWidth: "none", // For Firefox
              // msOverflowStyle: "none", // For Internet Explorer and Edge
            }}
          >
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
                      className="p-ripple flex align-items-center cursor-pointer p-2  border-round text-700 no-underline hover:bg-cyan-600 transition-duration-150 transition-colors ml-2"
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
                      className="p-ripple flex align-items-center cursor-pointer p-2 ml-2 border-round text-700 no-underline hover:bg-cyan-600 transition-duration-150 transition-colors"
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
                      className="p-ripple flex align-items-center cursor-pointer p-2 ml-2 border-round text-700 no-underline hover:bg-cyan-600 transition-duration-150 transition-colors"
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
                      className="p-ripple flex align-items-center cursor-pointer p-2 ml-2 border-round text-700 no-underline hover:bg-cyan-600 transition-duration-150 transition-colors"
                    >
                      <LandPlot className="text-white mr-2" size={15} />
                      {/* <i className="pi pi-map mr-2 text-xl text-white"></i> */}
                      <span className="font-medium text-sm text-white">
                        Land Usage
                      </span>
                      <Ripple />
                    </div>
                  </li>

                  <li>
                    <div
                      style={getTabStyle("water")}
                      onClick={() => handleTabClick("water")}
                      className="p-ripple flex align-items-center cursor-pointer p-2 ml-2 border-round text-700 no-underline hover:bg-cyan-600 transition-duration-150 transition-colors"
                    >
                      <Droplet className="text-white mr-2" size={15} />
                      {/* <i className="pi pi-cloud mr-2 text-xl text-white"></i> */}
                      <span className="font-medium text-sm text-white">
                        Water Management
                      </span>
                      <Ripple />
                    </div>
                  </li>
                  <li>
                    <div
                      style={getTabStyle("waste")}
                      onClick={() => handleTabClick("waste")}
                      className="p-ripple flex align-items-center cursor-pointer p-2 ml-2 border-round text-700 no-underline hover:bg-cyan-600 transition-duration-150 transition-colors"
                    >
                      <Trash className="text-white mr-2" size={15} />
                      <span className="font-medium text-sm text-white">
                        Waste Management
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
                      className="p-ripple flex align-items-center cursor-pointer p-2 ml-2 border-round text-700 no-underline hover:bg-cyan-600 transition-duration-150 transition-colors"
                    >
                      <Bus className="text-white mr-2" size={15} />
                      <span className="font-medium text-sm text-white">
                        Public Transport
                      </span>
                      <Ripple />
                    </div>
                  </li>
                  <li>
                    <div
                      style={getTabStyle("healthcare")}
                      onClick={() => handleTabClick("healthcare")}
                      className="p-ripple flex align-items-center cursor-pointer p-2 ml-2 border-round text-700 no-underline hover:bg-cyan-600 transition-duration-150 transition-colors"
                    >
                      <Ambulance className="text-white mr-2" size={15} />
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
                      className="p-ripple flex align-items-center cursor-pointer p-2 ml-2 border-round text-700 no-underline hover:bg-cyan-600 transition-duration-150 transition-colors"
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
                      className="p-ripple flex align-items-center cursor-pointer p-2 ml-2 border-round text-700 no-underline hover:bg-cyan-600 transition-duration-150 transition-colors"
                    >
                      <BriefcaseBusiness
                        className="text-white mr-2"
                        size={15}
                      />
                      <span className="font-medium text-sm text-white">
                        Employment Opportunity
                      </span>
                      <Ripple />
                    </div>
                  </li>
                  <li>
                    <div
                      style={getTabStyle("cultural")}
                      onClick={() => handleTabClick("cultural")}
                      className="p-ripple flex align-items-center cursor-pointer p-2 ml-2 border-round text-700 no-underline hover:bg-cyan-600 transition-duration-150 transition-colors"
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
                      className="p-ripple flex align-items-center cursor-pointer p-2 ml-2 border-round text-700 no-underline hover:bg-cyan-600 transition-duration-150 transition-colors"
                    >
                      <HeartHandshake className="text-white mr-2" size={25} />
                      <span className="font-medium text-sm text-white">
                        Community Engagement & Holistic Well-Being
                      </span>
                      <Ripple />
                    </div>
                  </li>
                </ul>
              )}
            </li>
            {/* administration Section */}
            <li>
              <div
                onClick={() => {
                  toggleSection("administration");
                  //  handleTabClick("administration");
                  setVisible(true);
                }}
                style={getTabStyle("administration")}
                className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 no-underline hover:bg-cyan-600 transition-duration-150 transition-colors"
              >
                <Landmark className="text-white mr-2" size={20} />
                <span className="font-medium text-white">Admininstration</span>
                <i
                  className={`pi pi-chevron-${
                    activeSections.administration ? "up" : "down"
                  } ml-auto text-white`}
                ></i>
                <Ripple />
              </div>
              {activeSections.administration && (
                <ul className="list-none py-0 pl-3 pr-0 m-0 mt-2">
                  <li>
                    <div
                      style={getTabStyle("disaster")}
                      onClick={() => handleTabClick("disaster")}
                      className="p-ripple flex align-items-center cursor-pointer p-2 ml-2 border-round text-700 no-underline hover:bg-cyan-600 transition-duration-150 transition-colors"
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
              bottom: "1.5rem",
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
        {activeTab === "cityReportCard" && <CityReportCardGov show={true} />}
        {activeTab === "aqi" && <AqiDashboard show={true} />}
        {activeTab === "temperature" && <TempDashboard show={true} />}
        {activeTab === "rain" && <RainDashboard show={true} />}
        {activeTab === "land" && <Land show={true} />}
        {activeTab === "water" && <WaterDashboard show={true} />}
        {activeTab === "waste" && <WasteDashboard show={true} />}

{activeTab === "transport" && <Transport show={true} />}
        {/* {activeTab === "transport" && <TransportDashboard show={true} />} */}
        {activeTab === "healthcare" && <Healthcare show={true} />}
        {activeTab === "education" && <EducationDashboard show={true} />}
        {activeTab === "cultural" && <Culture show={true} />}
        {activeTab === "community" && <Community show={true} />}
        {activeTab === "disaster" && <Disaster show={true} />}
        {activeTab === "employment" && <Employment show={true} />}
      </div>
    </div>
  );
};

export default GovernmentSidebar;
