// CustomTooltip.js
import React from "react";
import "./CustomTooltip.css";

const CustomTooltip = ({ children, content }) => {
  return (
    <div className="custom-tooltip-container ">
      {children}
      <div className="custom-tooltip-content p-1 h-6rem flex align-items-center justify-content-center w-18rem">
        {content}
      </div>
    </div>
  );
};

export default CustomTooltip;
