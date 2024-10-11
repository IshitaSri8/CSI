import React from "react";
import { Fieldset } from "primereact/fieldset";
import { Badge } from "primereact/badge";
import { VirtualScroller } from "primereact/virtualscroller";
import recom from "assets/recom.svg"; // Recommendation image
import { Card } from "primereact/card";

const TempRecommendations = ({ temperature, humidity }) => {
  const getRecommendationTemp = (temp) => {
    if (temp > 40) {
      return [
        {
          title: "",
          recommendations: [
            "Use fans, air coolers, or air conditioning to regulate indoor temperatures, especially in living spaces for children and the elderly.",
            "Keep windows and curtains closed during the hottest part of the day to block out direct sunlight.",
            "Use energy-efficient appliances to reduce overall energy consumption and prevent additional heat generation indoors.",
            "Use light-colored, reflective materials for roofs and pavements to reduce heat absorption.",
            "Encourage the use of cool paints or coatings that reflect more sunlight and absorb less heat.",
            "Plan outdoor activities early in the morning or late in the afternoon when temperatures are cooler.",
            "Children and Elderly: Minimize outdoor exposure between 11 AM and 4 PM when the sun is at its peak.",
            "For those who must be outdoors, try to stay in shaded areas whenever possible.",
            "Wear loose, light-colored, and breathable clothing made of cotton or linen. This will help reflect sunlight and keep the body cool.",
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
            "General Public-",
            "Drink plenty of water throughout the day, even if you don’t feel thirsty.",
            "Avoid alcohol, caffeine, and sugary drinks, which can cause dehydration.",
            "Children-",
            "Ensure children drink water frequently. Encourage them to take small sips throughout the day, especially if they are active.",
            "Elderly-",
            "Regularly remind older adults to drink water, as they may not recognize signs of dehydration as readily.",
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
            "Children: Ensure they stay in shaded or cool areas. Make cooling activities like baths or using a fan available.",
            "Elderly: Check on older adults frequently, ensuring they are comfortable and hydrated.",
            "Pregnant Women and Individuals with Health Conditions: Avoid heat exposure and stay hydrated. Consult a doctor if feeling unwell.",
          ],
        },
      ];
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

  const itemTemplate = (item) => {
    return (
      <div className="text-cyan-800 w-full my-2 p-0 ">
        <ul>
          <h1>{item.title}</h1>
          {item.recommendations.map((rec, index) => (
            <li key={index} className="text-lg m-0 p-0">
              {rec}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const recommendations = getRecommendationTemp(temperature);

  return (
    <Card className="w-full border-round-2xl">
      <div className="flex w-full align-items-center justify-content-center flex-row gap-1 ">
        {/* VirtualScroller for recommendations */}
        <VirtualScroller
          items={recommendations}
          itemSize={50}
          itemTemplate={itemTemplate}
          className="surface-border border-round"
          style={{ width: "100%", height: "38rem" }} // Adjust height and width as needed
        />

        {/* Recommendation image */}
        <img src={recom} className="h-30rem p-4" alt="Recommendations" />
      </div>
    </Card>
  );
};

export default TempRecommendations;
