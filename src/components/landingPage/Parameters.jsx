import { Card } from "primereact/card";
import React from "react";
import "primeicons/primeicons.css"; // Import PrimeIcons

const Parameters = () => {
  return (
    <div className="flex align-items-center justify-content-center flex-column px-5 gap-6">
      {/* Heading */}
      <h1 className="text-4xl text-theme text-center">
        Parameters of City Sustainability Index
      </h1>

      <div className="flex align-items-center justify-content-center flex-row gap-8 w-full px-8">
        <Card
          className="sec-theme w-full h-25rem px-5 shadow-none"
          style={{ border: "1.5px solid #166c7d", borderRadius: "0.75rem" }}
        >
          <div className="flex flex-column align-items-center justify-content-center ">
            <i className="pi pi-warehouse text-4xl"></i>
            <h3 className="text-center text-3xl">Nature</h3>
            <p className="text-center text-lg">
              Nature is the complex set of physical, geographic, biological,
              social, cultural and political conditions that surround an
              individual or organism that ultimately determines its form and the
              nature of its survival.
            </p>
          </div>
        </Card>

        <Card
          className="sec-theme w-full h-25rem px-5 shadow-none"
          style={{ border: "1.5px solid #166c7d", borderRadius: "0.75rem" }}
        >
          <div className="flex flex-column align-items-center justify-content-center ">
            <i
              className="pi pi-warehouse text-4xl"
              style={{ alignContent: "center" }}
            ></i>
            <h3 className="text-center text-3xl">Social</h3>
            <p className="text-center text-lg">
              Social sustainability is a process for creating sustainable
              successful places that promote wellbeing, by understanding what
              people need from the places they live and work. 
            </p>
          </div>
        </Card>

        <Card
          className="sec-theme w-full h-25rem px-5 shadow-none"
          style={{ border: "1.5px solid #166c7d", borderRadius: "0.75rem" }}
        >
          <div className="flex flex-column align-items-center justify-content-center ">
            <i className="pi pi-warehouse text-4xl"></i>
            <h3 className="text-center text-3xl">Administration</h3>
            <p className="text-center text-lg">
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
