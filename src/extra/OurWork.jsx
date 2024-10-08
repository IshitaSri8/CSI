import { Button } from "primereact/button";
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Layout/Header";

const OurWork = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  return (
    <div className="flex flex-column w-full">
      {/* Header */}
      <Header />

      {/* Add top padding to avoid overlap with fixed header */}
      <div style={{ paddingTop: "5rem" }}>
        <div className="flex flex-column gap-1 mt-5 align-items-center">
          <h1 className="text-4xl">CSI for Ayodhya</h1>
        </div>
      </div>
    </div>
  );
};

export default OurWork;
