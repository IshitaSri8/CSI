import React from "react";
import { Fieldset } from "primereact/fieldset";
import { Badge } from "primereact/badge";

const LandRecommendations = () => {
  const getRecommendationLand = () => {
    return (
      <>
        <ul>
          <li>
            Prioritize high-density, mixed-use development to maximize space
            efficiency and reduce urban sprawl. Encourage vertical expansion
            over horizontal to conserve land.
          </li>

          <li>
            Identify underutilized or vacant lands within the existing urban
            fabric for redevelopment, including brownfield sites, abandoned
            structures, and underdeveloped areas. Promote infill development to
            optimize land use.
          </li>

          <li>
            Protect existing green spaces from encroachment and degradation.
            Develop new green zones in areas with low tree cover or those
            identified as urban heat islands.
          </li>

          <li>
            Designate specific zones for urban afforestation and reforestation
            efforts. Encourage the creation of green roofs, community gardens,
            and vertical gardens in both residential and commercial areas.
          </li>

          <li>
            Protect prime agricultural land from conversion to non-agricultural
            uses. Promote sustainable agricultural practices and agroforestry.
          </li>

          <li>
            Develop policies to prevent urban encroachment into agricultural
            zones. Support small-scale urban farming initiatives and
            community-supported agriculture (CSA).
          </li>

          <li>
            <li className="font-bold text-theme">Sustainable Urban Expansion:</li>
            Direct new development towards designated growth corridors and areas
            that have existing infrastructure to support it. Avoid expansion
            into ecologically sensitive areas such as wetlands, forests, and
            agricultural zones.
          </li>

          <li>
            <li className="font-bold text-theme"> Smart Zoning Policies:</li>
            Use smart zoning to create mixed-use neighborhoods that combine
            residential, commercial, and recreational spaces, reducing the need
            for long commutes and improving quality of life.
          </li>

          <li>
            <li className="font-bold text-theme">Urban Renewal Projects:</li>
            Prioritize the redevelopment of dilapidated or underutilized areas.
            Encourage private-public partnerships (PPP) for urban renewal
            initiatives to revitalize older parts of the city.
          </li>

          <li>
            Use Geographic Information Systems (GIS) and other data analytics
            tools to monitor land use patterns, assess environmental impact, and
            make informed decisions on land allocation and development.
          </li>
        </ul>
      </>
    );
  };

  const getBadge = () => {
    return <Badge value="Measures for Land Usage" severity="Good" />;
  };

  return (
    <div className="p-4">
      {/* <h1 className="text-left text-xl">Recommendations</h1> */}
      <Fieldset legend={getBadge()}>{getRecommendationLand()}</Fieldset>
    </div>
  );
};

export default LandRecommendations;
