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
        <Card className="flex flex-column align-items-center justify-content-center sec-theme w-full h-auto px-5 shadow-none" style={{ border: "1px solid #166c7d" }}>
          <i className="pi pi-warehouse text-4xl"></i> 
          <h3 className="text-center text-3xl">Environment</h3>
          <p className="text-center text-lg">
            Lorem ipsum dolor sit amet consectetur. Faucibus augue phasellus
            egestas vel commodo molestie. Non duis nunc risus vitae in semper.
            Faucibus nibh quis a nulla placerat sit volutpat. Vel ac adipiscing
            posuere aenean a gravida. Non duis nunc risus vitae in semper.
            Faucibus nibh quis a nulla placerat sit volutpat. Vel ac adipiscing
            posuere aenean a gravida.
          </p>
        </Card>

        <Card className="flex flex-column align-items-center justify-content-center sec-theme w-full h-auto px-5 shadow-none" style={{ border: "1px solid #166c7d" }}>
          <i className="pi pi-warehouse text-4xl" style={{alignContent:"center"}}></i> 
          <h3 className="text-center text-3xl">Social</h3>
          <p className="text-center text-lg">
            Lorem ipsum dolor sit amet consectetur. Faucibus augue phasellus
            egestas vel commodo molestie. Non duis nunc risus vitae in semper.
            Faucibus nibh quis a nulla placerat sit volutpat. Vel ac adipiscing
            posuere aenean a gravida. Non duis nunc risus vitae in semper.
            Faucibus nibh quis a nulla placerat sit volutpat. Vel ac adipiscing
            posuere aenean a gravida.
          </p>
        </Card>

        <Card className="flex flex-column align-items-center justify-content-center sec-theme w-full h-auto px-5 shadow-none" style={{ border: "1px solid #166c7d" }}>
          <i className="pi pi-warehouse text-4xl"></i> 
          <h3 className="text-center text-3xl">Economy</h3>
          <p className="text-center text-lg">
            Lorem ipsum dolor sit amet consectetur. Faucibus augue phasellus
            egestas vel commodo molestie. Non duis nunc risus vitae in semper.
            Faucibus nibh quis a nulla placerat sit volutpat. Vel ac adipiscing
            posuere aenean a gravida. Non duis nunc risus vitae in semper.
            Faucibus nibh quis a nulla placerat sit volutpat. Vel ac adipiscing
            posuere aenean a gravida.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Parameters;
