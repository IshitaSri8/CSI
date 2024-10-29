import React from "react";
import { Fieldset } from "primereact/fieldset";
import { Badge } from "primereact/badge";

const WasteRecommendations = () => {
  const getRecommendationWaste = () => {
    return (
      <>
        <ul>
          <li>
            Distribute color-coded bins to households and commercial
            establishments to facilitate proper segregation. Launch city-wide
            awareness campaigns on the importance of waste segregation and the
            correct way to do it.
          </li>

          <li>
            Equip waste collectors with GPS-enabled tracking tools to monitor
            collection routes and efficiency. Use separate vehicles for
            different types of waste to avoid cross-contamination.
          </li>

          <li>
            Encourage communities to establish small-scale composting units and
            biogas plants. Provide training and financial incentives for local
            groups or startups to manage these facilities.
          </li>

          <li>
            Implement a digital platform for monitoring waste management,
            including real-time tracking of waste collection, segregation
            levels, and facility operations.
          </li>

          <li>
            Increase the number and accessibility of community toilets (CTs) and
            public toilets (PTs) in high-density areas, slums, markets, and
            tourist spots.
          </li>

          <li>
            Conduct regular awareness and behavioral change campaigns to educate
            citizens on the importance of using toilets and maintaining hygiene.
          </li>

          {/* <li>Incentives for Green Practices:</li> */}

          <li>
            Use mobile apps and online platforms to report open defecation
            incidents and take swift action to address them.
          </li>

          <li>
            Adopt a "Zero Waste to Landfill" approach by promoting waste
            reduction, recycling, and composting.
          </li>

          <li>
            Deploy street-cleaning machines, employ adequate sanitation staff,
            and establish a system for prompt waste removal from public spaces.
          </li>

          <li>
            Use technology and innovative designs for eco-friendly and
            water-saving toilets, such as bio-toilets, waterless urinals, and
            composting toilets.
          </li>
        </ul>
      </>
    );
  };

  const getBadge = () => {
    return (
      <Badge
        value="Measures for Waste Management"
        style={{ backgroundColor: "#1F8297" }}
      />
    );
  };

  return (
    <div className="p-4">
      {/* <h1 className="text-left text-xl">Recommendations</h1> */}
      <Fieldset legend={getBadge()}>{getRecommendationWaste()}</Fieldset>
    </div>
  );
};

export default WasteRecommendations;
