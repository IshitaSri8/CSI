import React from "react";

import { Card } from "primereact/card"; // Assuming you're using PrimeReact's Card component

const CSIVideo = () => {
  return (
    <div className="relative w-full h-auto flex justify-content-center align-items-center px-10 m-6">
      {/* Video Section */}
      <video
        src="https://arahas-website.s3.ap-south-1.amazonaws.com/Arahas+CSI+(2).mp4"
        controls
        style={{
          width: "60%",
          height: "auto",
          borderRadius: "1rem",
        }}
      />

      {/* Heading Card (Top Left Corner) */}
      <Card
        className="absolute top-0 left-0"
        style={{
          background: "linear-gradient(to left, #1F8297, #166C7D, #003940)",
          //padding: "1rem",
          width: "18rem",
          height: "6rem",
          borderRadius: "1rem",
          transform: "translate(50%, 10%)",
        }}
      >
        <div style={{ marginTop: -20 }}>
          <h1 className="text-xl font-semibold text-white text-center">
            City Sustainability Index (CSI)
          </h1>
        </div>
      </Card>

      {/* Text Card (Bottom Right Corner) */}
      <Card
        className="absolute bottom-0 right-0 align-items-center"
        style={{
          backgroundColor: "#fff",
          //  padding: "1rem",
          width: "18rem",
          borderRadius: "1rem",
          height: "8rem",
          transform: "translate(-50%, -10%)",
        }}
      >
        <div style={{ marginTop: -20 }}>
          <p className="text-center">
            A groundbreaking tool designed to help governments, businesses, and
            citizens create smarter, more sustainable cities.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default CSIVideo;
