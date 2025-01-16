import React, { useRef, useState } from "react";
import { Button } from "primereact/button";
import "primeflex/primeflex.css";
import MySvgImage from "assets/Landing Page revised illustration 1.svg";
import CSISteps from "../components/landingPage/CSISteps";
import Testimonials from "../components/landingPage/Testimonials";
import Footer from "../components/landingPage/Footer";
import CSIVideo from "../components/landingPage/CSIVideo";
import Questions from "../components/landingPage/Questions";

import UserDialog from "../components/landingPage/UserDialog";
import Header from "../Layout/Header";
import Parameters from "../components/landingPage/Parameters";
import FAQChatbot from "../components/landingPage/FAQChatbot";
import { ScrollTop } from "primereact/scrolltop";
import FloatingSidebar from "components/landingPage/FloatingSidebar";
import Landing from "components/landingPage/Landing";
import LandingCarousel from "components/landingPage/LandingCarousel";

// Main LandingScreen component
const LandingScreen = () => {
  // Create a reference for the target div
  const csiStepsRef = useRef(null);

  const userDialogRef = useRef(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Function to scroll to CSI Steps
  const scrollToCSISteps = () => {
    if (csiStepsRef.current) {
      csiStepsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleGetInTouchClick = () => {
    if (userDialogRef.current) {
      userDialogRef.current.openDialog();
    }
  };

  // Callback to set the success message from the dialog component
  const handleSuccess = (message) => {
    setSuccessMessage(message);
  };

  const sections = [
    // { id: "header", label: "Header" },
    { id: "csi-steps", label: "CSI Steps" },
    { id: "csi-video", label: "CSI Video" },
    { id: "parameters", label: "Parameters" },
    { id: "questions", label: "FAQs" },
    { id: "testimonials", label: "Testimonials" },
    // { id: "footer", label: "Footer" },
  ];

  return (
    <div className="flex flex-column w-full">
      {/* Header */}
      <Header />

      {/* Add top padding to avoid overlap with fixed header */}
      <div style={{ paddingTop: "5rem" }} className="View bg-white">
        {/* <Divider /> */}
        <FAQChatbot />
        {/* Card Section */}
        <div
          ref={csiStepsRef} // Set the ref here
          className="flex justify-content-center gap-6 flex-nowrap w-full overflow-auto pl-5 pr-5 block"
          id="csi-steps"
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

        <div className="flex sec-theme block" id="csi-video">
          <CSIVideo />
        </div>

        <div
          className="flex justify-content-center w-full overflow-auto p-5 block"
          id="parameters"
        >
          <Parameters />
        </div>

        <div className="flex flex-column " id="questions">
          <div className="flex bg-theme text-white block">
            <Questions
              textTheme="white"
              question="What is the City Sustainability Index (CSI)?"
              points={[
                {
                  subheading: "Comprehensive evaluation tool",
                  content:
                    "The CSI is designed to assess the overall sustainability performance of cities by monitoring various indicators across key sustainability dimensions.",
                },
                {
                  subheading: "Integration of ESG factors",
                  content:
                    "The index incorporates three core dimensions—Nature, Society, and Administration (NSA) —which are critical to determining the overall sustainability of a city.",
                },
                {
                  subheading: "Benchmarking performance",
                  content:
                    "Cities can use the CSI to compare their performance against other cities and global standards, allowing them to identify strengths and areas for improvement.",
                },
                {
                  subheading: "Actionable insights",
                  content:
                    "By providing a cumulative sustainability score, the CSI offers city leaders, policymakers, and planners valuable data to support decision-making, enhance urban resilience, and drive sustainable growth.",
                },
                {
                  subheading: "Encouraging continuous improvement",
                  content:
                    "The CSI not only evaluates current performance but also motivates cities to adopt long-term sustainable practices by highlighting progress over time and rewarding improvements.",
                },
              ]}
            />
          </div>

          <div className="flex sec-theme block">
            <Questions
              question="Why is the CSI important for cities, and who benefits from it?"
              points={[
                {
                  subheading: "Standardized sustainability measurement",
                  content:
                    "The CSI offers cities a uniform framework to measure and evaluate their sustainability efforts, aligning them with global benchmarks such as the United Nations’ 17 Sustainable Development Goals (SDGs).",
                },
                {
                  subheading: "Progress tracking and action planning",
                  content:
                    "With detailed insights into their sustainability performance, cities can monitor progress, identify gaps, and develop informed action plans to create resilient, inclusive, and sustainable urban environments.",
                },
                {
                  subheading: "Fostering healthy competition",
                  content:
                    "By enabling cities to compare their sustainability performance with peers, the CSI promotes healthy competition, motivating cities to improve and meet higher sustainability standards.",
                },
                {
                  subheading: "Encouraging knowledge exchange and innovation",
                  content:
                    "The competitive environment fosters collaboration among cities, allowing them to share best practices and innovative solutions to common urban challenges, ultimately driving more sustainable urban development globally.",
                },
                {
                  subheading: "Beneficiaries of the CSI",
                  content:
                    "City leaders, policymakers, urban planners, and citizens all gain valuable insights from the CSI, empowering them to address sustainability challenges and seize opportunities to enhance quality of life and environmental stewardship in their urban areas.",
                },
              ]}
            />
          </div>

          <div className="flex bg-theme text-white block">
            <Questions
              textTheme="white"
              question="How can cities leverage CSI to enhance their sustainability efforts?"
              points={[
                {
                  subheading: "Pinpoint areas for improvement",
                  content:
                    "Cities can utilize the CSI platform to identify specific gaps in their sustainability performance across the nature, society, and administration (NSA) dimensions, allowing for precise interventions.",
                },
                {
                  subheading: "Gain in-depth insights",
                  content:
                    "The CSI provides detailed analyses for each dimension, equipping city leaders with a clear understanding of the root causes behind their scores and highlighting priority areas for action.",
                },
                {
                  subheading: "Create targeted action plans",
                  content:
                    "With insights derived from the CSI, cities can develop focused strategies and policies that effectively address identified gaps, leading to a more systematic approach to sustainability enhancement.",
                },
                {
                  subheading: "Monitor performance in real-time",
                  content:
                    "The platform’s real-time dashboards enable cities to track performance trends continuously, ensuring timely adjustments and demonstrating progress over time.",
                },
                {
                  subheading: "Implement tailored recommendations",
                  content:
                    "Cities can take advantage of customized, actionable recommendations provided by the CSI to improve their sustainability scores, fostering a culture of ongoing improvement and commitment to long-term sustainability goals.",
                },
              ]}
            />
          </div>
        </div>
        <ScrollTop />
        <div className="flex sec-theme p-8 block" id="testimonials">
          <Testimonials />
        </div>
        {/* <iframe
          title="Temp. Dashboard"
          width="1240"
          height="541.25"
          src="https://app.powerbi.com/reportEmbed?reportId=c681af69-5780-4ecc-af1f-48049fb683cb&autoAuth=true&ctid=e25b7a25-9cae-4302-a16e-1fa1d5211fae"
          frameborder="0"
          allowFullScreen="true"
        ></iframe> */}
        <div
          className="px-8 block"
          style={{
            background: "linear-gradient(to bottom, #E9F3F5 50%, #166c7d 50%)",
          }}
        >
          <div className="border-round bg-white p-6 align-items-center justify-content-center">
            <h3 className="text-center text-3xl mb-5 text-primary1">
              Still have questions?
            </h3>
            <p className="text-lg text-center mb-5" style={{ marginTop: -10 }}>
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
                  className="w-12rem bg-primary1"
                  raised
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
      {/* <FloatingSidebar sections={sections} /> */}
    </div>
  );
};

export default LandingScreen;
