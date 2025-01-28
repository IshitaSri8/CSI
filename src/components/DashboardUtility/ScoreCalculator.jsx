import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

const ScoreCalculator = () => {
  const [aqiScore, setAqiScore] = useState();

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const response = await axios.get("http://localhost:8010/aqi/avg");
        setAqiScore(response);
        console.log("🚀 ~ fetchScore ~ response:", response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchScore();
  }, []);

  return <div>Aqi Score: {aqiScore}</div>;
};

export default ScoreCalculator;
