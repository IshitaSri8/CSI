import React from "react";
import admin from "assets/Report/Admin.svg";
import { Divider } from "primereact/divider";
import disaster from "assets/illustration/Disaster Management.svg";
import ethical from "assets/illustration/ethical.svg";
import accountability from "assets/illustration/Transparency and accountability.svg";
import { PieChart } from "Layout/GraphVisuals";
import { useNavigate } from "react-router-dom";
import pathConstants from "pathConstants";
import score from "score";

const Administration = () => {
  const navigate = useNavigate();
  const adminLables = [
    "Disaster Management",
    "Transparency and Accountability",
    "Ethical Leadership",
  ];
  const adminData = [30, 50, 20];

  const metrics = [
    {
      img: disaster,
      title: "Disaster Management",
      score: score.DISASTER,
      path: pathConstants.DISASTER,
    },
    {
      img: ethical,
      title: "Ethical Leadership",
      score: score.ETHICAL,
      path: pathConstants.DISASTER,
    },
    {
      img: accountability,
      title: "Transparency and Accountability",
      score: score.TRANSPARENCY,
      path: pathConstants.DISASTER,
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
              <p className="card-title p-0 m-0 text-xl">Administration</p>
              <p className="text-5xl font-semibold text-secondary2 p-0 m-0">
                {score.ADMIN}
              </p>
            </div>
            <img src={admin} alt="admin" className="w-4rem" />
          </div>
            <p className="text-tertiary3">
              Empowering responsible administration for lasting impact.
            </p>
          <Divider />
        </div>
        <div
          className="flex flex-column bg-white border-round-2xl shadow-2 align-items-start justify-content-between p-4"
          style={{ flex: "28%" }}
        >
          <p className="card-title p-0 m-0 text-xl">Indicator Contribution</p>
          <PieChart
            categories={adminLables}
            series={adminData}
            height={140}
            fontSize={8}
          />
        </div>
        <div className="flex flex-column" style={{ flex: "50%" }}>
          <div className="flex flex-column border-round-2xl bg-white p-3">
            <p className="text-xl font-medium">Summary</p>
            <p className="p-0 m-0">
              The score {score.ADMIN} reflects the combined performance of the
              key administrative indicators.
            </p>
            <Divider />
            <p className="p-0 m-0">
              Administration's outstanding performance showcase exceptional
              efforts towards empowering responsible governance.
            </p>
            <Divider />
            <p className="text-lg font-medium">Indicator Highlights:</p>
            <p className="p-0 m-0">
              1. Achiever indicators: Disaster Management
            </p>
            <p className="p-0 m-0">
              2. Areas of Improvement: Transparency and Accountability
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-4 flex-wrap w-full">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="cardMetric flex bg-white border-round-2xl shadow-2"
            onClick={() => handleCardClick(metric.path)} // Set active dashboard on click
            style={{ cursor: "pointer" }} // Change cursor to pointer for better UX
          >
            <div className="flex flex-column gap-3 align-items-center">
              <img src={metric.img} alt={metric.title} />
              <div>
                <p className="text-sm font-semibold text-secondary2 pb-4 m-0 text-lg w-16rem text-center">
                  {metric.title}
                </p>
              </div>
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
    </div>
  );
};

export default Administration;
