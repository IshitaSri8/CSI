import React, { useEffect, useState } from "react";
import "primeflex/primeflex.css";

const FloatingSidebar = ({ sections }) => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    sections.forEach((section) => {
      const target = document.getElementById(section.id);
      if (target) {
        observer.observe(target);
      }
    });

    return () => {
      sections.forEach((section) => {
        const target = document.getElementById(section.id);
        if (target) {
          observer.unobserve(target);
        }
      });
    };
  }, [sections]);

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: 0,
        transform: "translateY(-50%)",
        backgroundColor: "#fff",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        padding: "1rem",
        borderRadius: "0 5px 5px 0",
        zIndex: 1000,
        maxHeight: "90vh",
        overflowY: "auto",
      }}
      className="floating-sidebar flex flex-column p-3 shadow-2 surface-card border-round-xl"
    >
      <ul className="list-none p-0 m-0">
        {sections.map((section, index) => (
          <li key={index} className="mb-3">
            <a
              href={`#${section.id}`}
              className={`no-underline text-primary ${activeSection === section.id ? "active" : ""}`}
              style={{
                textDecoration: "none",
                color: activeSection === section.id ? "#007bff" : "#333",
                fontWeight: activeSection === section.id ? "bold" : "normal",
              }}
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FloatingSidebar;
