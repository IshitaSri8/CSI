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

function App() {
  return (
    // <div className="App">
    //   <LandingScreen />
    // </div>
  
      <Routes>
        <Route path="/" element={<LandingScreen />} />
        <Route path="/citizens" element={<Citizen />} />
        <Route path="/kyc" element={<KnowYourCity/>} />
        <Route path="/aboutus" element={<AboutUs/>} />
        <Route path="/ourwork" element={<OurWork/>} />
        <Route path="/government" element={<Government/>} />
        <Route path="/reportcard" element={<CityReportCard/>} />
      </Routes>

  );
}

export default App;
