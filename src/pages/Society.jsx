import React from "react";
import society from "assets/Report/Society.svg";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { PieChart } from "Layout/GraphVisuals";
import increase from "assets/increase.png";
import healthcare from "assets/illustration/Healthcare Management.svg";
import education from "assets/illustration/education.svg";
import transport from "assets/illustration/Public Transport.svg";
import employment from "assets/illustration/Employment Opportunity.svg";
import culture from "assets/illustration/Cultural Sites.svg";
import community from "assets/illustration/community.svg";
import Healthcare from "components/Dashboards/Society/Healthcare/Healthcare";
import EducationDashboard from "components/Dashboards/Society/Education/EducationDashboard";
import Transport from "components/Dashboards/Society/Transport/Transport";
import Employment from "components/Dashboards/Society/Employment/Employment";
import Culture from "components/Dashboards/Society/Culture/Culture";
import Community from "components/Dashboards/Society/Community/Community";
import { useState } from "react";

const Society = () => {
  const societyLables = [
    "Healthcare",
    "Education",
    "Employment Opportunity",
    "Cultural Preservation",
    "Community Enagagement & Holistic Well-Being",
    "Public Transport",
  ];
  const societyData = [12, 7, 15, 2, 15, 19];

  const metrics = [
    {
      img: healthcare,
      title: "Healthcare",
      score: 80,
      dashboard: <Healthcare show={true} />,
    },
    {
      img: education,
      title: "Education",
      score: 75,
      dashboard: <EducationDashboard show={true} />,
    },
    {
      img: transport,
      title: "Public Transport",
      score: 40,
      dashboard: <Transport show={true} />,
    },
    {
      img: employment,
      title: "Employment Opportunity",
      score: 70,
      dashboard: <Employment show={true} />,
    },
    {
      img: culture,
      title: "Cultural Preservation",
      score: 85,
      dashboard: <Culture show={true} />,
    },
    {
      img: community,
      title: "Community Enagagement & Holistic Well-Being",
      score: 60,
      dashboard: <Community show={true} />,
    },
  ];

  // Function to determine background color based on score
  const getScoreBackgroundColor = (score) => {
    if (score >= 80) {
      return "#0C9D61"; // good
    } else if (score >= 60) {
      return "#FFAD0D"; // medium
    } else {
      return "#E62225"; // poor
    }
  };

  const [activeDashboard, setActiveDashboard] = useState(null); // State to track active dashboard

  const handleCardClick = (dashboard) => {
    setActiveDashboard(dashboard); // Set the active dashboard based on card clicked
  };

  return (
    <div className="flex flex-column p-4 gap-4">
      {/* Conditional rendering of content */}
      {activeDashboard ? (
        // If an active dashboard is set, render it
        <div style={{ flexGrow: 1 }}>{activeDashboard}</div>
      ) : (
        // Otherwise, render the metrics and summary
        <>
          <div className="flex gap-4">
            <div
              className="flex flex-column bg-white border-round-2xl shadow-2 align-items-start justify-content-around p-4"
              style={{ flex: "25%" }}
            >
              <div className="flex">
                <div className="flex flex-column gap-4">
                  <p className="card-title p-0 m-0 text-xl">Society</p>
                  <p className="text-5xl font-semibold text-secondary2 p-0 m-0">
                    80
                  </p>
                  <div className="flex align-items-center justify-content-start">
                    <img
                      src={increase}
                      style={{
                        height: "1.5rem",
                        width: "1.5rem",
                        marginRight: "0.5rem",
                      }}
                      alt="increase"
                    />
                    <p className="text-tertiary3 p-0 m-0 font-medium">
                      <span style={{ color: "#0C9D61" }}>8.5%</span> Up from
                      last year.
                    </p>
                  </div>
                </div>
                <div className="align-items-start justify-content-end ml-5">
                  <img src={society} alt="society" className="w-4rem" />
                </div>
              </div>
              <Divider />
            </div>
            <div
              className="flex flex-column bg-white border-round-2xl shadow-2 align-items-start justify-content-between p-4"
              style={{ flex: "25%" }}
            >
              <p className="card-title p-0 m-0 text-xl">
                Indicator Contribution
              </p>
              <PieChart
                categories={societyLables}
                series={societyData}
                height={140}
                fontSize={8}
              />
            </div>
            <div className="flex flex-column" style={{ flex: "50%" }}>
              <div className="flex flex-column border-round-2xl bg-white p-3">
                <p className="text-xl font-medium p-0 m-0">Summary</p>
                <p>
                  The score 70 is combined output of all the indicators falling
                  under SDG 11.
                </p>
                <Divider />
                <p>
                  CSI promotes integrated and balanced urban development
                  strategies.
                </p>
                <Divider />
                <p>
                  The score 70 is combined output of all the indicators falling
                  under SDG 11. CSI promotes integrated and balanced urban
                  development strategies.
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-4 flex-wrap w-full">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className="cardMetric flex bg-white border-round-2xl shadow-2"
                onClick={() => handleCardClick(metric.dashboard)} // Set active dashboard on click
                style={{ cursor: "pointer" }} // Change cursor to pointer for better UX
              >
                <div className="flex flex-column gap-3 align-items-center">
                  <img src={metric.img} alt={metric.title} />
                  <p className="text-sm font-semibold text-secondary2 pb-2 m-0 text-lg flex flex-wrap">
                    {metric.title}
                  </p>
                </div>
                <div
                  className="flex border-round-right-2xl px-4 flex-column gap-8 py-2"
                  style={{
                    backgroundColor: getScoreBackgroundColor(metric.score),
                    // padding: "1.6rem",
                  }}
                >
                  <p className="font-medium p-0 m-0 text-white text-sm text-left">
                    SCORE
                  </p>
                  <p className="text-5xl font-semibold text-white p-0 m-0 text-center">
                    {metric.score}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Society;
