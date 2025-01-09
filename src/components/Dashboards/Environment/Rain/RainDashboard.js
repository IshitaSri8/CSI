import React, { useState, useEffect } from "react";
import axios from "axios";
import RainTrend from "./RainTrend";
import "../../Dash.css";
import RainRecommendations from "./RainRecommendations";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import rain from "assets/Rainfall Illustration.svg";
import { Chip } from "primereact/chip";
import { Panel } from "primereact/panel";
import { ProgressBar } from "primereact/progressbar";
import ReportPrint from "components/DashboardUtility/ReportPrint";
import RecommendationPanel from "components/DashboardUtility/RecommendationPanel";

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
    setRecommendationsVisible((prev) => !prev);
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

  const renderRecommendations = () => {
    return <RainRecommendations />;
  };

  const renderDashboard = () => {
    return <RainDashboard show={false} />;
  };

  return (
    <div className="flex flex-column gap-3 p-4">
      {show && (
        <div className="flex align-items-center justify-content-between w-full">
          <h1 className="m-0 p-0 text-primary1 text-2xl font-medium">
            Rainfall
          </h1>
          <div className="flex align-items-center justify-content-end gap-4">
            <Button
              label="Generate Report"
              icon="pi pi-file"
              onClick={() => setReportVisible(true)}
              className="bg-primary1 text-white"
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
              <ReportPrint
                renderDashboard={renderDashboard}
                renderRecommendations={renderRecommendations}
                parameter={"rain"}
                heading={"Rainfall"}
              />
            </Dialog>
          </div>
        </div>
      )}

      <div className="flex align-items-center justify-content-center w-full">
        {/* total Rainfall */}
        <div
          className="flex flex-column bg-white justify-content-between border-round gap-3 p-3"
          style={{ flex: "30%" }}
        >
          <p className="card-title p-0 m-0">Total Rainfall</p>
          <div className="flex gap-3">
            <div className="flex flex-column align-items-center px-5">
              <p className="text-4xl font-semibold m-2 text-secondary2 flex align-items-center">
                {totalRainfall} <span className="text-xl">mm</span>
              </p>
              <p className="p-0 m-0 card-text">Actual</p>
            </div>
            <Divider layout="vertical" />
            <div className="flex flex-column align-items-center px-5">
              <p className="text-4xl font-semibold m-2 text-secondary2 flex align-items-center">
                {totalExpectedRainfall} <span className="text-xl">mm</span>
              </p>
              <p className="p-0 m-0 card-text">Expected</p>
            </div>
          </div>
          <ProgressBar
            value={80}
            style={{ height: "0.5rem" }} // Adjust the height
            className="w-full border-round mt-4" // Full width of its container
            color="#FFAD0D"
            displayValueTemplate={() => null} // Hide the displayed value
          />
          <p
            className="text-tertiary3 font-medium text-sm"
            style={{ marginTop: -10 }}
          >
            {" "}
            <span style={{ color: "#0C9D61" }}>8.5%</span> Up from last year
          </p>
        </div>

        {/* Deviation from Expected */}
        <div
          className="flex flex-column gap-3 bg-white border-round p-3 mx-3"
          style={{ flex: "35%" }}
        >
          <p className="card-title p-0 m-0">Deviation from Expected</p>
          <div className="flex align-items-center justify-content-center">
            <div className="w-10rem custom-circular-progress">
              <CircularProgressbar
                value={-deviationPercentage}
                text={`${deviationPercentage}%`}
                counterClockwise="true"
                strokeWidth={8}
                styles={buildStyles({
                  pathColor: "#E62225",
                  textColor: "#001F23",
                  trailColor: "#E7EAEA",
                  textSize: "1.75rem",
                  pathTransition: "stroke-dashoffset 0.5s ease 0s",
                })}
              />
            </div>
          </div>
        </div>

        <img
          src={rain}
          alt="rain"
          className="h-15rem "
          style={{ borderRadius: "10px 0 0 10px" }}
        />

        {/* Maximum Rainfall */}
        <div
          className="flex flex-column bg-white p-3 gap-6 align-items-stretch"
          style={{ borderRadius: "0 10px 10px 0", flex: "35%" }}
        >
          <p className="card-title p-0 m-0">Maximum Rainfall</p>
          <p className="text-4xl font-semibold m-1 text-secondary2 text-center">
            {maxRainfall} <span className="text-xl">mm</span>
          </p>
          <Chip
            label={`July ${maxRainfallYear}`}
            style={{
              width: "fit-content",
              backgroundColor: "#e9f3f5",
              color: "#001F23",
              fontWeight: 600,
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

      <RecommendationPanel
        show={true}
        renderRecommendations={renderRecommendations}
      />
    </div>
  );
};

export default RainDashboard;
