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

function App() {
  return (
    // <div className="App">
    //   <LandingScreen />
    // </div>
  
      <Routes>
        <Route path="/" element={<LandingScreen />} />
        <Route path="/citizens" element={<Citizen />} />
        <Route path="/kyc" element={<KnowYourCity/>} />
        <Route path="/dialog" element={<UserDialog/>} />
      </Routes>

  );
}

export default App;
