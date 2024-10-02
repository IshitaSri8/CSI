import React, { useRef, useState } from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import "primeflex/primeflex.css";
import MySvgImage from "../assets/Landing_page.svg";
import CSISteps from "../components/landingPage/CSISteps";
import Testimonials from "../components/landingPage/Testimonials";
import Footer from "../components/landingPage/Footer";
import FAQ from "../components/landingPage/FAQ";
import { Divider } from "primereact/divider";
import CSIVideo from "../components/landingPage/CSIVideo";
import { useNavigate } from "react-router-dom";
import Questions from "../components/landingPage/Questions";
import Chatbot from "../components/landingPage/Chatbot";
import UserDialog from "../components/landingPage/UserDialog";
import Header from "../components/landingPage/Header";
import Parameters from "../components/landingPage/Parameters";

// Main LandingScreen component
const LandingScreen = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Create a reference for the target div
  const csiStepsRef = useRef(null);

  const userDialogRef = useRef(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleGetInTouchClick = () => {
    if (userDialogRef.current) {
      userDialogRef.current.openDialog();
    }
  };

  // Callback to set the success message from the dialog component
  const handleSuccess = (message) => {
    setSuccessMessage(message);
  };

  // Function to scroll to CSI Steps
  const scrollToCSISteps = () => {
    if (csiStepsRef.current) {
      csiStepsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-column w-full">
      {/* Header */}
      <Header />

      {/* Add top padding to avoid overlap with fixed header */}
      <div style={{ paddingTop: "5rem" }}>
        {/* Main Content */}

        {/* Main Content */}
        <div
          className="flex flex-column gap-1 mt-5 align-items-center"
          style={{ textAlign: "center" }}
        >
          <h2 className="text-4xl text-theme m-0 p-0">
            City Sustainability Index
          </h2>
          <h2 className="text-4xl text-sec-theme m-0 p-0">
            Measuring and Boosting Urban Sustainability
          </h2>
          <p className="text-xl" style={{ color: "#8AA4A7" }}>
            Empowering governments, businesses, and citizens to track and
            improve urban sustainability for a greener future.
          </p>

          {/* Know Your City Button */}
          <Button
            label="Explore More"
            icon="pi pi-globe"
            className="bg-theme w-10rem mb-3"
            onClick={scrollToCSISteps} // Add onClick handler
          />

          {/* Landing SVG Image */}
          <img
            className=""
            src={MySvgImage}
            alt="Landing Illustration"
            style={{ width: "60rem" }}
          />
        </div>
        {/* <Divider /> */}
        <Chatbot />
        {/* Card Section */}
        <div
          ref={csiStepsRef} // Set the ref here
          className="flex justify-content-center gap-6 flex-nowrap w-full overflow-auto pl-5 pr-5 h-screen"
        >
          {/* {cardData.map((card, index) => (
            <CardItem
              key={index}
              number={card.number}
              title={card.title}
              content={card.content}
            />
          ))} */}
          <CSISteps />
        </div>

        <div className="flex sec-theme h-screen">
          <CSIVideo />
        </div>

        <div className="flex h-screen justify-content-center gap-6 flex-nowrap w-full overflow-auto pl-5 pr-5">
          <Parameters />
        </div>

        <div className="flex bg-theme text-white h-screen">
          <Questions
            question="What is the City Sustainability Index (CSI)?"
            point1={[
              "The City Sustainability Index (CSI) is a comprehensive framework for measuring and evaluating the sustainability of cities across various dimensions such as environmental, social, and economic factors.",
            ]}
            point2={[
              "The City Sustainability Index (CSI) is a comprehensive framework for measuring and evaluating the sustainability of cities across various dimensions such as environmental, social, and economic factors.",
            ]}
            point3={[
              "The City Sustainability Index (CSI) is a comprehensive framework for measuring and evaluating the sustainability of cities across various dimensions such as environmental, social, and economic factors.",
            ]}
          />
        </div>

        <div className="flex sec-theme h-screen">
          <Questions
            question="What factors are considered in the CSI?"
            point1={[
              "The City Sustainability Index (CSI) is a comprehensive framework for measuring and evaluating the sustainability of cities across various dimensions such as environmental, social, and economic factors.",
            ]}
            point2={[
              "The City Sustainability Index (CSI) is a comprehensive framework for measuring and evaluating the sustainability of cities across various dimensions such as environmental, social, and economic factors.",
            ]}
            point3={[
              "The City Sustainability Index (CSI) is a comprehensive framework for measuring and evaluating the sustainability of cities across various dimensions such as environmental, social, and economic factors.",
            ]}
          />
        </div>

        <div className="flex bg-theme text-white h-screen">
          <Questions
            question="How does CSI benefit cities?"
            point1={[
              "The City Sustainability Index (CSI) is a comprehensive framework for measuring and evaluating the sustainability of cities across various dimensions such as environmental, social, and economic factors.",
            ]}
            point2={[
              "The City Sustainability Index (CSI) is a comprehensive framework for measuring and evaluating the sustainability of cities across various dimensions such as environmental, social, and economic factors.",
            ]}
            point3={[
              "The City Sustainability Index (CSI) is a comprehensive framework for measuring and evaluating the sustainability of cities across various dimensions such as environmental, social, and economic factors.",
            ]}
          />
        </div>
        <div className="flex sec-theme p-8">
          <Testimonials />
        </div>

        <div
          className="px-8"
          style={{
            background: "linear-gradient(to bottom, #E9F3F5 50%, #166c7d 50%)",
          }}
        >
          <div className="border-round bg-white p-2 align-items-center justify-content-center">
            <h3 className="text-center text-2xl">Still have questions?</h3>
            <p className="text-lg text-center" style={{ marginTop: -10 }}>
              Can’t find the answer you’re looking for? Please connect with our
              team.
            </p>
            <div className="flex justify-content-center">
              {successMessage ? (
                <div className="text-green-400 font-semibold text-xl text-center mb-2">
                  {successMessage}
                </div>
              ) : (
                <Button
                  label="Get in Touch"
                  className="w-12rem mb-3 mt-3 bg-theme"
                  onClick={handleGetInTouchClick}
                />
              )}
            </div>
          </div>

          {/* Pass handleSuccess as a prop to UserDialog */}
          <UserDialog ref={userDialogRef} onSuccess={handleSuccess} />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default LandingScreen;
