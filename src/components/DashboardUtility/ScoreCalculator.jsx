import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

const ScoreCalculator = () => {
  const [aqiScore, setAqiScore] = useState();

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const response = await axios.get("https://api-csi.arahas.com/aqi/avg");
        setAqiScore(response.data.data.averageAQI);
        console.log(
          "🚀 ~ fetchScore ~ response:",
          response.data.data.averageAQI
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchScore();
  }, []);

  return <>{aqiScore && <div>Aqi Score: {aqiScore}</div>}</>;
};

export default ScoreCalculator;
