import React from "react";
import society from "assets/Report/Society.svg";
import { Divider } from "primereact/divider";
import { PieChart } from "Layout/GraphVisuals";
import healthcare from "assets/illustration/Healthcare Management.svg";
import education from "assets/illustration/education.svg";
import transport from "assets/illustration/Public Transport.svg";
import employment from "assets/illustration/Employment Opportunity.svg";
import culture from "assets/illustration/Cultural Sites.svg";
import community from "assets/illustration/community.svg";
import pathConstants from "pathConstants";
import { useNavigate } from "react-router-dom";
import score from "score";

const Society = () => {
  const navigate = useNavigate();
  const societyLables = [
    "City Planning",
    "Citizen Services",
    "Employment Opportunity",
    "Cultural Preservation",
    "Community Enagagement & Holistic Well-Being",
    // "Healthcare",
    // "Education",
    // "Public Transport",
  ];
  const societyData = [15, 40, 20, 15, 10];

  const metrics = [
    {
      img: healthcare,
      title: "Healthcare",
      score: score.HEALTHCARE,
      path: pathConstants.HEALTHCARE,
    },
    {
      img: education,
      title: "Education",
      score: score.EDUCATION,
      path: pathConstants.EDUCATION,
    },
    {
      img: transport,
      title: "Public Transport",
      score: score.TRANSPORT,
      path: pathConstants.TRANSPORT,
    },
    {
      img: employment,
      title: "Employment Opportunity",
      score: score.EMPLOYMENT,
      path: pathConstants.EMPLOYMENT,
    },
    {
      img: culture,
      title: "Cultural Preservation",
      score: score.CULTURE,
      path: pathConstants.CULTURE,
    },
    {
      img: community,
      title: "Community Enagagement & Holistic Well-Being",
      score: score.COMMUNITY,
      path: pathConstants.COMMUNITY,
    },
  ];

  // Function to determine background color based on score
  const getScoreBackgroundColor = (score) => {
    if (score >= 81 && score <= 100) {
      return "#0C9D61"; // Green for good
    } else if (score >= 41 && score <= 80) {
      return "#FFAD0D"; // Yellow for moderate
    } else if (score >= 0 && score <= 40) {
      return "#E62225"; // Red for poor
    }
  };

  const colors = ["#0C9D61", "#FFAD0D", "#E62225"];

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div className="flex flex-column p-4 gap-4">
      <div className="flex gap-4">
        <div
          className="flex flex-column bg-white border-round-2xl shadow-2 justify-content-around p-4"
          style={{ flex: "22%" }}
        >
          <div className="flex justify-content-between">
            <div className="flex flex-column gap-4">
              <p className="card-title p-0 m-0 text-xl">Society</p>
              <p className="text-5xl font-semibold text-secondary2 p-0 m-0">
                {score.SOCIETY}
              </p>
            </div>
            <img src={society} alt="society" className="w-4rem" />
          </div>
          <p className="text-tertiary3">
            Empowering sustainable changes, enriching diverse lives.
          </p>
          <Divider />
        </div>
        <div
          className="flex flex-column bg-white border-round-2xl shadow-2 align-items-start justify-content-between p-4"
          style={{ flex: "28%" }}
        >
          <p className="card-title p-0 m-0 text-xl">Indicator Contribution</p>
          <PieChart
            categories={societyLables}
            series={societyData}
            height={160}
            fontSize={8}
          />
        </div>
        <div
          className="flex flex-column border-round-2xl bg-white px-4"
          style={{ flex: "50%" }}
        >
          <p className="card-title p-0 text-xl">Summary</p>
          <p className="p-0 m-0">
            The score {score.SOCIETY} reflects the combined performance of the
            key societal indicators.
          </p>
          <Divider />
          <p className="p-0 m-0">
            Society's outstanding performance showcase remarkable efforts
            towards enhancing quality of life and well-being.
          </p>
          <Divider />
          <p className="card-title p-0 mt-0 text-xl">Indicator Highlights:</p>
          <p className="p-0 m-0">
            1. Achiever indicators:{" "}
            <span className="font-medium">Healthcare, Education</span>
          </p>
          <p className="p-0 m-0">
            2. Areas of Improvement:{" "}
            <span className="font-medium">
              Employment Opportunity, Cultural Preservation, Community
              Enagagement & Holistic Well-Being
            </span>
          </p>
          <p className="p-0 m-0">
            3. Need higher attention:{" "}
            <span className="font-medium">Public Transport</span>
          </p>
        </div>
      </div>
      <div className="flex gap-3 justify-content-between w-full">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="cardMetric flex bg-white border-round-2xl shadow-2"
            onClick={() => handleCardClick(metric.path)} // Set active dashboard on click
            style={{ cursor: "pointer" }} // Change cursor to pointer for better UX
          >
            <div className="flex flex-column gap-4 align-items-center">
              <img src={metric.img} alt={metric.title} className="w-11rem" />
              <div>
                <p className="text-sm font-semibold text-secondary2 pb-4 m-0 text-center">
                  {metric.title}
                </p>
              </div>
            </div>
            <div
              className="flex border-round-right-2xl px-2 flex-column gap-8 py-2"
              style={{
                backgroundColor: getScoreBackgroundColor(metric.score),
                // padding: "1.6rem",
              }}
            >
              <p className="font-medium p-0 m-0 text-white text-sm text-left">
                SCORE
              </p>
              <p className="text-3xl font-semibold text-white p-0 m-0 text-center">
                {metric.score}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-4 justify-content-end border-top-1 surface-border">
        {colors.map((color, index) => (
          <div className="flex align-items-center" key={index}>
            <div
              className="mr-2 border-circle"
              style={{
                width: "0.75rem",
                height: "0.75rem",
                backgroundColor: color,
                borderRadius: "50%", // Ensure it's circular
              }}
            ></div>
            <p className="m-0 p-0 font-medium card-text">
              {index === 0
                ? "80-100"
                : index === 1
                ? "40-80"
                : index === 2
                ? "0-40"
                : "Unknown Score Range"}{" "}
              {/* Fallback for unexpected indices */}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Society;
