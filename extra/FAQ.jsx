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
                <span className="font-semibold text-xl mb-2 mt-2">{faq.question}</span>
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
