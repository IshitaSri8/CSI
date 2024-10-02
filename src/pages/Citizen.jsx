import { Button } from "primereact/button";
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/landingPage/Header";
import FAQChatbot from "../components/landingPage/FAQChatbot";
import Chatbot from "../components/Citizen/Chatbot";

const Citizen = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  return (
    <div className="flex flex-column w-full">
      {/* Header */}
      <Header />

      {/* Add top padding to avoid overlap with fixed header */}
      <div>
        <div className="flex flex-column gap-1 mt-8 align-items-center p-4">
          <h1 className="text-4xl text-theme">
            City Sustainability Index for Citizens
          </h1>
          <div className="flex align-items-start justify-content-start w-full">
            <h1> Features</h1>
          </div>

          <Chatbot />
        </div>
      </div>
    </div>
  );
};

export default Citizen;
