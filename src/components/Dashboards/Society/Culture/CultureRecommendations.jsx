import React from "react";
import { Fieldset } from "primereact/fieldset";
import { Badge } from "primereact/badge";
import recom from "assets/recommendations.svg";

const CultureRecommendations = () => {
  const getRecommendation = () => {
    return (
      <>
        <ul className="font-medium text p-0 m-0">
          <li>
            Create cultural trails and tours that guide residents and tourists
            through key heritage sites, museums, and historical districts.
          </li>
          <li>
            Repurpose historic buildings for modern use while maintaining their
            cultural significance, blending heritage with urban development.
          </li>
          <li>
            Develop mobile apps or interactive websites that provide virtual
            tours, historical insights, and cultural trivia to enhance visitor
            engagement with heritage sites.
          </li>
          <li>
            Conduct periodic audits of heritage sites to assess their condition,
            ensuring timely conservation actions are taken.
          </li>
          <li>
            Partner with neighboring cities to develop regional cultural tourism
            packages that highlight the unique heritage of each area.
          </li>
          <li>
            Integrate eco-friendly practices, such as solar power and rainwater
            harvesting, into the conservation efforts of heritage sites to make
            them sustainable.
          </li>
          <li>
            Use digital platforms to document and archive historical sites and
            artifacts, ensuring their preservation for future generations.
          </li>
          <li>
            Establish funding and partnerships to restore and maintain
            historical buildings, monuments, and other cultural landmarks.
          </li>
        </ul>
      </>
    );
  };

  const getBadge = () => {
    return (
      <Badge
        value="Measures for Disaster Management"
        //severity="Good"
        style={{ backgroundColor: "#1F8297" }}
      />
    );
  };

  return (
    <div className="flex align-items-center justify-content-around px-5">
      {/* <h1 className="text-left text-xl">Recommendations</h1> */}
      {/* <Fieldset legend={getBadge()}> */}
      {getRecommendation()}
      {/* </Fieldset> */}
      <img src={recom} alt="recommendations" className="h-23rem"/>
    </div>
  );
};

export default CultureRecommendations;
