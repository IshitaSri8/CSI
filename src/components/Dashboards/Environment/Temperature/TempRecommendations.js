import React from "react";
import { Fieldset } from "primereact/fieldset";
import { Badge } from "primereact/badge";

const TempRecommendations = ({ temperature, humidity }) => {
  //   console.log(temperature, humidity);

  const getRecommendationTemp = (temp) => {
    if (temp > 40) {
      return (
        <>
          <ul>
            <li className="text-base">
              Use fans, air coolers, or air conditioning to regulate indoor
              temperatures, especially in living spaces for children and the
              elderly.
            </li>
            <li className="text-base">
              Keep windows and curtains closed during the hottest part of the
              day to block out direct sunlight.
            </li>
            <li className="text-base">
              Use energy-efficient appliances to reduce overall energy
              consumption and prevent additional heat generation indoors.
            </li>
            <li className="text-base">
              Use light-colored, reflective materials for roofs and pavements to
              reduce heat absorption.
            </li>
            <li className="text-base">
              {" "}
              Encourage the use of cool paints or coatings that reflect more
              sunlight and absorb less heat.
            </li>

            <li className="text-base">
              {" "}
              General Public: Plan outdoor activities early in the morning or
              late in the afternoon when temperatures are cooler.
            </li>
            <li className="text-base">
              Children and Elderly: Minimize outdoor exposure between 11 AM and
              4 PM when the sun is at its peak.
            </li>
            <li className="text-base">
              {" "}
              For those who must be outdoors, try to stay in shaded areas
              whenever possible.
            </li>

            <li className="text-base">
              {" "}
              Wear loose, light-colored, and breathable clothing made of cotton
              or linen. This will help reflect sunlight and keep the body cool.
            </li>
            <li className="text-base">
              Children should wear hats or caps when playing outside to protect
              them from direct sun exposure.
            </li>
            <li className="text-base">
              {" "}
              Elderly individuals should avoid tight or layered clothing to
              reduce the risk of overheating.
            </li>
            <p>
              These recommendations are designed to help maintain a sustainable
              and safe environment by keeping temperatures within bearable and
              healthy limits, ensuring that everyone—from the general public to
              vulnerable groups like children and the elderly—can thrive in
              plain areas
            </p>
          </ul>
        </>
      );
    } else if (temp <= 40) {
      return (
        <>
          <ul>
            <li className="text-base">
              Stay Hydrated
              <ul>
                <li className="text-base">General Public:</li>
                <ul>
                  <li className="text-base">
                    Drink plenty of water throughout the day, even if you don’t
                    feel thirsty.
                  </li>
                  <li className="text-base">
                    {" "}
                    Avoid alcohol, caffeine, and sugary drinks, which can cause
                    dehydration.
                  </li>
                </ul>
              </ul>{" "}
              <ul>
                <li className="text-base">Children:</li>
                <ul>
                  <li className="text-base">
                    Ensure children drink water frequently. Encourage them to
                    take small sips throughout the day, especially if they are
                    active.
                  </li>
                </ul>
              </ul>{" "}
              <ul>
                <li className="text-base">Elderly:</li>
                <ul>
                  <li className="text-base">
                    Regularly remind older adults to drink water, as they may
                    not recognize signs of dehydration as readily.
                  </li>
                </ul>
              </ul>{" "}
            </li>
            <li className="text-base">
              Recognize Signs of Heat-Related Illnesses:
              <ul>
                <li className="text-base"> Know the Symptoms:</li>
                <ul>
                  <li className="text-base">
                    Beaware of signs like dizziness, headache, rapid heartbeat,
                    nausea, excessive sweating, or confusion. These can indicate
                    heat exhaustion or heatstroke, which are medical
                    emergencies.
                  </li>
                </ul>
              </ul>{" "}
              <ul>
                <li className="text-base">Take Immediate Action:</li>
                <ul>
                  <li className="text-base">
                    Move to a cooler place, drink water, and use cool cloths on
                    your skin. If symptoms persist, seek medical help
                    immediately.
                  </li>
                </ul>
              </ul>{" "}
              <ul>
                <li className="text-base">Adjust Diet:</li>
                <ul>
                  <li className="text-base">
                    Eat light meals with plenty of fruits and vegetables.
                  </li>
                  <li className="text-base">
                    Avoid heavy, hot, or spicy foods that can increase body
                    heat.
                  </li>
                  <li className="text-base">
                    Opt for hydrating foods like watermelon, cucumbers, and
                    oranges.
                  </li>
                </ul>
              </ul>{" "}
            </li>
            <li className="text-base">
              Provide Special Care for Vulnerable Groups
              <ul>
                <li className="text-base">Children:</li>
                <ul>
                  <li className="text-base">
                    {" "}
                    Ensure they stay in shaded or cool areas. Make cooling
                    activities like baths or using a fan available.
                  </li>
                </ul>
              </ul>{" "}
              <ul>
                <li className="text-base">Elderly:</li>
                <ul>
                  <li className="text-base">
                    {" "}
                    Check on older adults frequently, ensuring they are
                    comfortable and hydrated. Encourage them to stay indoors in
                    a cool area.
                  </li>
                </ul>
              </ul>
              <ul>
                <li className="text-base">
                  Pregnant Women and Individuals with Health Conditions:
                </li>
                <ul>
                  <li className="text-base">
                    These groups should avoid heat exposure and stay hydrated.
                    Consult a doctor if feeling unwell.
                  </li>
                </ul>
              </ul>
            </li>
          </ul>
        </>
      );
    }
  };

  const getBadge = (temp) => {
    if (temp <= 40) {
      return (
        <Badge value="Your Ultimate Temperature Tips" severity="warning" />
      );
    } else if (temp > 40) {
      return <Badge value="Beat the Heat" severity="danger" />;
    }
  };

  return (
    <div className="p-m-3">
      <Fieldset legend={getBadge(temperature)}>
        <div className="p-mb-4">{getRecommendationTemp(temperature)}</div>
      </Fieldset>
    </div>
  );
};

export default TempRecommendations;
