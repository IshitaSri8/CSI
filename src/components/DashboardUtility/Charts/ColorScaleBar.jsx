import React from "react";
import { scoreColors } from "../Constants/colorConstants";

const ColorScaleBar = () => {
  const segments = [
    { label: "50", color: scoreColors[0] }, // Yellow
    { label: "100", color: scoreColors[1] }, // Orange
    { label: "200", color: scoreColors[2] }, // Pink
    { label: "300", color: scoreColors[3] }, // Purple
    { label: "400", color: scoreColors[4] }, // MediumVioletRed
    { label: "400+", color: scoreColors[5] }, // Crimson
  ];

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "15px",
        borderRadius: "5px",
        overflow: "hidden", // Ensure rounded corners work correctly
      }}
    >
      {segments.map((segment, index) => (
        <div
          key={index}
          style={{
            flex: 1,
            backgroundColor: segment.color,
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "12px",
          }}
        >
          {segment.label}
        </div>
      ))}
    </div>
  );
};

export default ColorScaleBar;
