import React, { useRef } from "react";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import "primeflex/primeflex.css";
import MySvgImage from "../assets/Landing_page.svg";
import Arahas from "../assets/arahas_logo.png";
import CSISteps from "../components/landingPage/CSISteps";
import Testimonials from "../components/landingPage/Testimonials";
import Footer from "../components/landingPage/Footer";
import FAQ from "../components/landingPage/FAQ";
import { Divider } from "primereact/divider";
import CSIVideo from "../components/landingPage/CSIVideo";
import { useNavigate } from "react-router-dom";
import Questions from "../components/landingPage/Questions";
import Chatbot from "../components/landingPage/Chatbot";

// Main LandingScreen component
const LandingScreen = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Create a reference for the target div
  const csiStepsRef = useRef(null);

  const itemRenderer = (item) => (
    <a className="flex align-items-center p-menuitem-link">
      <span className={`${item.icon} text-theme`} />
      <span className="mx-2 text-theme font-semibold text-lg">
        {item.label}
      </span>
    </a>
  );

  const items = [
    {
      label: "Home",
      icon: "pi pi-home",
      template: itemRenderer,
      //command: () => navigate("/"),
    },
    {
      label: "CSI for citizens",
      icon: "pi pi-cog",
      template: itemRenderer,
      command: () => navigate("/citizens"),
    },
    {
      label: "CSI for Government",
      icon: "pi pi-envelope",
      template: itemRenderer,
    },
    { label: "About Us", icon: "pi pi-info-circle", template: itemRenderer },
    { label: "Our Work", icon: "pi pi-envelope", template: itemRenderer },
  ];

  const start = (
    <img className="mr-auto w-4 h-2" src={Arahas} alt="Arahas Logo" />
  );

  const end = (
    <Button label="Sign in" icon="pi pi-user" className="bg-theme p-ml-auto" />
  );

  // Function to scroll to CSI Steps
  const scrollToCSISteps = () => {
    if (csiStepsRef.current) {
      csiStepsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-column w-full">
      {/* Menubar */}
      <Menubar
        model={items}
        start={start}
        end={end}
        className="flex p-shadow-3 bg-white gap-8"
      />

      {/* Main Content */}
      <div
        className="flex flex-column gap-1 mt-5 align-items-center"
        style={{ textAlign: "center" }}
      >
        <h2 className="text-4xl text-theme m-0 p-0">
          City Sustainability Index
        </h2>
        <h2 className="text-4xl m-0 p-0">
          Measuring and Boosting Urban Sustainability
        </h2>
        <p className="text-xl" style={{ color: "#8AA4A7" }}>
          Empowering governments, businesses, and citizens to track and improve
          urban sustainability for a greener future.
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
        className="flex justify-content-center my-4 gap-6 flex-nowrap w-full overflow-auto pl-5 pr-5"
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

      <div className="flex sec-theme">
        <CSIVideo />
      </div>

      <div className="flex my-4">
        <Testimonials />
      </div>

      <div className="flex sec-theme px-5">
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

      <div className="flex bg-theme px-5">
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

      <div className="flex sec-theme px-5">
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
            <Button
              label="Get in Touch"
              className="w-12rem mb-3 mt-3 bg-theme"
              raised
            />
          </div>
        </div>
      </div>

      <div className="flex">
        <Footer />
      </div>
    </div>
  );
};

export default LandingScreen;
