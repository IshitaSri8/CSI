import React from "react";
import society from "assets/Report/Society.svg";
import { Divider } from "primereact/divider";
import { PieChart } from "Layout/GraphVisuals";
import increase from "assets/increase.png";
import healthcare from "assets/illustration/Healthcare Management.svg";
import education from "assets/illustration/education.svg";
import transport from "assets/illustration/Public Transport.svg";
import employment from "assets/illustration/Employment Opportunity.svg";
import culture from "assets/illustration/Cultural Sites.svg";
import community from "assets/illustration/community.svg";
import pathConstants from "pathConstants";
import { useNavigate } from "react-router-dom";

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
      score: 80,
      path: pathConstants.HEALTHCARE,
    },
    {
      img: education,
      title: "Education",
      score: 75,
      path: pathConstants.EDUCATION,
    },
    {
      img: transport,
      title: "Public Transport",
      score: 40,
      path: pathConstants.TRANSPORT,
    },
    {
      img: employment,
      title: "Employment Opportunity",
      score: 70,
      path: pathConstants.EMPLOYMENT,
    },
    {
      img: culture,
      title: "Cultural Preservation",
      score: 85,
      path: pathConstants.CULTURE,
    },
    {
      img: community,
      title: "Community Enagagement & Holistic Well-Being",
      score: 60,
      path: pathConstants.COMMUNITY,
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

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div className="flex flex-column p-4 gap-4">
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
                  <span style={{ color: "#0C9D61" }}>8.5%</span> Up from last
                  year.
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
          <p className="card-title p-0 m-0 text-xl">Indicator Contribution</p>
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
              The score 80 is combined output of all the indicators falling
              under SDG 11.
            </p>
            <Divider />
            <p>
              CSI promotes integrated and balanced urban development strategies.
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
            onClick={() => handleCardClick(metric.path)} // Set active dashboard on click
            style={{ cursor: "pointer" }} // Change cursor to pointer for better UX
          >
            <div className="flex flex-column gap-3 align-items-center">
              <img src={metric.img} alt={metric.title} />
              <div>
                <p className="text-sm font-semibold text-secondary2 pb-4 m-0 text-lg w-15rem text-center">
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

export default Society;
