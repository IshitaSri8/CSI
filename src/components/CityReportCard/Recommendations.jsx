import React from "react";
import recom from "assets/recommendations.png";
import { Divider } from "primereact/divider";
const Recommendations = () => {
  //   console.log(temperature, humidity);

  const getRecommendation = () => {
    return (
      <>
        <ul>
          <li className="font-medium text-lg">
            1. Extremely high levels of PM2.5 and PM10 were recorded in areas
            like Ranopali Kila Road and near the airport in Ayodhya on January
            29, 2024. These levels exceeded 900 for PM2.5 and touched 1000 for
            PM10, indicating an "extremely hazardous" air quality condition.
            Limit outdoor activities as much as possible, especially for
            sensitive groups like children and elderly. Such concentrations of
            particulate matter pose immediate health risks to vulnerable group
            exacerbating respiratory conditions such as asthma and bronchitis.
          </li>
        </ul>{" "}
        <ul>
          <li className="font-medium  text-lg">
            2. Invest in alternative water sources such as rainwater harvesting,
            desalination, and wastewater recycling. Implement stringent
            regulations to prevent industrial, agricultural, and domestic
            pollution of water sources.
          </li>
        </ul>{" "}
        <ul>
          <li className="font-medium  text-lg">
            3. Develop a Digital Waste Tracking System. Maintain a current
            inventory of hazardous materials employed within work areas.
          </li>
        </ul>{" "}
      </>
    );
  };

  //   const getBadge = () => {
  //     return (
  //       <Badge
  //         value="Measures to be taken for Water Treatment & Preservation"
  //         severity="Good"
  //       />
  //     );
  //   };

  return (
    <div className="flex flex-row align-items-start justify-content-center gap-8 p-m-3">
      <div className="text-sm">{getRecommendation()}</div>

      <img src={recom} className="h-25rem w-25rem " alt="recommednations"></img>
    </div>
  );
};

export default Recommendations;
