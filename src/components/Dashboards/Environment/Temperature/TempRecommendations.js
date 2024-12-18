import React from "react";
import { Fieldset } from "primereact/fieldset";
import { Badge } from "primereact/badge";
import recom from "assets/recommendations.svg";

const TempRecommendations = ({ temperature }) => {
  const getRecommendationTemp = (temp) => {
    if (temp > 40) {
      return (
        <div className="flex flex-column">
          <li className="text-lg text-primary1 font-semibold">
            Heat Safety Tips:
          </li>

          <p className="font-medium text p-0 m-0">
            Use fans, air coolers, or air conditioning to regulate indoor
            temperatures, especially in living spaces for children and the
            elderly.
          </p>
          <p className="font-medium text p-0 m-0">
            Keep windows and curtains closed during the hottest part of the day
            to block out direct sunlight.
          </p>
          <p className="font-medium text p-0 m-0">
            Use energy-efficient appliances to reduce overall energy consumption
            and prevent additional heat generation indoors.
          </p>
          <p className="font-medium text p-0 m-0">
            Use light-colored, reflective materials for roofs and pavements to
            reduce heat absorption.
          </p>
          <p className="font-medium text p-0 m-0">
            Encourage the use of cool paints or coatings that reflect more
            sunlight and absorb less heat.
          </p>
          <p className="font-medium text p-0 m-0">
            Plan outdoor activities early in the morning or late in the
            afternoon when temperatures are cooler.
          </p>
          <p className="font-medium text p-0 m-0">
            Children and Elderly: Minimize outdoor exposure between 11 AM and 4
            PM when the sun is at its peak.
          </p>
          <p className="font-medium text p-0 m-0">
            For those who must be outdoors, try to stay in shaded areas whenever
            possible.
          </p>
          <p className="font-medium text p-0 m-0">
            Wear loose, light-colored, and breathable clothing made of cotton or
            linen.
          </p>
          <p className="font-medium text p-0 m-0">
            Children should wear hats or caps when playing outside to protect
            them from direct sun exposure.
          </p>
          <p className="font-medium text">
            Elderly individuals should avoid tight or layered clothing to reduce
            the risk of overheating.
          </p>

          <li className="text-lg text-primary1 font-semibold">
            General Tips:{" "}
          </li>

          <p className="font-medium text">
            These recommendations are designed to help maintain a sustainable
            and safe environment by keeping temperatures within bearable and
            healthy limits.
          </p>
        </div>
      );
    } else {
      return (
        <div className="flex flex-column">
          <li className="text-lg text-primary1 font-semibold">
            Stay Hydrated{" "}
          </li>
          <p className="font-medium text p-0 m-0">
            Drink plenty of water throughout the day, even if you don’t feel
            thirsty.{" "}
          </p>
          <p className="font-medium text p-0 m-0">
            Avoid alcohol, caffeine, and sugary drinks, which can cause
            dehydration.{" "}
          </p>
          <p className="font-medium text p-0 m-0">
            Children should drink water frequently, especially if they are
            active.{" "}
          </p>
          <p className="font-medium text">
            Remind older adults to drink water regularly, as they may not
            recognize signs of dehydration readily.{" "}
          </p>

          <li className="text-lg text-primary1 font-semibold">
            Recognize Signs of Heat-Related Illness{" "}
          </li>

          <p className="font-medium text p-0 m-0">
            Be aware of signs like dizziness, headache, rapid heartbeat, nausea,
            excessive sweating, or confusion.{" "}
          </p>
          <p className="font-medium text">
            Move to a cooler place, drink water, and use cool cloths on your
            skin. If symptoms persist, seek medical help immediately.{" "}
          </p>

          <li className="text-lg text-primary1 font-semibold">Adjust Diet</li>

          <p className="font-medium text p-0 m-0">
            Eat light meals with plenty of fruits and vegetables.{" "}
          </p>

          <p className="font-medium text p-0 m-0">
            Avoid heavy, hot, or spicy foods that can increase body heat.{" "}
          </p>

          <p className="font-medium text">
            Opt for hydrating foods like watermelon, cucumbers, and oranges.{" "}
          </p>

          <li className="text-lg text-primary1 font-semibold">
            Provide Special Care for Vulnerable Groups
          </li>

          <p className="font-medium text p-0 m-0">
            Ensure children stay in shaded or cool areas. Make cooling
            activities like baths or using a fan available.{" "}
          </p>
          <p className="font-medium text p-0 m-0">
            Check on older adults frequently, ensuring they are comfortable and
            hydrated.{" "}
          </p>
          <p className="font-medium text p-0 m-0">
            Pregnant women and individuals with health conditions should avoid
            heat exposure and stay hydrated.{" "}
          </p>
        </div>
      );
    }
  };

  const getBadge = (temp) => {
    return temp > 40 ? (
      <Badge value="Beat the Heat" severity="danger" />
    ) : (
      <Badge
        value="Your Ultimate Temperature Tips"
        //style={{ backgroundColor: '#1F8297'}}
        //severity="warning"
      />
    );
  };

  const recommendations = getRecommendationTemp(temperature);

  return (
    <div className="flex align-items-center justify-content-around p-5">
      {/* <h1 className="text-left text-xl">Recommendations</h1> */}
      <Fieldset legend={getBadge(temperature)}>
        <div className="flex align-items-center justify-content-around">
          {recommendations}
          <img src={recom} alt="recommendations" className="h-25rem" />
        </div>
      </Fieldset>
    </div>
  );
};

export default TempRecommendations;

{
  /* {recommendations.map((item, index) => (
          <div key={index} className="p-2">
            <h2 className="text-theme">{item.title}</h2>
            <ul className="ml-4">
              {item.recommendations.map((rec, recIndex) => (
                <li key={recIndex} className="text-lg m-2 text-900">
                  {rec}
                </p>
              ))}
            </ul>
          </div>
        ))} */
}
