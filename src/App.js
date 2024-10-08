import React from "react";
import "./App.css";
import "primereact/resources/themes/lara-light-teal/theme.css"; // Theme
import "primereact/resources/primereact.min.css"; // Core CSS
import "primeicons/primeicons.css";
import LandingScreen from "./pages/LandingScreen";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Citizen from "./pages/Citizen";
import KnowYourCity from "./pages/KnowYourCity";
import Government from "./pages/Government";

import "primereact/resources/themes/lara-light-cyan/theme.css";
import GovernmentSidebar from "Layout/GovernmentSidebar";
import CityProgress from "components/knowYourCity/CityProgress";
import CitizenSidebar from "Layout/CitizenSidebar";
// import AqiDashboard from "../src/components/Dashboards/Environment/AQI/AqiDashboard";
// import TempDashboard from "../src/components/Dashboards/Environment/Temperature/TempDashboard";
// import RainDashboard from "../src/components/Dashboards/Environment/Rain/RainDashboard";
// import WaterDashboard from "../src/components/Dashboards/Environment/Water/WaterDashboard";
// import LandDashboard from "../src/components/Dashboards/Environment/Land/LandDashboard";
// import WasteDashboard from "../src/components/Dashboards/Environment/Waste/WasteDashboard";

function App() {
  return (
    // <div className="App">
    //   <LandingScreen />
    // </div>

    <Routes>
      <Route path="/" element={<LandingScreen />} />
      <Route path="/citizens" element={<Citizen />} />
      {/* <Route path="/kyc" element={<KnowYourCity />} /> */}
      {/* <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/ourwork" element={<OurWork />} /> */}
      <Route path="/government" element={<Government />} />
      {/* <Route path="/report-card" element={<CityReportCard />} /> */}

      <Route path="/city" element={<CityProgress />} />

      {/* Routes with Sidebar */}
      <Route path="/g-kyc" element={<GovernmentSidebar />} />

      <Route path="/c-kyc" element={<CitizenSidebar />} />
    </Routes>
  );
}

export default App;
