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
            Ensure that job advertisements are accessible to all, including
            individuals with disabilities, and promote equal opportunity
            employment.
          </li>
          <li>
            Organize job fairs that connect local employers with job seekers,
            facilitating direct engagement and networking.
          </li>
          <li>
            Implement programs that support and formalize informal businesses,
            providing them with access to financing and legal resources.
          </li>
          <li>
            Develop apprenticeship programs in partnership with local industries
            to provide hands-on experience and facilitate job placements.
          </li>
          <li>
            Encourage companies to adopt diverse hiring practices, promoting
            representation of various groups in the workforce.
          </li>
          <li>
            Establish vocational training centers that focus on high-demand
            skills, ensuring alignment with local job market needs.
          </li>
          <li>
            Provide tax breaks or grants to companies that create jobs in
            high-unemployment areas, encouraging local hiring.
          </li>
          <li>
            Create incubation centers that offer resources and mentorship to new
            businesses, fostering entrepreneurship and job creation.
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
      <img src={recom} alt="recommendations" className="h-22rem"/>
    </div>
  );
};

export default TransportRecommendations;
