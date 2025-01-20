import React, { useState } from "react";
import { Panel } from "primereact/panel";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css"; // For icons
import "primereact/resources/themes/saga-blue/theme.css"; // Optional, depends on your theme

const FAQ = () => {
  // List of FAQs related to CSI
  const faqs = [
    {
      question: "Q1. What is the City Sustainability Index (CSI)?",
      answer:
        "The City Sustainability Index (CSI) is a comprehensive framework for measuring and evaluating the sustainability of cities across various dimensions such as environmental, social, and economic factors.",
    },
    {
      question: "Q2. What factors are considered in the CSI?",
      answer:
        "The CSI takes into account factors like energy efficiency, waste management, water conservation, air quality, public transport, and the well-being of residents.",
    },
    {
      question: "Q3. How does CSI benefit cities?",
      answer:
        "CSI helps cities identify areas where they excel and where improvement is needed. It encourages the adoption of sustainable practices and policies to enhance the overall quality of life in urban areas.",
    },
    {
      question: "Q4. Who can use the CSI?",
      answer:
        "Governments, city planners, environmental organizations, and researchers can use the CSI to assess urban sustainability and develop strategies for improvement.",
    },
  ];

  // State to control which FAQ is active (open)
  const [activeIndex, setActiveIndex] = useState(null);

  const togglePanel = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // Close the panel if clicked again
  };

  return (
    <div className="px-8 w-full my-4">
      <h1 className="text-3xl mb-4 text-black">
        Frequently Asked Questions (FAQ) about CSI
      </h1>
      {faqs.map((faq, index) => (
        <Panel
          key={index}
          header={faq.question}
          toggleable
          collapsed={activeIndex !== index}
          onToggle={() => togglePanel(index)}
          headerTemplate={(options) => {
            const toggleIcon = options.collapsed
              ? "pi pi-chevron-circle-right" // Arrow pointing to the right when collapsed
              : "pi pi-chevron-circle-down"; // Arrow pointing down when expanded

            return (
              <div className="flex justify-content-between align-items-center">
                <span className="font-semibold text-xl mb-2 mt-2">
                  {faq.question}
                </span>
                <button
                  className={`p-link ${toggleIcon}`}
                  onClick={options.onTogglerClick}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                />
              </div>
            );
          }}
        >
          <div className="sec-theme m-0 p-0">
            <p className="text-lg text-left">{faq.answer}</p>
          </div>
        </Panel>
      ))}
    </div>
  );
};

export default FAQ;

{
  /* <div className="flex bg-theme text-white ">
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
          </div> */
}
