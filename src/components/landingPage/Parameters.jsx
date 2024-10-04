import { Card } from "primereact/card";
import React from "react";
import "primeicons/primeicons.css"; // Import PrimeIcons
import Nature from "assets/Nature Illustration.svg"
import Society from "assets/Society Illustration.svg"
import Admin from "assets/Admin Illustration.svg"

const Parameters = () => {
  return (
    <div className="flex align-items-center justify-content-center flex-column px-8 gap-6">
      {/* Heading */}
      <h1 className="text-4xl text-theme text-center">
        Parameters of City Sustainability Index
      </h1>

      <div className="flex align-items-center justify-content-center flex-row gap-4 w-full px-8">
        <Card
          className="sec-theme w-full h-full shadow-none mx-4"
          style={{ border: "1.5px solid #166c7d", borderRadius: "0.75rem" }}
        >
          <div className="flex flex-column align-items-center justify-content-center m-0 p-0 ">
            <img src={Nature} alt="Nature" className="w-full"/>
            <h3 className="text-center text-3xl mb-0 text-900">Nature</h3>
            <p className="text-center mx-5">
              Nature is the complex set of physical, geographic, biological,
              social, cultural and political conditions that surround an
              individual or organism that ultimately determines its form and the
              nature of its survival.
            </p>
          </div>
        </Card>

        <Card
          className="sec-theme w-full h-full shadow-none mx-4"
          style={{ border: "1.5px solid #166c7d", borderRadius: "0.75rem" }}
        >
          <div className="flex flex-column align-items-center justify-content-center ">
          <img src={Society} alt="Society" className="w-full"/>
            <h3 className="text-center text-3xl mb-0 text-900">Social</h3>
            <p className="text-center mx-5">
              Social sustainability is a process for creating sustainable
              successful places that promote wellbeing, by understanding what
              people need from the places they live and work. 
            </p>
          </div>
        </Card>

        <Card
          className="sec-theme w-full h-full shadow-none mx-4"
          style={{ border: "1.5px solid #166c7d", borderRadius: "0.75rem" }}
        >
          <div className="flex flex-column align-items-center justify-content-center ">
          <img src={Admin} alt="Admin" className="w-full" />
            <h3 className="text-center text-3xl mb-0 text-900">Administration</h3>
            <p className="text-center mx-5">
              Aspects under Administration look at how society polices itself,
              focusing on internal controls and methods to preserve compliance
              with legislation, best practices, and policies.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Parameters;
