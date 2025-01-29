import React from "react";
import { useNavigate } from "react-router-dom";
import { scoreColors } from "colorConstants";

const ParameterCard = ({ metrics }) => {
  const navigate = useNavigate();
  // Function to determine background color based on score
  const getScoreBackgroundColor = (score) => {
    if (score >= 90 && score <= 100) {
      return scoreColors[0]; // Green for good
    } else if (score >= 80 && score < 90) {
      return scoreColors[1]; // Light green for moderate
    } else if (score >= 60 && score < 80) {
      return scoreColors[2]; // Yellow for moderate
    } else if (score >= 40 && score < 60) {
      return scoreColors[3]; // Warning yellow
    } else if (score >= 20 && score < 40) {
      return scoreColors[4]; // Red for poor
    } else if (score >= 0 && score < 20) {
      return scoreColors[5]; // Dark red for very poor
    }
    return "#000"; // Fallback color if no condition is met
  };
  const handleCardClick = (path) => {
    navigate(path);
  };
  return (
    <>
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="cardMetric flex bg-white border-round-2xl shadow-2"
          onClick={() => handleCardClick(metric.path)} // Set active dashboard on click
          style={{ cursor: "pointer" }} // Change cursor to pointer for better UX
        >
          <div className="flex flex-column gap-3 align-items-center justify-content-between">
            <img src={metric.img} alt={metric.title} className="w-11rem" />
            <div>
              <p className="text-sm font-semibold text-secondary2 pb-4 m-0 text-center w-10rem">
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
    </>
  );
};

export default ParameterCard;
