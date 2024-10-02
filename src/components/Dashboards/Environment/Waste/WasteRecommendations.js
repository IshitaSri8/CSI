import React from "react";
import { Fieldset } from "primereact/fieldset";
import { Badge } from "primereact/badge";

const WasteRecommendations = () => {
  //   console.log(temperature, humidity);

  const getRecommendationWaste = () => {
    return (
      <>
        <ul>
          <ul>
            <li className="text-sm">
              Distribute color-coded bins to households and commercial
              establishments to facilitate proper segregation. Launch city-wide
              awareness campaigns on the importance of waste segregation and the
              correct way to do it.
            </li>
          </ul>{" "}
          <ul>
            <li className="text-sm">
              Equip waste collectors with GPS-enabled tracking tools to monitor
              collection routes and efficiency. Use separate vehicles for
              different types of waste to avoid cross-contamination.
            </li>
          </ul>{" "}
          <ul>
            <li className="text-sm">
              Encourage communities to establish small-scale composting units
              and biogas plants. Provide training and financial incentives for
              local groups or startups to manage these facilities.
            </li>
          </ul>{" "}
          <ul>
            <li className="text-sm">
              Implement a digital platform for monitoring waste management,
              including real-time tracking of waste collection, segregation
              levels, and facility operations.
            </li>
          </ul>{" "}
          <ul>
            <li className="text-sm">
              Increase the number and accessibility of community toilets (CTs)
              and public toilets (PTs) in high-density areas, slums, markets,
              and tourist spots.
            </li>
          </ul>{" "}
          <ul>
            <li className="text-sm">
              Conduct regular awareness and behavioral change campaigns to
              educate citizens on the importance of using toilets and
              maintaining hygiene.
            </li>
          </ul>{" "}
          {/* <li className="text-sm">Incentives for Green Practices:</li> */}
          <ul>
            <li className="text-sm">
              Use mobile apps and online platforms to report open defecation
              incidents and take swift action to address them.
            </li>
          </ul>{" "}
          <ul>
            <li className="text-sm">
              Adopt a "Zero Waste to Landfill" approach by promoting waste
              reduction, recycling, and composting.
            </li>
          </ul>{" "}
          <ul>
            <li className="text-sm">
              Deploy street-cleaning machines, employ adequate sanitation staff,
              and establish a system for prompt waste removal from public
              spaces.
            </li>
          </ul>{" "}
          <ul>
            <li className="text-sm">
              Use technology and innovative designs for eco-friendly and
              water-saving toilets, such as bio-toilets, waterless urinals, and
              composting toilets.
            </li>
          </ul>{" "}
        </ul>
      </>
    );
  };

  const getBadge = () => {
    return <Badge value="Measures for Waste Management" severity="Good" />;
  };

  return (
    <div className="p-m-3">
      <Fieldset legend={getBadge()}>
        <div className="p-mb-4">{getRecommendationWaste()}</div>
      </Fieldset>
    </div>
  );
};

export default WasteRecommendations;
