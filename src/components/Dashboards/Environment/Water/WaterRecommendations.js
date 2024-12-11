import React from "react";
import { Fieldset } from "primereact/fieldset";
import { Badge } from "primereact/badge";
import recom from "assets/recommendations.svg";

const WaterRecommendations = () => {
  const getRecommendationWater = () => {
    return (
      <>
        <ul>
          <li className="text-lg text-primary1 font-semibold p-0 m-0">
            Upgrade Water Treatment Plants:
          </li>

          <li className="font-medium text">
            Modernize existing water treatment facilities with advanced
            filtration, chlorination, and disinfection technologies. Introduce
            membrane filtration, UV treatment, or ozonation to remove
            contaminants and pathogens more effectively.l.
          </li>

          <li className="text-lg text-primary1 font-semibold p-0 m-0">
            Decentralized Water Treatment Systems:
          </li>

          <li className="font-medium text">
            Install small-scale, decentralized water treatment systems in local
            communities or housing clusters. This can reduce the load on
            centralized treatment plants and ensure that water is treated close
            to its point of use.
          </li>

          <li className="text-lg text-primary1 font-semibold p-0 m-0">
            Regular Monitoring of Water Quality:
          </li>

          <li className="font-medium text">
            Implement a robust water quality monitoring program that regularly
            tests water sources for contaminants, including bacteria, heavy
            metals, and chemicals. Publicly share this data to build trust and
            transparency with residents.
          </li>

          <li className="text-lg text-primary1 font-semibold p-0 m-0">
            Pollution Control Measures:
          </li>

          <li className="font-medium text">
            Strengthen regulations to control industrial discharge and waste
            dumping into water bodies. Ensure strict enforcement of wastewater
            treatment standards for industries and penalize violators to prevent
            pollution.
          </li>

          <li className="text-lg text-primary1 font-semibold p-0 m-0">
            Rainwater Harvesting:
          </li>

          <li className="font-medium text">
            Mandate the installation of rainwater harvesting systems in all new
            constructions, including residential, commercial, and public
            buildings. Encourage retrofitting existing buildings with similar
            systems to collect and store rainwater..
          </li>

          <li className="text-lg text-primary1 font-semibold p-0 m-0">
            Protect and Rejuvenate Water Bodies:
          </li>

          <li className="font-medium text">
            Implement projects to clean, restore, and protect local water bodies
            such as rivers, lakes, and ponds. Remove silt, prevent
            encroachments, and maintain these bodies to enhance their capacity
            to store and recharge groundwater.
          </li>

          <li className="text-lg text-primary1 font-semibold p-0 m-0">
            Groundwater Recharge Initiatives:
          </li>

          <li className="font-medium text">
            Promote artificial recharge techniques, such as recharge wells and
            percolation tanks, especially in areas with declining groundwater
            levels. Ensure that recharge areas are protected from contamination.
          </li>

          <li className="text-lg text-primary1 font-semibold p-0 m-0">
            Implement Efficient Irrigation Practices:
          </li>

          <li className="font-medium text">
            Encourage the use of drip irrigation, sprinkler systems, and other
            water-efficient methods for agricultural purposes. Provide subsidies
            or incentives for farmers who adopt water-saving techniques.
          </li>

          <li className="text-lg text-primary1 font-semibold p-0 m-0">
            Adopt Smart Water Management Tools:
          </li>

          <li className="font-medium text">
            Implement smart technologies like IoT-based water meters, sensors,
            and AI-driven analytics to monitor water usage patterns, detect
            leaks, and manage supply and demand more efficiently.
          </li>

          <li className="text-lg text-primary1 font-semibold p-0 m-0">
            Promote Greywater Recycling:
          </li>

          <li className="font-medium text">
            Encourage the installation of greywater recycling systems in
            residential and commercial buildings to treat and reuse water from
            baths, sinks, and washing machines for non-potable purposes like
            irrigation and flushing.
          </li>
        </ul>
      </>
    );
  };

  const getBadge = () => {
    return (
      <Badge
        value="Measures for Water Treatment & Preservation"
        style={{ backgroundColor: "#1F8297" }}
        // severity="Good"
      />
    );
  };

  return (
    <div className="flex align-items-center justify-content-around p-5">
      {/* <h1 className="text-left text-xl">Recommendations</h1> */}
      <Fieldset legend={getBadge()}>{getRecommendationWater()}</Fieldset>
      <img src={recom} alt="recommendations" />
    </div>
  );
};

export default WaterRecommendations;
