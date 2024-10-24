import React from "react";
import { Fieldset } from "primereact/fieldset";
import { Badge } from "primereact/badge";

const RainRecommendations = () => {
  //   console.log(temperature, humidity);

  const getRecommendationRain = () => {
    return (
      <>
        <ul>
          <li className="text-lg text-theme font-semibold">
            Urban Greenery and Afforestation:
          </li>
          <li>
            Plant more trees, especially indigenous and drought-resistant
            species, in and around the city to increase moisture retention in
            the soil and contribute to local microclimatic changes. Green belts
            and urban forests can help retain rainwater, reduce urban heat
            islands, and potentially encourage more localized rainfall.
          </li>

          <li className="text-lg text-theme font-semibold">
            Rainwater Harvesting:
          </li>
          <li>
            Implement large-scale rainwater harvesting systems in public
            buildings, parks, schools, and residential areas. This can help
            collect rainwater, prevent runoff, recharge groundwater, and ensure
            better utilization of rainfall.
          </li>
          <li className="text-lg text-theme font-semibold">
            Artificial Recharge and Check Dams:
          </li>

          <li>
            Construct check dams and artificial recharge structures in areas
            surrounding Ayodhya to help retain rainwater and allow it to
            percolate into the ground, enhancing groundwater levels.
          </li>

          <li className="text-lg text-theme font-semibold">
            Awareness Campaigns:
          </li>

          <li>
            Launch city-wide campaigns to educate residents about water
            conservation, rainwater harvesting, and the importance of
            maintaining local water bodies. Promote community participation in
            planting trees and maintaining green spaces.
          </li>

          <li className="text-lg text-theme font-semibold">
            Water Body Restoration:
          </li>

          <li>
            Rejuvenate and maintain local water bodies such as ponds, lakes, and
            rivers. Ensure these are free from pollution, encroachment, and
            siltation. Healthy water bodies can help in retaining rainwater and
            support biodiversity.
          </li>

          <li className="text-lg text-theme font-semibold">
            Sustainable Urban Planning:
          </li>

          <li>
            Integrate sustainable water management practices into urban
            planning, such as permeable pavements, green roofs, and rain
            gardens, which help reduce runoff and increase water absorption.
          </li>

          <li className="text-lg text-theme font-semibold">
            Incentives for Green Practices:
          </li>

          <li>
            Provide incentives for residents and businesses that adopt green
            practices, such as installing rainwater harvesting systems or using
            water-efficient appliances.
          </li>

          <li className="text-lg text-theme font-semibold">
            Improved Drainage Infrastructure:
          </li>

          <li>
            Upgrade the city’s drainage infrastructure to prevent waterlogging
            during heavy rains. Efficient drainage systems can help reduce urban
            flooding and ensure that excess rainwater is properly managed.
          </li>

          <li className="text-lg text-theme font-semibold">
            Data Collection and Monitoring:
          </li>

          <li>
            Establish a robust weather monitoring system to collect data on
            rainfall patterns, water levels, and usage. Use this data to make
            informed decisions on water management and conservation.
          </li>

          <li className="text-lg text-theme font-semibold">
            Collaboration with Meteorological Agencies:
          </li>

          <li>
            Partner with meteorological and environmental agencies to better
            understand rainfall patterns and plan for extreme weather events.
            This can help the city prepare for both droughts and floods
          </li>
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
    <div className="p-4">
      {/* <h1 className="text-left text-xl">Recommendations</h1> */}
      <Fieldset legend={getBadge()}>{getRecommendationRain()}</Fieldset>
    </div>
  );
};

export default RainRecommendations;
