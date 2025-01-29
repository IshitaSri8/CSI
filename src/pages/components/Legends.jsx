import { scoreColors } from "colorConstants";
import React from "react";

const Legends = () => {
  return (
    <div className="flex gap-4 justify-content-end border-top-1 surface-border">
      {scoreColors.map((color, index) => (
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
              ? "90-100"
              : index === 1
              ? "80-90"
              : index === 2
              ? "60-80"
              : index === 3
              ? "40-60"
              : index === 4
              ? "20-40"
              : index === 5
              ? "0-20"
              : "Unknown Score Range"}{" "}
            {/* Fallback for unexpected indices */}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Legends;
