import { Button } from "primereact/button";
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/landingPage/Header";

const AboutUs = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  return (
    <div className="flex flex-column w-full">
      {/* Header */}
      <Header />

      {/* Add top padding to avoid overlap with fixed header */}
      <div style={{ paddingTop: "5rem" }}>
        <div className="flex flex-column gap-1 mt-5 align-items-center">
          <h1 className="text-4xl">Arahas</h1>
          <Button
            label="About Us"
            //icon="pi pi-globe"
            className="bg-theme w-12rem mb-3"
            //onClick={() => navigate("/kyc")}
            raised
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
