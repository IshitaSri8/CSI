import React from "react";
import "primeicons/primeicons.css"; // Import PrimeIcons
import Nature from "assets/environment illustration.svg";
import Society from "assets/Society Illustration-1.svg";
import Admin from "assets/admin illustration 1.svg";

const Parameters = () => {
  return (
    <div className="flex align-items-center justify-content-center flex-column px-8 gap-6 ">
      {/* Heading */}
      <h1 className="text-4xl text-primary1 text-center">
        Dimensions of City Sustainability Index
      </h1>

      <div className="flex align-items-center justify-content-center flex-row gap-3 w-full ">
        <div
          className="sec-theme w-full h-full shadow-none mx-4 flex flex-column align-items-left justify-content-start m-0 p-0 border-round-xl"
          // style={{ border: "1.5px solid #166c7d", borderRadius: "0.75rem" }}
        >
          <img
            src={Nature}
            alt="Nature"
            className="w-full border-round-top-xl"
          />
          <h3 className="text-3xl mb-0 mx-6 text-primary1">Nature</h3>
          <p className="mx-6 mb-5">
            Nature refers to the integrated environmental systems and ecological
            conditions within a city that impact both the natural surroundings
            and the quality of life for its inhabitants. It encompasses key
            elements such as air quality, water conservation, land use,
            biodiversity, and waste management, which together determine the
            health, resilience, and sustainability of the urban environment.
          </p>
        </div>

        <div
          className="sec-theme w-full h-full shadow-none mx-4 p-0 m-0 flex flex-column align-items-left justify-content-start border-round-xl"
          // style={{ border: "1.5px solid #166c7d", borderRadius: "0.75rem" }}
        >
          <img
            src={Society}
            alt="Society"
            className="w-full border-round-top-xl"
          />
          <h3 className="text-3xl mb-0 text-primary1 mx-6">Society</h3>
          <p className="mx-6 mb-5">
            Society refers to the process of developing thriving and sustainable
            environments that enhance well-being. This involves understanding
            the needs of individuals in the spaces they inhabit and work. Social
            sustainability merges the design of the physical environment with
            the creation of a supportive social framework.
          </p>
        </div>

        <div
          className="flex flex-column align-items-left justify-content-start sec-theme w-full h-full shadow-none mx-4 border-round-xl p-0 m-0"
          // style={{ border: "1.5px solid #166c7d", borderRadius: "0.75rem" }}
        >
          <img src={Admin} alt="Admin" className="w-full border-round-top-xl" />
          <h3 className="mx-6 text-3xl mb-0 text-primary1">Administration</h3>
          <p className="mx-6 mb-5">
            Administration refers to the governance mechanisms, institutional
            frameworks, and systems of accountability that manage a city's
            operations, ensure compliance with laws, and promote ethical and
            effective public service. It focuses on the city's ability to uphold
            transparency, foster ethical leadership, and manage risks, ensuring
            the well-being of its citizens while driving sustainable
            development.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Parameters;
