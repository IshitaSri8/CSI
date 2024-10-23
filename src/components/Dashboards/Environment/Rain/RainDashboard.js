import React, { useState, useEffect } from "react";
import axios from "axios";
import RainTrend from "./RainTrend";
import "../../Dash.css";
import RainRecommendations from "./RainRecommendations";
import { Button } from "primereact/button";
import RainReportPrint from "./RainReportPrint";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import rain from "assets/Rainfall Illustration.svg";
import { Chip } from "primereact/chip";

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
          <h1 className="m-0 p-0 text-primary1 text-xl text-semibold">
            Rainfall
          </h1>
          <div className="flex align-items-center justify-content-end gap-4">
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

      <div className="flex align-items-stretch justify-content-center w-full">
        {/* total Rainfall */}
        <div className="flex flex-column bg-white border-round gap-3 p-2 px-4 w-full mr-3">
          <p className="text-primary1 font-semibold text-lg">Total Rainfall</p>
          <div className="flex justify-content-around align-items-center gap-3">
            <div className="flex flex-column align-items-center px-5">
              <p className="text-3xl font-semibold m-0 text-secondary2">
                {totalRainfall}
              </p>
              <p className="p-0 m-0 font-medium text-xl text-secondary2">
                mm
              </p>
              <p className="text-primary1 font-medium text-lg px-0">Actual</p>
            </div>
            <Divider layout="vertical" />
            <div className="flex flex-column align-items-center px-5">
              <p className="text-3xl font-semibold m-0 text-secondary2">
                {totalExpectedRainfall}
              </p>
              <p className="p-0 m-0 font-medium text-xl text-secondary2">
                mm
              </p>
              <p className="text-primary1 font-medium text-lg px-0">Expected</p>
            </div>
          </div>
        </div>

        {/* Deviation from Expected */}
        <div className="flex flex-column align-items-center bg-white border-round p-2 px-4 w-full mr-3">
          <p className="text-primary1 font-semibold text-lg">
            Deviation from Expected
          </p>
          <div className="flex w-10rem custom-circular-progress">
            <CircularProgressbar
              value={-deviationPercentage}
              text={`${deviationPercentage}%`}
              counterClockwise="true"
              strokeWidth={6}
              styles={buildStyles({
                pathColor: "#E62225",
                textColor: "#001F23",
                trailColor: "#E7EAEA",
                textSize: "1.5rem",
                pathTransition: "stroke-dashoffset 0.5s ease 0s",
              })}
            />
          </div>
          {/* <div className="flex align-items-center justify-content-start">
            <img
              src={increase}
              style={{
                height: "1.5rem",
                width: "1.5rem",
                marginRight: "0.5rem",
              }}
              alt="increase"
            />
            <p className="text-tertiary3 text-sm p-0 m-0 font-semibold">
              <span style={{ color: "#0C9D61" }}>8.5%</span> Up from last year.
            </p>
          </div> */}
        </div>
        <img
          src={rain}
          alt="rain"
          className="h-15rem "
          style={{ borderRadius: "10px 0 0 10px" }}
        />

        {/* Maximum Rainfall */}
        <div
          className="flex flex-column bg-white w-full p-2 px-4 gap-4 align-items-stretch"
          style={{ borderRadius: "0 10px 10px 0" }}
        >
          <p className="text-primary1 font-semibold text-lg">Maximum Rainfall</p>
          <div className="flex align-items-center justify-content-center flex-column">
            <p className="text-3xl font-semibold m-0 text-secondary2">
              {maxRainfall}
            </p>
            <p className="p-0 m-0 font-medium text-xl text-secondary2">mm</p>
          </div>
          <Chip
            label={`${maxRainfallYear} (July)`}
            style={{
              width: "fit-content",
              backgroundColor: "#e9f3f5",
              color: "#001F23",
            }}
          />
        </div>
      </div>

      <div className="flex w-full bg-white border-round p-4">
        <RainTrend
          rainYears={rainYears}
          yearAverageRainActual={yearAverageRainActual}
          yearAverageRainExpected={yearAverageRainExpected}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          monthRainActual={monthRainActual}
          monthRainExpected={monthRainExpected}
        />
      </div>
      <p className="p-0 m-0 border-top-1 surface-border text-right text-sm text-700 font-italic">
        *Data updated till 2021. These numbers are subject to variation.
      </p>

      <div className="flex justify-content-end">
        <Button
          label={
            recommendationsVisible
              ? "Close Recommendations"
              : "View Recommendations"
          }
          icon={recommendationsVisible ? "pi pi-times" : "pi pi-check-square"}
          onClick={handleToggleRecommendations}
          className="bg-theme text-white"
          raised
        />
      </div>

      {recommendationsVisible && <RainRecommendations />}
    </div>
  );
};

export default RainDashboard;
