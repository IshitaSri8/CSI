import React from "react";
import { Fieldset } from "primereact/fieldset";
import { Badge } from "primereact/badge";

const WaterRecommendations = () => {
  //   console.log(temperature, humidity);

  const getRecommendationWater = () => {
    return (
      <>
        <ul>
          <li className="text-sm">
            Upgrade Water Treatment Plants:
            <ul>
              <li className="text-sm">
                Modernize existing water treatment facilities with advanced
                filtration, chlorination, and disinfection technologies.
                Introduce membrane filtration, UV treatment, or ozonation to
                remove contaminants and pathogens more effectively.l.
              </li>
            </ul>{" "}
          </li>
          <li className="text-sm">Decentralized Water Treatment Systems:</li>
          <ul>
            <li className="text-sm">
              Install small-scale, decentralized water treatment systems in
              local communities or housing clusters. This can reduce the load on
              centralized treatment plants and ensure that water is treated
              close to its point of use.
            </li>
          </ul>{" "}
          <li className="text-sm">Regular Monitoring of Water Quality:</li>
          <ul>
            <li className="text-sm">
              Implement a robust water quality monitoring program that regularly
              tests water sources for contaminants, including bacteria, heavy
              metals, and chemicals. Publicly share this data to build trust and
              transparency with residents.
            </li>
          </ul>{" "}
          <li className="text-sm">Pollution Control Measures:</li>
          <ul>
            <li className="text-sm">
              Strengthen regulations to control industrial discharge and waste
              dumping into water bodies. Ensure strict enforcement of wastewater
              treatment standards for industries and penalize violators to
              prevent pollution.
            </li>
          </ul>{" "}
          <li className="text-sm">Rainwater Harvesting:</li>
          <ul>
            <li className="text-sm">
              Mandate the installation of rainwater harvesting systems in all
              new constructions, including residential, commercial, and public
              buildings. Encourage retrofitting existing buildings with similar
              systems to collect and store rainwater..
            </li>
          </ul>{" "}
          <li className="text-sm">Protect and Rejuvenate Water Bodies:</li>
          <ul>
            <li className="text-sm">
              Implement projects to clean, restore, and protect local water
              bodies such as rivers, lakes, and ponds. Remove silt, prevent
              encroachments, and maintain these bodies to enhance their capacity
              to store and recharge groundwater.
            </li>
          </ul>{" "}
          <li className="text-sm">Groundwater Recharge Initiatives:</li>
          <ul>
            <li className="text-sm">
              Promote artificial recharge techniques, such as recharge wells and
              percolation tanks, especially in areas with declining groundwater
              levels. Ensure that recharge areas are protected from
              contamination.
            </li>
          </ul>{" "}
          <li className="text-sm">Implement Efficient Irrigation Practices:</li>
          <ul>
            <li className="text-sm">
              Encourage the use of drip irrigation, sprinkler systems, and other
              water-efficient methods for agricultural purposes. Provide
              subsidies or incentives for farmers who adopt water-saving
              techniques.
            </li>
          </ul>{" "}
          <li className="text-sm">Adopt Smart Water Management Tools:</li>
          <ul>
            <li className="text-sm">
              Implement smart technologies like IoT-based water meters, sensors,
              and AI-driven analytics to monitor water usage patterns, detect
              leaks, and manage supply and demand more efficiently.
            </li>
          </ul>{" "}
          <li className="text-sm">Promote Greywater Recycling:</li>
          <ul>
            <li className="text-sm">
              Encourage the installation of greywater recycling systems in
              residential and commercial buildings to treat and reuse water from
              baths, sinks, and washing machines for non-potable purposes like
              irrigation and flushing.
            </li>
          </ul>{" "}
        </ul>
      </>
    );
  };

  const getBadge = () => {
    return (
      <Badge
        value="Measures to be taken for Water Treatment & Preservation"
        severity="Good"
      />
    );
  };

  return (
    <div className="p-m-3">
      <Fieldset legend={getBadge()}>
        <div className="p-mb-4">{getRecommendationWater()}</div>
      </Fieldset>
    </div>
  );
};

export default WaterRecommendations;
