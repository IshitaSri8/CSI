import React from "react";
import "./App.css";
import "primereact/resources/themes/lara-light-teal/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import LandingScreen from "./pages/LandingScreen";
import Citizen from "./pages/Citizen";
import Government from "./pages/Government";
import { Route, Routes } from "react-router-dom";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import GovernmentSidebar from "Layout/GovernmentSidebar";
import CityProgress from "components/knowYourCity/CityProgress";
import CitizenSidebar from "Layout/CitizenSidebar";
import ChangeDetection from "extra/ChangeDetection";

function App() {
  return (
    // <div className="App">
    //   <LandingScreen />
    // </div>

    <Routes>
      <Route path="/" element={<LandingScreen />} />
      <Route path="/citizens" element={<Citizen />} />
      <Route path="/government" element={<Government />} />
      <Route path="/city" element={<CityProgress />} />
      <Route path="/g-kyc" element={<GovernmentSidebar />} />
      <Route path="/c-kyc" element={<CitizenSidebar />} />
      <Route path="/change" element={<ChangeDetection />} />
    </Routes>
  );
}

export default App;
