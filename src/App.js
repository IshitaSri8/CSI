import React from "react";
import "./App.css";
import "primereact/resources/themes/saga-orange/theme.css"; // Theme
import "primereact/resources/primereact.min.css"; // Core CSS
import "primeicons/primeicons.css"; // PrimeIcons
import LandingScreen from "./pages/LandingScreen";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Citizen from "./pages/Citizen";
import KnowYourCity from "./pages/KnowYourCity";
import UserDialog from "./components/landingPage/UserDialog";
import AboutUs from "./pages/AboutUs";
import OurWork from "./pages/OurWork";
import Government from "./pages/Government";
import CityReportCard from "./pages/CityReportCard";
import AqiDashboard from "../src/components/Dashboards/Environment/AQI/AqiDashboard";
import TempDashboard from "../src/components/Dashboards/Environment/Temperature/TempDashboard";
import RainDashboard from "../src/components/Dashboards/Environment/Rain/RainDashboard";
import WaterDashboard from "../src/components/Dashboards/Environment/Water/WaterDashboard";
import LandDashboard from "../src/components/Dashboards/Environment/Land/LandDashboard";
import WasteDashboard from "../src/components/Dashboards/Environment/Waste/WasteDashboard";

import "primereact/resources/themes/lara-light-cyan/theme.css";
import CitySidebar from "pages/CitySidebar";
import TransportDashboard from "components/Dashboards/Transport/TransportDashboard";
import Healthcare from "components/Dashboards/Healthcare";

// Layout component that includes CitySidebar
const SidebarLayout = ({ children }) => (
  <div className="layout-container">
    <CitySidebar />
    <div className="content-container">{children}</div>
  </div>
);

function App() {
  return (
    // <div className="App">
    //   <LandingScreen />
    // </div>

    <Routes>
      <Route path="/" element={<LandingScreen />} />
      <Route path="/citizens" element={<Citizen />} />
      <Route path="/kyc" element={<KnowYourCity />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/ourwork" element={<OurWork />} />
      <Route path="/government" element={<Government />} />
      {/* Routes with Sidebar */}
      <Route
        path="/kyc"
        element={
          <SidebarLayout>
            <KnowYourCity />
          </SidebarLayout>
        }
      />
      <Route path="/admin" element={<CitySidebar />} />
    </Routes>
  );
}

export default App;
