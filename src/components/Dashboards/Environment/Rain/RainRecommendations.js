import React from "react";
import { Fieldset } from "primereact/fieldset";
import { Badge } from "primereact/badge";

const RainRecommendations = () => {
  //   console.log(temperature, humidity);

  const getRecommendationRain = () => {
    return (
      <>
        <ul>
          <li className="text-sm">
            Urban Greenery and Afforestation:
            <ul>
              <li className="text-sm">
                Plant more trees, especially indigenous and drought-resistant
                species, in and around the city to increase moisture retention
                in the soil and contribute to local microclimatic changes. Green
                belts and urban forests can help retain rainwater, reduce urban
                heat islands, and potentially encourage more localized rainfall.
              </li>
            </ul>{" "}
          </li>
          <li className="text-sm">Rainwater Harvesting:</li>
          <ul>
            <li className="text-sm">
              Implement large-scale rainwater harvesting systems in public
              buildings, parks, schools, and residential areas. This can help
              collect rainwater, prevent runoff, recharge groundwater, and
              ensure better utilization of rainfall.
            </li>
          </ul>{" "}
          <li className="text-sm">Artificial Recharge and Check Dams:</li>
          <ul>
            <li className="text-sm">
              Construct check dams and artificial recharge structures in areas
              surrounding Ayodhya to help retain rainwater and allow it to
              percolate into the ground, enhancing groundwater levels.
            </li>
          </ul>{" "}
          <li className="text-sm">Awareness Campaigns:</li>
          <ul>
            <li className="text-sm">
              Launch city-wide campaigns to educate residents about water
              conservation, rainwater harvesting, and the importance of
              maintaining local water bodies. Promote community participation in
              planting trees and maintaining green spaces.
            </li>
          </ul>{" "}
          <li className="text-sm">Water Body Restoration:</li>
          <ul>
            <li className="text-sm">
              Rejuvenate and maintain local water bodies such as ponds, lakes,
              and rivers. Ensure these are free from pollution, encroachment,
              and siltation. Healthy water bodies can help in retaining
              rainwater and support biodiversity.
            </li>
          </ul>{" "}
          <li className="text-sm">Sustainable Urban Planning:</li>
          <ul>
            <li className="text-sm">
              Integrate sustainable water management practices into urban
              planning, such as permeable pavements, green roofs, and rain
              gardens, which help reduce runoff and increase water absorption.
            </li>
          </ul>{" "}
          <li className="text-sm">Incentives for Green Practices:</li>
          <ul>
            <li className="text-sm">
              Provide incentives for residents and businesses that adopt green
              practices, such as installing rainwater harvesting systems or
              using water-efficient appliances.
            </li>
          </ul>{" "}
          <li className="text-sm">Improved Drainage Infrastructure:</li>
          <ul>
            <li className="text-sm">
              Upgrade the city’s drainage infrastructure to prevent waterlogging
              during heavy rains. Efficient drainage systems can help reduce
              urban flooding and ensure that excess rainwater is properly
              managed.
            </li>
          </ul>{" "}
          <li className="text-sm">Data Collection and Monitoring:</li>
          <ul>
            <li className="text-sm">
              Establish a robust weather monitoring system to collect data on
              rainfall patterns, water levels, and usage. Use this data to make
              informed decisions on water management and conservation.
            </li>
          </ul>{" "}
          <li className="text-sm">
            Collaboration with Meteorological Agencies:
          </li>
          <ul>
            <li className="text-sm">
              Partner with meteorological and environmental agencies to better
              understand rainfall patterns and plan for extreme weather events.
              This can help the city prepare for both droughts and floods
            </li>
          </ul>{" "}
        </ul>
      </>
    );
  };

  const getBadge = () => {
    return (
      <Badge
        value="Measures to Improve Rainfall Retention and Management"
        severity="Good"
      />
    );
  };

  return (
    <div className="p-m-3">
      <Fieldset legend={getBadge()}>
        <div className="p-mb-4">{getRecommendationRain()}</div>
      </Fieldset>
    </div>
  );
};

export default RainRecommendations;
