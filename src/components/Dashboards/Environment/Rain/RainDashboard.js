import React, { useState, useEffect } from "react";
import axios from "axios";
import RainTrend from "./RainTrend";
import { Card } from "primereact/card";
import "../../Dash.css";
import RainRecommendations from "./RainRecommendations";
import { Button } from "primereact/button";
import RainReportPrint from "./RainReportPrint";
import { Dialog } from "primereact/dialog";

const RainDashboard = ({ show }) => {
  const [rainData, setRainData] = useState([]);
  const [rainYears, setRainYears] = useState([]);
  const [yearAverageRainActual, setYearAverageRainActual] = useState({});
  const [yearAverageRainExpected, setYearAverageRainExpected] = useState({});
  const [selectedYear, setSelectedYear] = useState(null);
  const [monthRainActual, setMonthRainActual] = useState([]);
  const [monthRainExpected, setMonthRainExpected] = useState([]);
  const [totalRainfall, setTotalRainfall] = useState(0);
  const [totalExpectedRainfall, setTotalExpectedRainfall] = useState(0);
  const [deviationPercentage, setDeviationPercentage] = useState(0);
  const [maxRainfall, setMaxRainfall] = useState(0);
  const [maxRainfallYear, setMaxRainfallYear] = useState(null);
  const [maxRainfallMonth, setMaxRainfallMonth] = useState(null);
  const [ReportVisible, setReportVisible] = useState(false);

  const [recommendationsVisible, setRecommendationsVisible] = useState(false);

  const handleToggleRecommendations = () => {
    setRecommendationsVisible(!recommendationsVisible);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (rainData.length > 0) {
      calculateRainMetrics();
    }
  }, [rainData]);

  const fetchData = async () => {
    try {
      const rain_response = await axios.get(
        "https://api-csi.arahas.com/data/environment/rainfall"
      );
      const rData = rain_response.data.data;
      setRainData(rData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const calculateRainMetrics = () => {
    const sortedRainData = rainData.sort((a, b) => {
      if (a.Year === b.Year) {
        return a.Month - b.Month;
      }
      return a.Year - b.Year;
    });

    const years = [...new Set(sortedRainData.map((data) => data.Year))];
    setRainYears(years);
    setSelectedYear(years[0]); // Default to the first year

    const yearActual = {};
    const yearExpected = {};
    let totalRainfallSum = 0;
    let totalExpectedRainfallSum = 0;
    let maxRain = 0;
    let maxRainYear = null;
    let maxRainMonth = null;

    sortedRainData.forEach((data) => {
      if (data.Total > maxRain) {
        maxRain = data.Total;
        maxRainYear = data.Year;
        maxRainMonth = data.Month;
      }
    });

    years.forEach((year) => {
      const yearlyData = sortedRainData.filter((data) => data.Year === year);
      const totalActual = yearlyData.reduce((sum, data) => sum + data.Total, 0);
      const totalExpected = yearlyData.reduce(
        (sum, data) => sum + data.Normal,
        0
      );
      yearActual[year] = (totalActual / yearlyData.length).toFixed(2);
      yearExpected[year] = (totalExpected / yearlyData.length).toFixed(2);

      totalRainfallSum += totalActual;
      totalExpectedRainfallSum += totalExpected;
    });

    setYearAverageRainActual(yearActual);
    setYearAverageRainExpected(yearExpected);
    setTotalRainfall(totalRainfallSum.toFixed(2));
    setTotalExpectedRainfall(totalExpectedRainfallSum.toFixed(2));
    setMaxRainfall(maxRain.toFixed(2));
    setMaxRainfallYear(maxRainYear);
    setMaxRainfallMonth(maxRainMonth);

    // Calculate deviation percentage
    const deviation = (
      ((totalRainfallSum - totalExpectedRainfallSum) /
        totalExpectedRainfallSum) *
      100
    ).toFixed(2);
    setDeviationPercentage(deviation);

    // Calculate initial month data for the default selected year
    updateMonthData(years[0]);
  };

  const updateMonthData = (year) => {
    const selectedYearData = rainData.filter((data) => data.Year === year);

    setMonthRainActual(
      selectedYearData.map((data) => ({
        month: data.Month,
        actual: data.Total,
      }))
    );

    setMonthRainExpected(
      selectedYearData.map((data) => ({
        month: data.Month,
        expected: data.Normal,
      }))
    );
  };

  // Update month data when the selected year changes
  useEffect(() => {
    if (selectedYear) {
      updateMonthData(selectedYear);
    }
  }, [selectedYear, rainData]);

  return (
    <div className="flex flex-column gap-3 p-4">
      {show && (
        <div className="flex align-items-center justify-content-between w-full">
          <h1 className="m-0 p-0 text-2xl text">Rainfall</h1>
          <div className="flex align-items-center justify-content-end gap-2">
            <Button
              label="Generate Report"
              icon="pi pi-file"
              onClick={() => setReportVisible(true)}
              className="bg-theme text-white"
              raised
            />
            <Dialog
              visible={ReportVisible}
              style={{ width: "100rem" }}
              onHide={() => {
                if (!ReportVisible) return;
                setReportVisible(false);
              }}
            >
              <RainReportPrint show={false} />
            </Dialog>
          </div>
        </div>
      )}
        <div className="flex align-items-center justify-content-center gap-3 w-full">
          {/* Total Actual Rainfall */}
          <Card className="h-10rem w-full">
            <div className="flex align-items-center justify-content-center flex-column">
              <h1 style={{ color: "#00a269" }} className="text-2xl">
                {totalRainfall} mm
              </h1>
              <h1 className="text-xs m-0 p-0">Total Actual Rainfall</h1>
            </div>
          </Card>

          {/* Total Expected Rainfall */}
          <Card className="h-10rem w-full">
            <div className="flex align-items-center justify-content-center flex-column">
              <h1 style={{ color: "#0073e6" }} className="text-2xl">
                {totalExpectedRainfall} mm
              </h1>
              <h1 className="text-xs m-0 p-0">Total Expected Rainfall</h1>
            </div>
          </Card>

          {/* Deviation Percentage */}
          <Card className="h-10rem w-full">
            <div className="flex align-items-center justify-content-center flex-column">
              <h1 style={{ color: "#ff0000" }} className="text-2xl">
                {deviationPercentage}%
              </h1>
              <h1 className="text-xs m-0 p-0">Deviation from Expected</h1>
            </div>
          </Card>

          {/* Maximum Rainfall */}
          <Card className="h-10rem w-full">
            <div className="flex align-items-center justify-content-center flex-column">
              <h1 style={{ color: "#ff9800" }} className="text-2xl">
                {maxRainfall} mm
              </h1>
              <h1 className="text-xs m-0 p-0">
                Maximum Rainfall in {maxRainfallYear} (July)
              </h1>
            </div>
          </Card>
        </div>
      <Card className="w-full">
        <RainTrend
          rainYears={rainYears}
          yearAverageRainActual={yearAverageRainActual}
          yearAverageRainExpected={yearAverageRainExpected}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          monthRainActual={monthRainActual}
          monthRainExpected={monthRainExpected}
        />
      </Card>
      <div className="flex justify-content-end">
      <Button
        label={recommendationsVisible ? "Close Recommendations" : "Get Recommendations"}
        icon={recommendationsVisible ? "pi pi-times" : "pi pi-check-square"}
        onClick={handleToggleRecommendations}
        className="bg-theme text-white"
        raised
      />
      </div>

      {recommendationsVisible && (
        <RainRecommendations />
      )}
    </div>
  );
};

export default RainDashboard;
