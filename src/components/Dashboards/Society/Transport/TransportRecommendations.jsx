import React from "react";
import { Fieldset } from "primereact/fieldset";
import { Badge } from "primereact/badge";
import recom from "assets/recommendations.svg";

const TransportRecommendations = () => {
  const getRecommendation = () => {
    return (
      <>
        <ul className="font-medium text p-0 m-0">
          <li>
            Invest in modernizing bus and train stations, ensuring they are
            well-designed, safe, and equipped with necessary facilities like
            seating and signage.
          </li>
          <li>
            Implement fare subsidies for low-income individuals and families,
            ensuring affordability for all socio-economic groups.
          </li>
          <li>
            Enhance service frequency during peak and off-peak hours to reduce
            waiting times and improve user convenience.
          </li>
          <li>
            Develop an integrated ticketing system that allows seamless
            transfers between different modes of public transport, simplifying
            fare payment.
          </li>
          <li>
            Implement passenger load monitoring systems to adjust services based
            on demand and avoid overcrowding, especially during peak hours.
          </li>
          <li>
            Ensure all public transport vehicles and stations are accessible for
            people with disabilities, including ramps, elevators, and designated
            seating.
          </li>
          <li>
            Extend public transport routes to underserved areas, ensuring that
            all neighborhoods have access to reliable and efficient
            transportation.
          </li>
          <li>
            Implement discounted fares for senior citizens to encourage their
            use of public transport and ensure mobility for all age
            groups.Implement a regular maintenance schedule for all public
            transport vehicles and infrastructure to ensure safety and
            reliability for users.
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
      <img src={recom} alt="recommendations" className="h-25rem" />
    </div>
  );
};

export default TransportRecommendations;
