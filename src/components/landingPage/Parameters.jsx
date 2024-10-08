import React from "react";
import "primeicons/primeicons.css"; // Import PrimeIcons
import Nature from "assets/Nature Illustration.svg";
import Society from "assets/Society Illustration.svg";
import Admin from "assets/Admin Illustration.svg";

const Parameters = () => {
  return (
    <div className="flex align-items-center justify-content-center flex-column px-8 gap-6">
      {/* Heading */}
      <h1 className="text-4xl text-theme text-center">
        Dimensions of City Sustainability Index
      </h1>

      <div className="flex align-items-center justify-content-center flex-row gap-4 w-full px-8">
        <div
          className="sec-theme w-full h-full shadow-none mx-4"
          style={{ border: "1.5px solid #166c7d", borderRadius: "0.75rem" }}
        >
          <div className="flex flex-column align-items-left justify-content-start m-0 p-0 ">
            <img src={Nature} alt="Nature" className="w-full" />
            <h3 className="text-3xl mb-0 mx-6 text-900">Nature</h3>
            <p className="mx-6 mb-5">
              Nature is the complex set of physical, geographic, biological,
              social, cultural and political conditions that surround an
              individual or organism that ultimately determines its form and the
              nature of its survival.
            </p>
          </div>
        </div>

        <div
          className="sec-theme w-full h-full shadow-none mx-4 pb-4"
          style={{ border: "1.5px solid #166c7d", borderRadius: "0.75rem" }}
        >
          <div className="flex flex-column align-items-left justify-content-start ">
            <img src={Society} alt="Society" className="w-full" />
            <h3 className="text-3xl mb-0 text-900 mx-6">Social</h3>
            <p className="mx-6 mb-5">
              Social sustainability is a process for creating sustainable
              successful places that promote wellbeing, by understanding what
              people need from the places they live and work.
            </p>
          </div>
        </div>

        <div
          className="sec-theme w-full h-full shadow-none mx-4"
          style={{ border: "1.5px solid #166c7d", borderRadius: "0.75rem" }}
        >
          <div className="flex flex-column align-items-left justify-content-start ">
            <img src={Admin} alt="Admin" className="w-full" />
            <h3 className="mx-6 text-3xl mb-0 text-900">Administration</h3>
            <p className="mx-6 mb-5">
              Aspects under Administration look at how society polices itself,
              focusing on internal controls and methods to preserve compliance
              with legislation, best practices, and policies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Parameters;
