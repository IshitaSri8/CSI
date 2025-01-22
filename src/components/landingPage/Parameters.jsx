import React from "react";
import "primeicons/primeicons.css";
import Nature from "assets/environment illustration.svg";
import Society from "assets/Society Illustration-1.svg";
import Admin from "assets/admin illustration 1.svg";
import nature_video from "assets/videos/nature_video.mp4";
import society_video from "assets/videos/society.mp4";
import admin_video from "assets/videos/admin.mp4";

const Parameters = () => {
  const parameters = [
    {
      id: 1,
      title: "Nature",
      image: Nature,
      video: nature_video,
      description:
        "Nature encompasses the ecosystem within a city that impact its surroundings and inhabitants’ quality of life. It includes elements like air quality, water conservation, biodiversity, waste management, all vital for a sustainable urban environment.",
    },
    {
      id: 2,
      title: "Society",
      image: Society,
      video: society_video,
      description:
        "Society focuses on creating sustainable and thriving environments that enhance well-being. It combines the design of physical spaces with the development of a supportive social framework to meet the needs of individuals in the places they live and work.",
    },
    {
      id: 3,
      title: "Administration",
      image: Admin,
      video: admin_video,
      description:
        "Administration refers to the governance, institutional frameworks, and accountability systems that manage a city’s operations. It emphasizes transparency, ethical leadership, and risk management to ensure citizen well-being and drive sustainable growth.",
    },
  ];

  return (
    <div className="flex align-items-center flex-column gap-6 md:flex-wrap overflow-auto" style={{ marginTop: 100 }}>
      <p className="text-4xl text-primary1 m-0 p-0 font-bold textAni">
        Dimensions of City Sustainability Index
      </p>

      <div className="flex align-items-center justify-content-center gap-6 flex-1">
        {parameters.map((param) => (
          <div
            key={param.id}
            className="sec-theme flex flex-column border-round-xl"
          >
            {/* <img
              src={param.image}
              alt={param.title}
              className="w-full border-round-top-xl"
            /> */}
            <video
              src={param.video}
              autoPlay
              muted
              loop
              className="h-16rem border-round-top-xl "
              style={{
                objectFit: "cover",
              }}
            />
            <div className="flex flex-column align-items-start p-4">
              <p className="text-3xl text-primary1 font-semibold p-0 m-0">
                {param.title}
              </p>
              <p className="text-lg">{param.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Parameters;
