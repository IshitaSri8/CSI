import { Button } from "primereact/button";
import React from "react";
import { useNavigate } from "react-router-dom";

const Citizen = () => {
    const navigate = useNavigate(); // Initialize useNavigate
  return (
    <div className="flex flex-column gap-1 mt-5 align-items-center">
      <h1 className="text-4xl">CSI for citizens</h1>
      <Button
        label="Know Your City"
        icon="pi pi-globe"
        className="bg-theme w-12rem mb-3"
        onClick={() => navigate("/kyc")} 
        raised
      />
    </div>
  );
};

export default Citizen;
