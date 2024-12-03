import React from "react";
import { Fieldset } from "primereact/fieldset";
import { Badge } from "primereact/badge";

const CommunityRecommendations = () => {
  const getRecommendationLand = () => {
    return (
      <>
        <ul className="text-xl">
            <li>
              1. Evacuation of Affected Areas: Safe and timely relocation of
              people from high-risk zones.
            </li>{" "}
            <li>
              {" "}
              2. Search and Rescue Operations: Deployment of rescue teams to
              find and assist trapped or missing individuals.
            </li>{" "}
            <li>
              3. Medical Aid and Emergency Services: Setting up medical camps
              and providing first aid to injured victims.
            </li>
            {""}
            <li>
              4. Shelter and Relief Camps: Establishment of temporary shelters
              for displaced individuals with access to food, water, and basic
              amenities.
            </li>{" "}
            <li>
              5. Communitye Teams Deployment: Mobilization of National
              Communitye Force (NDRF) and other emergency units.
            </li>
          </ul>
      </>
    );
  };

  const getBadge = () => {
    return (
      <Badge
        value="Measures Taken for Disaster Management"
        //severity="Good"
        style={{ backgroundColor: "#1F8297" }}
      />
    );
  };

  return (
    <div className="p-4">
      {/* <h1 className="text-left text-xl">Recommendations</h1> */}
      <Fieldset legend={getBadge()}>{getRecommendationLand()}</Fieldset>
    </div>
  );
};

export default CommunityRecommendations;