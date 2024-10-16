import React from "react";
import { Fieldset } from "primereact/fieldset";
import { Badge } from "primereact/badge";

const TempRecommendations = ({ temperature }) => {
  const getRecommendationTemp = (temp) => {
    if (temp > 40) {
      return [
        {
          title: "Heat Safety Tips",
          recommendations: [
            "Use fans, air coolers, or air conditioning to regulate indoor temperatures, especially in living spaces for children and the elderly.",
            "Keep windows and curtains closed during the hottest part of the day to block out direct sunlight.",
            "Use energy-efficient appliances to reduce overall energy consumption and prevent additional heat generation indoors.",
            "Use light-colored, reflective materials for roofs and pavements to reduce heat absorption.",
            "Encourage the use of cool paints or coatings that reflect more sunlight and absorb less heat.",
            "Plan outdoor activities early in the morning or late in the afternoon when temperatures are cooler.",
            "Children and Elderly: Minimize outdoor exposure between 11 AM and 4 PM when the sun is at its peak.",
            "For those who must be outdoors, try to stay in shaded areas whenever possible.",
            "Wear loose, light-colored, and breathable clothing made of cotton or linen.",
            "Children should wear hats or caps when playing outside to protect them from direct sun exposure.",
            "Elderly individuals should avoid tight or layered clothing to reduce the risk of overheating.",
          ],
        },
        {
          title: "General Tips",
          recommendations: [
            "These recommendations are designed to help maintain a sustainable and safe environment by keeping temperatures within bearable and healthy limits.",
          ],
        },
      ];
    } else {
      return [
        {
          title: "Stay Hydrated",
          recommendations: [
            "Drink plenty of water throughout the day, even if you don’t feel thirsty.",
            "Avoid alcohol, caffeine, and sugary drinks, which can cause dehydration.",
            "Children should drink water frequently, especially if they are active.",
            "Remind older adults to drink water regularly, as they may not recognize signs of dehydration readily.",
          ],
        },
        {
          title: "Recognize Signs of Heat-Related Illnesses",
          recommendations: [
            "Be aware of signs like dizziness, headache, rapid heartbeat, nausea, excessive sweating, or confusion.",
            "Move to a cooler place, drink water, and use cool cloths on your skin. If symptoms persist, seek medical help immediately.",
          ],
        },
        {
          title: "Adjust Diet",
          recommendations: [
            "Eat light meals with plenty of fruits and vegetables.",
            "Avoid heavy, hot, or spicy foods that can increase body heat.",
            "Opt for hydrating foods like watermelon, cucumbers, and oranges.",
          ],
        },
        {
          title: "Provide Special Care for Vulnerable Groups",
          recommendations: [
            "Ensure children stay in shaded or cool areas. Make cooling activities like baths or using a fan available.",
            "Check on older adults frequently, ensuring they are comfortable and hydrated.",
            "Pregnant women and individuals with health conditions should avoid heat exposure and stay hydrated.",
          ],
        },
      ];
    }
  };

  const getBadge = (temp) => {
    return temp > 40 ? (
      <Badge value="Beat the Heat" severity="danger" />
    ) : (
      <Badge value="Your Ultimate Temperature Tips" severity="warning" />
    );
  };

  const recommendations = getRecommendationTemp(temperature);

  return (
    <div className="flex flex-column w-full">
      <Fieldset legend={getBadge(temperature)}>
        {recommendations.map((item, index) => (
          <div key={index} className="p-2">
            <h2 className="text-theme">{item.title}</h2>
            <ul className="ml-4">
              {item.recommendations.map((rec, recIndex) => (
                <li key={recIndex} className="text-lg m-2 text-900">
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Fieldset>
    </div>
  );
};

export default TempRecommendations;
