import React from "react";
import { Card } from "primereact/card";
import "primeflex/primeflex.css";
import monuments from "../../assets/KYC/monuments.png";
import hospital from "../../assets/KYC/hospital.png";
import tents from "../../assets/KYC/tent.png";
import hotels from "../../assets/KYC/hotel.png";
import dharamshala from "../../assets/KYC/shelter.png";
import slum from "../../assets/KYC/slums.png";
import socio from "../../assets/KYC/socio.png";
import education from "../../assets/KYC/education.png";

const CityDemographics = () => {
  const data = {
    "Geographical Area": { value: "35.56 Sq.km" },
    "Current Population": { value: "4,65,206" },
    "Census Population": { value: "3,31,806" },
    Zones: { value: 4 },
    Wards: { value: 60 },
    "Literacy Rate": { value: "73.6%" },
    "Parks & Open Spaces": { value: "1311.6 ha" },
    "Water Bodies": { value: 5 },
    Ghats: { value: 4 },
    Nallahs: { value: 1 },
    "Sewage Treatment Plant": { value: 1 },
    "Landfills & Dumpsite": { value: 0 },
    "A.P.M.C. Market": { value: 2 },
    "Lucknow Ayodhya Expressway": { value: "252 km" },
  };

  const assets = [
    { title: "Hospitals: 188", icon: hospital },
    { title: "Educational Facilities: 252", icon: education },
    { title: "Hotels: 17", icon: hotels },
    { title: "Dharamshala: 70", icon: dharamshala },
    { title: "Major Attractions: 9", icon: monuments },
    { title: "Fairs & Festivals: 4", icon: tents },
    { title: "Socio-Cultural Facilities: 7", icon: socio },
    { title: "Slums: 41", icon: slum },
  ];

  const dataEntries = Object.entries(data);

  return (
    <div className="p-2">
      {/* Data Cards */}
      <div className="flex flex-wrap justify-content-center mb-5 gap-4 border-solid p-5">
        {dataEntries.map(([key, val]) => (
          <Card
            key={key}
            title={key}
            className="p-0 w-full h-6rem justify-content-center align-items-center"
            style={{
              background: "linear-gradient(to left, #1F8297, #166C7D, #003940)",
              color: "white", // Text color
              flex: "1 1 calc(15% - 1rem)",
            }}
          >
            <p style={{ marginTop: -10 }}>{val.value}</p>
          </Card>
        ))}
      </div>

      {/* Assets Cards */}
      <div className="flex flex-column gap-4">
        <div className="flex justify-content-center align-items-center gap-4">
          {assets.slice(0, Math.ceil(assets.length / 2)).map((asset, index) => (
            <Card
              key={index}
              className="flex w-full h-6rem justify-content-center align-items-center p-3"
              style={{
                backgroundColor: "white",
                border: "1px solid #166C7D",
                color: "black",
              }}
            >
             <div className="flex flex-row gap-2">
              <img
                src={asset.icon}
                alt={asset.title}
                className="w-3rem h-3rem"
                style={{ marginRight: "1rem" }}
              />
              <p>{asset.title}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-content-center align-items-center gap-4">
          {assets.slice(Math.ceil(assets.length / 2)).map((asset, index) => (
            <Card
              key={index}
              className="flex w-full h-6rem justify-content-center align-items-center"
              style={{
                backgroundColor: "white",
                border: "1px solid #166C7D",
                color: "black",
              }}
            >
              <div className="flex flex-row gap-2">
              <img
                src={asset.icon}
                alt={asset.title}
                className="w-3rem h-3rem"
                style={{ marginRight: "1rem" }}
              />
              <p>{asset.title}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CityDemographics;
