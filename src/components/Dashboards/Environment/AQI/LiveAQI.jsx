import React, { useState, useEffect } from "react";
import { Calendar } from "primereact/calendar";
import axios from "axios";
import { Dropdown } from "primereact/dropdown";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "../../../DashboardUtility/Dash.css";
import PollutantChartNEW from "../AQI_NEW/PollutantChartNEW";
import { Button } from "primereact/button";
import TableSkeleton from "../../../DashboardUtility/skeletons/TableSkeleton";
import AQIChartNEW from "../AQI_NEW/AQIChartNEW";
import AqiMap from "./AqiMap";
import AQIRecommendations from "./AQIRecommendations";
import ReportPrint from "components/DashboardUtility/ReportPrint";
import RecommendationPanel from "components/DashboardUtility/RecommendationPanel";
import Upload from "components/DashboardUtility/Popups/Upload";
import { Dialog } from "primereact/dialog";
import { Tag } from "primereact/tag";
import { ProgressSpinner } from "primereact/progressspinner";
import { Divider } from "primereact/divider";
import { OverlayPanel } from "primereact/overlaypanel";
import { useRef } from "react";
import ServerDown from "pages/error pages/ServerDown";
import AqiScoreCalculator from "components/Dashboards/Environment/AQI/AqiScoreCalculator";
import unhealthy from "assets/dashboard/unhealthy-aqi-level.svg";
import severe from "assets/dashboard/severe-aqi-level.svg";
import good from "assets/dashboard/good-aqi-level.svg";
import moderate from "assets/dashboard/moderate-aqi-level.svg";
import poor from "assets/dashboard/poor-aqi-level.svg";
import hazardous from "assets/dashboard/hazardous-aqi-level.svg";
import colors from "colorConstants";
import AQIChart from "./AQIChart";
import PollutantChart from "./PollutantChart";

const LiveAQI = ({ show }) => {
  const [startDate, setStartDate] = useState(
    new Date("2024-11-30T18:30:00.000Z")
  );
  const [endDate, setEndDate] = useState(new Date("2024-12-31T17:30:00.000Z"));
  const [selectedLocation, setSelectedLocation] = useState(
    "Ayodhya- Civil Lines"
  );
  const [aqiValue, setAqiValue] = useState(null);
  const [pm25Value, setPM25value] = useState(null);
  const [pm10Value, setPM10value] = useState(null);
  const [aqiStatus, setAqiStatus] = useState({
    status: "",
    color: "",
    textColor: "",
    image: null,
  });

  const overlayRef1 = useRef(null);
  const overlayRef2 = useRef(null);

  const [dataTableData, setDataTableData] = useState([]);
  const [locations, setLocations] = useState([]);
  const [envirotime, setEnviroTime] = useState([]);
  const [envirodate, setEnviroDate] = useState([]);
  const [enviropm25, setEnviroPM25] = useState([]);
  const [enviropm10, setEnviroPM10] = useState([]);
  const [enviroso2, setEnviroSO2] = useState([]);
  const [enviroAQI, setEnviroAQI] = useState([]);
  const [enviroNO2, setEnviroNO2] = useState([]);
  const [timeArrayData, setTimeArrayData] = useState([]);
  const [dateArrayData, setDateArrayData] = useState([]);
  const [pm25ArrayData, setPM25ArrayData] = useState([]);
  const [pm10ArrayData, setPM10ArrayData] = useState([]);
  const [SO2ArrayData, setSO2ArrayData] = useState([]);
  const [AQIArrayData, setAQIArrayData] = useState([]);
  const [NO2ArrayData, setNO2ArrayData] = useState([]);

  // Get the current date and time
  const currentDate = new Date();

  // Calculate the date 30 days ago
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(currentDate.getDate() - 30);

  // Format dates to ISO string to be compatible with datetime-local input
  const [liveStartDate, setLiveStartDate] = useState(thirtyDaysAgo);
  const [liveEndDate, setLiveEndDate] = useState(currentDate);
  const [loading, setLoading] = useState(true);
  const [serverDown, setServerDown] = useState(false);
  const [compare, setCompare] = useState(false);
  const [ReportVisible, setReportVisible] = useState(false);
  const [uploadDialogVisible, setUploadDialogVisible] = useState(false);
  const [aqiStats, setAqiStats] = useState("");
  const [aqiIDs, setAQIIDs] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const locationsResponse = await axios.get(
          `https://api-csi.arahas.com/aqi/locations`
        );
        if (locationsResponse.data) {
          const locationOptions = locationsResponse.data.data.map((data) => ({
            label: data,
            value: data,
          }));
          setLocations(locationOptions);
        } else {
          setLocations([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchDateRange = async () => {
      try {
        const dateRangeResponse = await axios.get(
          `https://api-csi.arahas.com/aqinew/date?location=${selectedLocation}`
        );
        console.log(
          "🚀 ~ fetchDateRange ~ dateRangeResponse:",
          dateRangeResponse
        );
        if (dateRangeResponse.data) {
          const firstDate = dateRangeResponse.data.firstDate;
          const lastDate = dateRangeResponse.data.lastDate;
          setStartDate(new Date(firstDate));
          setEndDate(new Date(lastDate));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDateRange();
  });
  useEffect(() => {
    handleCompare();
  }, []);
  function convertDateString(date) {
    // Format the date to 'YYYY-MM-DD'
    const formattedDate = new Date(date).toLocaleDateString("en-CA"); // Get YYYY-MM-DD

    // Format the time to 'HH:mm:ss'
    const formattedTime = new Date(date).toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour12: false,
    }); // Get HH:mm:ss

    return {
      date: formattedDate,
      time: formattedTime,
    };
  }

  const getAQI = async (locationID, from_time, upto_time) => {
    try {
      const response = await axios.post(
        "https://app.aurassure.com/-/api/iot-platform/v1.1.0/clients/10565/applications/16/things/data",
        {
          data_type: "aggregate",
          aggregation_period: 3600,
          parameters: ["pm10", "pm2.5", "no2", "so2", "aqi"],

          parameter_attributes: ["value", "avg", "max", "min"],
          things: [locationID],
          from_time: from_time,
          upto_time: upto_time,
        },
        {
          headers: {
            "Access-Id": "WYDAeaT0kA7kKVyg",
            "Access-Key":
              "H0RkamVKJ2jiGda9tx2i20kykwCGkRhn2P3bXwDgxP8dAKxLp1CM65DYKg0oYCV2",
          },
        }
      );
      const api_response = response.data.data;
      console.log("🚀 ~ getAQI ~ api_response:", api_response);

      const dateArray = [];
      const timeArray = [];
      const so2Array = [];
      const no2Array = [];
      const pm25Array = [];
      const pm10Array = [];
      const aqiArray = [];
      const aqiArrayAPI = [];

      api_response.forEach((item) => {
        const newDate = new Date(item.time * 1000);
        const { date, time } = convertDateString(newDate);
        // const aqi = calculateAqi(
        //   item.parameter_values["pm2.5"].avg,
        //   item.parameter_values.pm10.avg,
        //   item.parameter_values.no2.avg,
        //   item.parameter_values.so2.avg
        // );
        aqiArrayAPI.push(item.parameter_values.aqi.value);

        // aqiArray.push(aqi);
        dateArray.push(date);
        timeArray.push(time);
        so2Array.push(item.parameter_values.so2.avg);
        no2Array.push(item.parameter_values.no2.avg);
        pm25Array.push(item.parameter_values["pm2.5"].avg);
        pm10Array.push(item.parameter_values.pm10.avg);
      });
      setAQIArrayData(aqiArrayAPI);
      setDateArrayData(dateArray);
      setTimeArrayData(timeArray);
      setSO2ArrayData(so2Array);
      setNO2ArrayData(no2Array);
      setPM10ArrayData(pm10Array);
      setPM25ArrayData(pm25Array);
      return 0;
    } catch (error) {
      console.error("Error fetching AQI data:", error);
      return 0;
    }
  };
  const fetchAQIData = async () => {
    if (aqiIDs) {
      const promises = aqiIDs.map((aqiID) =>
        getAQI(aqiID.thingID, aqiID.from_time, aqiID.upto_time)
      );
      // Wait for all promises to resolve
      await Promise.all(promises);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAQIData();
  }, []);

  const getThingID = (selectedLocation) => {
    if (selectedLocation === "Ayodhya- Civil Lines") {
      return ["Ayodhya - Civil line,Tiny tots school", 12218];
    }
    if (selectedLocation === "Ayodhya- Shahadat Ganj") {
      return ["Ayodhya - Shahadat Ganj", 12220];
    }
    if (selectedLocation === "Ayodhya- Bank Colony") {
      return ["Ayodhya-Bank colony near Railway station", 12414];
    }
    if (selectedLocation === "Ayodhya- Near Airport") {
      return ["Ayodhya-near Airport", 12415];
    }
    if (selectedLocation === "Ayodhya-Ranopali near Sugriv Kila ayodhya") {
      return ["Ayodhya- Ranopali Near Sugriv Kila", 12416];
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://app.aurassure.com/-/api/iot-platform/v1.1.0/clients/10565/applications/16/things/list",
          {
            headers: {
              "Access-Id": "WYDAeaT0kA7kKVyg", // replace with your Access ID
              "Access-Key":
                "H0RkamVKJ2jiGda9tx2i20kykwCGkRhn2P3bXwDgxP8dAKxLp1CM65DYKg0oYCV2", // replace with your Access Key
            },
          }
        );

        if (response.status === 200) {
          setLoading(false);
          // Convert startDate and endDate to Unix timestamps
          const start = new Date(liveStartDate);
          const end = new Date(liveEndDate);
          start.setHours(0, 0, 0, 0);
          end.setHours(23, 59, 59, 59);

          const fromTime = Math.floor(start.getTime() / 1000);
          const uptoTime = Math.floor(end.getTime() / 1000);
          const [location_name, location_id] = getThingID(selectedLocation);
          let thingsID = [];

          response.data?.things?.map((thing) =>
            thingsID.push({
              thingID: location_id, //locationID
              name: location_name,
              from_time: fromTime, //startdate_time
              upto_time: uptoTime, //endDate_time
            })
          );
          setAQIIDs(thingsID);
        }
      } catch (error) {
        console.error("Error fetching CommunityWellBeing data:", error);
      } finally {
      }
    };

    fetchData();
  }, [selectedLocation, liveStartDate, liveEndDate]);

  const handleCompare = async () => {
    try {
      setLoading(true);
      const start = new Date(startDate).toDateString("en-CA");
      const end = new Date(endDate).toDateString("en-CA");

      const response = await axios.get(
        `https://api-csi.arahas.com/aqi?location=${selectedLocation}&startDate=${start}&endDate=${end}`
      );
      const Range = (val, pollutant) => {
        if (pollutant === "PM10") {
          if (val >= 0 && val <= 50) {
            return [0, 0, 50, 0, 50];
          } else if (val >= 51 && val <= 100) {
            return [51, 51, 100, 51, 100];
          } else if (val >= 101 && val <= 250) {
            return [101, 101, 250, 101, 200];
          } else if (val >= 251 && val <= 350) {
            return [251, 251, 350, 201, 300];
          } else if (val >= 351 && val <= 430) {
            return [351, 351, 430, 301, 400];
          } else if (val > 430) {
            return [351, 430, 430, 401, 500];
          }
        } else if (pollutant === "PM2.5") {
          if (val >= 0 && val <= 30) {
            return [0, 0, 30, 0, 50];
          } else if (val >= 31 && val <= 60) {
            return [31, 31, 60, 51, 100];
          } else if (val >= 61 && val <= 90) {
            return [61, 61, 90, 101, 200];
          } else if (val >= 91 && val <= 120) {
            return [91, 91, 120, 201, 300];
          } else if (val >= 121 && val <= 250) {
            return [121, 121, 250, 301, 400];
          } else if (val > 250) {
            return [121, 250, 250, 401, 500];
          }
        } else if (pollutant === "NO2") {
          if (val >= 0 && val <= 40) {
            return [0, 0, 40, 0, 50];
          } else if (val >= 41 && val <= 80) {
            return [41, 41, 80, 51, 100];
          } else if (val >= 81 && val <= 180) {
            return [81, 81, 180, 101, 200];
          } else if (val >= 181 && val <= 280) {
            return [181, 181, 280, 201, 300];
          } else if (val >= 281 && val <= 400) {
            return [281, 281, 400, 301, 400];
          } else if (val > 400) {
            return [281, 400, 400, 401, 500];
          }
        } else if (pollutant === "SO2") {
          if (val >= 0 && val <= 40) {
            return [0, 0, 40, 0, 50];
          } else if (val >= 41 && val <= 80) {
            return [41, 41, 80, 51, 100];
          } else if (val >= 81 && val <= 380) {
            return [81, 81, 380, 101, 200];
          } else if (val >= 381 && val <= 800) {
            return [381, 381, 800, 201, 300];
          } else if (val >= 801 && val <= 1600) {
            return [801, 801, 1600, 301, 400];
          } else if (val > 1600) {
            return [801, 1600, 1600, 401, 500];
          }
        }
      };

      const individualAqi = (val, pollutant) => {
        const [ClowD, ClowN, Chigh, Ilow, Ihigh] = Range(val, pollutant);
        const indiAqi = Math.round(
          ((Ihigh - Ilow) / (Chigh - ClowD)) * (val - ClowN) + Ilow
        );
        return indiAqi;
      };

      const calculateAqi = (pm25, pm10, NO2, SO2) => {
        // Round off the values before calling individualAqi
        const roundedPm10 = Math.round(pm10);
        const roundedPm25 = Math.round(pm25);
        const roundedNO2 = Math.round(NO2);
        const roundedSO2 = Math.round(SO2);
        const pm10_aqi = individualAqi(roundedPm10, "PM10");
        const pm25_aqi = individualAqi(roundedPm25, "PM2.5");
        const NO2_aqi = individualAqi(roundedNO2, "NO2");
        const SO2_aqi = individualAqi(roundedSO2, "SO2");

        return Math.max(pm10_aqi, pm25_aqi, NO2_aqi, SO2_aqi);
      };
      const filteredData = response.data.data;

      const formattedDate = [];

      const formattedTime = [];
      const pm25 = [];
      const pm10 = [];
      const so2 = [];
      const AQI = [];
      const NO2 = [];

      filteredData.forEach((item) => {
        const dateObj = new Date(item.Date_time).toLocaleDateString("en-CA");
        formattedDate.push(dateObj);
        const timeObj = new Date(item.Date_time).toLocaleTimeString("en-IN", {
          hour12: false,
        });
        formattedTime.push(timeObj);

        pm25.push(item.pm25);
        pm10.push(item.pm10);
        so2.push(item.SO2);

        // AQI.push(item.CalculatedAqi);;
        AQI.push(calculateAqi(item.pm25, item.pm10, item.NO2, item.SO2));
        NO2.push(item.NO2);
      });

      setEnviroTime(formattedTime);
      setEnviroDate(formattedDate);
      setEnviroPM25(pm25);
      setEnviroPM10(pm10);
      setEnviroSO2(so2);
      setEnviroAQI(AQI);
      setEnviroNO2(NO2);

      if (filteredData.length > 0) {
        const averageAqi = Math.round(
          filteredData.reduce((sum, item) => sum + item.CalculatedAqi, 0) /
            filteredData.length
        );
        const averagepm25 = (
          filteredData.reduce((sum, item) => sum + item.pm25, 0) /
          filteredData.length
        ).toFixed(2);
        const averagepm10 = (
          filteredData.reduce((sum, item) => sum + item.pm10, 0) /
          filteredData.length
        ).toFixed(2);
        setPM25value(averagepm25);
        setPM10value(averagepm10);
        setAqiValue(averageAqi);

        setAqiStatus(getAqiStatus(averageAqi));
      } else {
        setAqiValue(null);
        setAqiStatus({ status: "", color: "", textColor: "", image: null });
      }

      const calculateAqiStats = (filteredData) => {
        if (filteredData.length === 0) return {};

        const aqiValues = filteredData.map((item) => item.CalculatedAqi);
        const pm25Values = filteredData.map((item) => item.pm25);
        const pm10Values = filteredData.map((item) => item.pm10);
        const dateTimeValues = filteredData.map(
          (item) => new Date(item.Date_time)
        );

        const maxAqi = Math.max(...aqiValues);
        const minAqi = Math.min(...aqiValues);

        const maxAqiIndex = aqiValues.indexOf(maxAqi);
        const minAqiIndex = aqiValues.indexOf(minAqi);

        return {
          max: {
            value: maxAqi,
            dateTime: dateTimeValues[maxAqiIndex].toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
            }),
            pm25: pm25Values[maxAqiIndex],
            pm10: pm10Values[maxAqiIndex],
          },
          min: {
            value: minAqi,
            dateTime: dateTimeValues[minAqiIndex].toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
            }),
            pm25: pm25Values[minAqiIndex],
            pm10: pm10Values[minAqiIndex],
          },
        };
      };

      setAqiStats(calculateAqiStats(filteredData));

      const filteredDataWithDeviation = filteredData
        .filter((item) => item.CalculatedAqi > 400)
        .map((item) => ({
          date: formatDate(new Date(item.Date_time)),
          time: formatTimeToHHMMSS(new Date(item.Date_time)),
          aqi: item.CalculatedAqi,
          deviationPercentage:
            (((item.CalculatedAqi - 400) / 400) * 100).toFixed(2) + "%",
        }));

      const uniqueDataTableData = Array.from(
        new Set(filteredDataWithDeviation.map(JSON.stringify))
      ).map(JSON.parse);
      setDataTableData(uniqueDataTableData);
    } catch (error) {
      console.log("🚀 ~ handleCompare ~ error:", error);

      setServerDown(true);
    }
  };

  const resetFilters = () => {
    setSelectedLocation(null);
    setLiveStartDate(null);
    setLiveEndDate(null);
  };

  function formatTimeToHHMMSS(isoDateString) {
    const dateObj = new Date(isoDateString).toLocaleTimeString();
    return dateObj;
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-CA", {
      timeZone: "Asia/Kolkata",
    });
  };

  const getAqiStatus = (aqi) => {
    if (aqi > 0 && aqi <= 50) {
      return {
        status: "GOOD",
        color: "#086d43",
        textColor: "white",
        image: good,
        bg_color: colors.good,
      };
    } else if (aqi > 50 && aqi <= 100) {
      return {
        status: "SATISFACTORY",
        color: "#669138",
        textColor: "black",
        image: moderate,
        bg_color: colors.moderate,
      };
    } else if (aqi > 100 && aqi <= 200) {
      return {
        status: "MODERATELY POLLUTED",
        color: "#b27909",
        textColor: "black",
        image: poor,
        bg_color: colors.yellow,
      };
    } else if (aqi > 200 && aqi <= 300) {
      return {
        status: "POOR",
        color: "#C7253E",
        textColor: "white",
        image: unhealthy,
        bg_color: colors.warning,
      };
    } else if (aqi > 300 && aqi <= 400) {
      return {
        status: "VERY POOR",
        color: "#b81b1d",
        textColor: "white",
        image: severe,
        bg_color: colors.poor,
      };
    } else if (aqi > 400) {
      return {
        status: "SEVERE",
        color: "#600e0f",
        textColor: "white",
        image: hazardous,
        bg_color: colors.veryPoor,
      };
    }
  };

  const { status: aqiStatusText, image: aqiImage } = aqiStatus;

  const rowClassName = (data) => {
    return parseFloat(data.deviationPercentage) > 10 ? "red-row" : "";
  };
  const showUploadDialog = () => {
    setUploadDialogVisible(true);
  };

  const hideUploadDialog = () => {
    setUploadDialogVisible(false);
  };

  const renderRecommendations = () => {
    return (
      <AQIRecommendations aqi={aqiValue} pm25={pm25Value} pm10={pm10Value} />
    );
  };

  const renderDashboard = () => {
    return <LiveAQI show={false} />;
  };
  const [score, setScore] = useState(null);
  const [scoreColor, setScoreColor] = useState("#000");

  const handleScoreCalculated = (calculatedScore) => {
    setScore(calculatedScore);

    // Update the score color based on the calculated score
    const color = getScoreColor(calculatedScore);
    setScoreColor(color);
    // You can also perform additional actions with the score here
  };

  const getScoreColor = (aqiScore) => {
    if (aqiScore === 100) {
      return colors.good; // Green for Excellent
    } else if (aqiScore === 80) {
      return colors.moderate; //  Green for good
    } else if (aqiScore === 60) {
      return colors.yellow; // Yellow for moderate
    } else if (aqiScore === 40) {
      return colors.warning; // Yellow for below moderate
    } else if (aqiScore === 20) {
      return colors.poor; // Red for poor
    } else if (aqiScore === 0) {
      return colors.veryPoor; // Red for Severe
    }
  };

  if (serverDown) {
    return <ServerDown />;
  }

  return loading ? (
    <div className="flex h-screen align-items-center justify-content-center flex-column">
      <ProgressSpinner />
      <p className="font-medium text-lg">Please Wait, Fetching Data...</p>
    </div>
  ) : (
    <div className="flex flex-column gap-3 w-full p-4">
      {show && (
        <div className="flex align-items-center justify-content-between gap-3">
          <div className="flex align-items-center justify-content-between w-full">
            {/* Title & Score */}
            <AqiScoreCalculator onAQIScoreCalculated={handleScoreCalculated} />
            {score !== null && (
              <div
                style={{
                  position: "relative",
                  width: "340px",
                  height: "43px",
                  overflow: "hidden", // Hide overflow if needed
                }}
              >
                <div
                  className="flex align-items-center justify-content-between p-2"
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backgroundColor: scoreColor,
                    clipPath:
                      "polygon(100% 0%, 87% 51%, 100% 100%, 0 100%, 0% 50%, 0 0)",
                  }}
                >
                  <h1
                    className="m-0 p-0 text-white text-2xl font-semibold"
                    style={{ zIndex: 1500 }}
                  >
                    LIVE Air Quality Index
                  </h1>
                  <p
                    className="m-0 p-2 text-primary1 text-xl font-bold border-circle bg-white mr-7"
                    style={{ zIndex: 1500 }}
                  >
                    {score}
                  </p>
                </div>
              </div>
            )}
            {/* Selected  location & Date */}
            <div className="flex align-items-start flex-column gap-1">
              {/* location */}
              <div className="flex align-items-center gap-1">
                <i className="pi pi-map-marker text-primary1 font-medium text-sm"></i>
                <p className="m-0 p-0 text-primary1 font-medium text-sm">
                  {selectedLocation || "Select a location"}
                </p>
              </div>
              <Divider className="m-0 p-0" />
              {/* Date Range */}
              <div className="flex align-items-center justify-content-start gap-1">
                <i className="pi pi-calendar text-primary1 font-medium text-sm"></i>
                <p className="m-0 p-0 text-primary1 font-medium text-sm">
                  {liveStartDate
                    ? liveStartDate.toLocaleDateString()
                    : "Start Date"}{" "}
                  -{" "}
                  {liveEndDate ? liveEndDate.toLocaleDateString() : "End Date"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex align-ites-center justify-content-end gap-2">
            <Button
              icon={compare ? "pi pi-gauge" : "pi pi-arrow-right-arrow-left"} // Conditional icon
              label={compare ? "Live" : "Compare"} // Conditionally set the label
              onClick={(e) => overlayRef2.current.toggle(e)}
              //   onClick={() => setCompare(!compare)} // Toggle the compare state
              className="bg-primary1 text-white"
              raised
            />
            <OverlayPanel
              ref={overlayRef2}
              style={{ width: "20rem" }}
              className="p-overlay-panel"
            >
              <div className="flex flex-column gap-3">
                <div className="p-field text-sm flex flex-column gap-2">
                  <label htmlFor="dateRange" className="font-semibold text">
                    Select Date Range for which you want to compare:
                  </label>
                  <Calendar
                    id="dateRange"
                    value={[startDate, endDate]} // Pass selected date range as an array
                    onChange={(e) => {
                      const [newStartDate, newEndDate] = e.value; // Destructure range
                      setStartDate(newStartDate);
                      setEndDate(newEndDate);
                    }}
                    selectionMode="range"
                    showIcon
                    dateFormat="dd-mm-yy"
                    placeholder="Select date range"
                    showButtonBar
                    hideOnRangeSelection
                  />
                </div>
                <div className="flex justify-content-between">
                  <Button
                    className="bg-white text-secondary2"
                    label="Reset"
                    // icon="pi pi-search"
                    onClick={resetFilters}
                    raised
                  />
                  <Button
                    className="bg-primary1"
                    label="Apply"
                    // icon="pi pi-search"
                    onClick={fetchAQIData}
                    raised
                  />
                </div>
              </div>
            </OverlayPanel>

            <Button
              tooltip="Filters"
              tooltipOptions={{
                position: "bottom",
              }}
              icon="pi pi-filter"
              onClick={(e) => overlayRef1.current.toggle(e)}
              className="bg-white text-secondary2"
              raised
            />
            <OverlayPanel
              ref={overlayRef1}
              style={{ width: "20rem" }}
              className="p-overlay-panel"
            >
              <div className="flex flex-column gap-3">
                <div className="flex flex-column">
                  <label htmlFor="location" className="font-semibold text">
                    Location
                  </label>
                  <Dropdown
                    value={selectedLocation}
                    options={locations}
                    optionLabel="label"
                    optionValue="value"
                    onChange={(e) => setSelectedLocation(e.value)}
                    placeholder="Select Location"
                  />
                </div>
                <div className="p-field text-sm flex flex-column">
                  <label htmlFor="dateRange" className="font-semibold text">
                    Select Date Range
                  </label>
                  <Calendar
                    id="dateRange"
                    value={[liveStartDate, liveEndDate]} // Pass selected date range as an array
                    onChange={(e) => {
                      const [newStartDate, newEndDate] = e.value; // Destructure range
                      setLiveStartDate(newStartDate);
                      setLiveEndDate(newEndDate);
                    }}
                    selectionMode="range"
                    showIcon
                    dateFormat="dd-mm-yy"
                    placeholder="Select date range"
                    showButtonBar
                    hideOnRangeSelection
                  />
                </div>
                <div className="flex justify-content-between">
                  <Button
                    className="bg-white text-secondary2"
                    label="Reset"
                    // icon="pi pi-search"
                    onClick={resetFilters}
                    raised
                  />
                  <Button
                    className="bg-primary1"
                    label="Apply"
                    // icon="pi pi-search"
                    onClick={handleCompare}
                    raised
                  />
                </div>
              </div>
            </OverlayPanel>
            <Button
              icon="pi pi-plus"
              className="bg-white text-secondary2"
              onClick={showUploadDialog}
              raised
              tooltip="Upload Data"
              tooltipOptions={{
                position: "bottom",
              }}
            />
            <Upload
              visible={uploadDialogVisible}
              onHide={hideUploadDialog}
              parameter={"aqinew"}
            />
            <Button
              tooltip="Generate Report"
              tooltipOptions={{
                position: "bottom",
              }}
              icon="pi pi-file"
              onClick={() => setReportVisible(true)}
              // className="bg-white text-cyan-800 border-1 border-cyan-800"
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
              {/* <AQIReportPrint
          show={false}
          selectedLocation={selectedLocation}
          startDate={startDate}
          endDate={endDate}
        /> */}
              <ReportPrint
                renderDashboard={renderDashboard}
                renderRecommendations={renderRecommendations}
                parameter={"aqi"}
                heading={"Air Quality Index"}
              />
            </Dialog>
          </div>
        </div>
      )}

      <div className="flex flex-wrap md:flex-nowrap align-items-end w-full gap-4">
        {selectedLocation && (
          <div
            className="flex border-round-xl p-2 justify-content-between bg-white"
            style={{
              // backgroundColor: aqiStatus.bg_color,
              border: `1px solid ${aqiStatus.color}`,
              flex: "20%",
            }}
          >
            <div className="flex flex-column align-items-center justify-content-between">
              <h1 className="card-title text-primary1 m-0 p-0">Average AQI</h1>
              <h1 className="text-3xl font-medium p-0 m-0 text-primary1">
                {aqiValue !== null ? `${aqiValue}` : "No Data Found."}
              </h1>
              <Tag
                className="border-round-3xl"
                style={{ backgroundColor: aqiStatus.color, color: "white" }}
              >
                <span className="text-xs">
                  {aqiStatus.status || "No Status"}{" "}
                </span>
              </Tag>
            </div>

            {aqiImage && (
              <img src={aqiImage} alt={aqiStatusText} className="h-14rem" />
            )}
          </div>
        )}
        <div style={{ flex: "30%" }}>
          {loading ? (
            <div className="w-full">
              <TableSkeleton />
            </div>
          ) : (
            <DataTable
              value={dataTableData}
              rowClassName={rowClassName}
              className="custom-row"
              scrollable
              scrollHeight="15rem"
              style={{
                width: "100%",
                borderRadius: "15px",
                overflow: "hidden",
                // scrollbarWidth: "none",
                padding: 2,
              }}
              emptyMessage="No Outlier Days Found."
            >
              <Column
                field="aqi"
                header="AQI"
                className="font-semibold text-left text-lg"
                headerStyle={{
                  fontSize: "0.6rem",
                  backgroundColor: "#166c7d",
                  color: "white",
                  padding: 3,
                }}
              ></Column>
              <Column
                field="date"
                header="Date"
                className="text-left"
                headerStyle={{
                  fontSize: "0.2rem",
                  backgroundColor: "#166c7d",
                  color: "white",
                  padding: 3,
                }}
              ></Column>
              <Column
                field="time"
                header="Time"
                className="text-left"
                headerStyle={{
                  fontSize: "0.6rem",
                  backgroundColor: "#166c7d",
                  color: "white",
                  padding: 3,
                }}
              />

              <Column
                field="deviationPercentage"
                header="Outlier %"
                className="text-lg font-semibold text-left"
                style={{ width: "20%" }}
                headerStyle={{
                  fontSize: "0.6rem",
                  backgroundColor: "#166c7d",
                  color: "white",
                  padding: 3,
                }}
              ></Column>
            </DataTable>
          )}
        </div>

        <div className="flex bg-white border-round-2xl" style={{ flex: "25%" }}>
          <AqiMap averageAQI={aqiValue} selectedLocation={selectedLocation} />
        </div>
        <div
          className="flex flex-column bg-white border-round p-3 gap-3 overflow-y-auto "
          style={{ flex: "30%" }}
        >
          {/* Insights */}
          {aqiStats && (
            <div className="flex flex-column bg-white border-round h-13rem p-3 gap-3 overflow-y-auto">
              <p className="card-title p-0 m-0">Insights</p>
              <div className="flex flex-column align-items-start justify-content-start gap-2">
                <li className="p-0 m-0 text-primary1 font-medium text-sm">
                  A total of{" "}
                  <span className="m-0 p-0 font-semibold text-sm text-red-500">
                    {dataTableData.length}
                  </span>{" "}
                  outlier readings have been recorded, indicating that the AQI
                  exceeds the safe limit of 400.
                </li>
              </div>

              <div className="flex flex-column align-items-start justify-content-start gap-2">
                <li className="p-0 m-0 text-primary1 font-medium text-sm">
                  During the selected period, the highest recorded AQI was{" "}
                  <span className="m-0 p-0 font-semibold text-sm text-red-500">
                    {aqiStats.max.value}
                  </span>{" "}
                  on{" "}
                  <span className="m-0 p-0 font-semibold text-sm ">
                    {aqiStats.max.dateTime}
                  </span>{" "}
                  . This spike in AQI was primarily driven by elevated levels of
                  PM2.5, which measured{" "}
                  <span className="m-0 p-0 font-semibold text-sm">
                    {aqiStats.max.pm25}
                  </span>{" "}
                  µg/m³, and PM10 at{" "}
                  <span className="m-0 p-0 font-semibold text-sm">
                    {aqiStats.max.pm10}
                  </span>{" "}
                  µg/m³. These high concentrations of particulate matter
                  significantly contributed to the poor air quality observed.
                </li>
              </div>
              <div className="flex flex-column align-items-start justify-content-start gap-2">
                <li className="p-0 m-0 text-primary1 font-medium text-sm">
                  Conversely, the lowest AQI recorded was{" "}
                  <span className="m-0 p-0 font-semibold text-sm text-green-500">
                    {aqiStats.min.value}
                  </span>{" "}
                  on{" "}
                  <span className="m-0 p-0 font-semibold text-sm ">
                    {aqiStats.min.dateTime}
                  </span>{" "}
                  . During this time, both PM2.5 and PM10 levels were notably
                  lower, with PM2.5 at{" "}
                  <span className="m-0 p-0 font-semibold text-sm">
                    {aqiStats.min.pm25}
                  </span>{" "}
                  µg/m³ and PM10 at{" "}
                  <span className="m-0 p-0 font-semibold text-sm">
                    {aqiStats.min.pm10}
                  </span>{" "}
                  µg/m³. The reduced presence of these pollutants resulted in a
                  significant improvement in air quality.
                </li>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3 w-full bg-white border-round p-4">
        {!compare ? (
          <AQIChart
            enviroDate={dateArrayData}
            envirotime={timeArrayData}
            enviroAQI={AQIArrayData}
            selectedLocation={selectedLocation}
            startDate={startDate}
          />
        ) : (
          <AQIChartNEW
            enviroDate={envirodate}
            envirotime={envirotime}
            enviroAQI={enviroAQI}
            selectedLocation={selectedLocation}
            startDate={startDate}
            aqiAPI={AQIArrayData}
            dateAPI={dateArrayData}
            timeAPI={timeArrayData}
          />
        )}
      </div>
      {!compare ? (
        <div className="flex align-items-center justify-content-center flex-wrap md:flex-nowrap w-full gap-3">
          <div className="flex gap-3 w-full bg-white border-round p-4">
            <PollutantChart
              envirodate={dateArrayData}
              envirotime={timeArrayData}
              pollutantData={pm25ArrayData}
              selectedLocation={selectedLocation}
              pollutantName="PM2.5"
              baseChartColor="#F7A47A"
              drilldownChartColor="#FFC107"
              height={200}
              safeLimit={60}
            />
          </div>
          <div className="flex gap-3 w-full bg-white border-round p-4">
            <PollutantChart
              envirodate={dateArrayData}
              envirotime={timeArrayData}
              pollutantData={pm10ArrayData}
              selectedLocation={selectedLocation}
              pollutantName="PM10"
              baseChartColor="#47B881"
              drilldownChartColor="#80CBC4"
              height={200}
              safeLimit={100}
            />
          </div>
          <div className="flex gap-3 w-full bg-white border-round p-4">
            <PollutantChart
              envirodate={dateArrayData}
              envirotime={timeArrayData}
              pollutantData={NO2ArrayData}
              selectedLocation={selectedLocation}
              pollutantName="NO2"
              baseChartColor="#FFDD82"
              drilldownChartColor="#E57373"
              height={200}
              safeLimit={80}
            />
          </div>
          <div className="flex gap-3 w-full bg-white border-round p-4">
            <PollutantChart
              envirodate={dateArrayData}
              envirotime={timeArrayData}
              pollutantData={SO2ArrayData}
              selectedLocation={selectedLocation}
              pollutantName="SO2"
              baseChartColor="#C68FE6"
              drilldownChartColor="#FFF176"
              height={200}
              safeLimit={80}
            />
          </div>
        </div>
      ) : (
        <div className="flex align-items-center justify-content-center flex-wrap md:flex-nowrap w-full gap-3">
          <div className="flex gap-3 w-full bg-white border-round p-4">
            <PollutantChartNEW
              envirodate={envirodate}
              envirotime={envirotime}
              dateAPI={dateArrayData}
              timeAPI={timeArrayData}
              pollutantData={enviropm25}
              pollutantDataAPI={pm25ArrayData}
              selectedLocation={selectedLocation}
              pollutantName="PM2.5"
              baseChartColor="#F7A47A"
              drilldownChartColor="#FFC107"
              drilldownChartColorAPI="#F7A47A"
              baseChartColorAPI="#FFC107"
              height={200}
              safeLimit={60}
            />
          </div>
          <div className="flex gap-3 w-full bg-white border-round p-4">
            <PollutantChartNEW
              envirodate={envirodate}
              envirotime={envirotime}
              dateAPI={dateArrayData}
              timeAPI={timeArrayData}
              pollutantData={enviropm10}
              pollutantDataAPI={pm10ArrayData}
              selectedLocation={selectedLocation}
              pollutantName="PM10"
              baseChartColor="#47B881"
              drilldownChartColor="#80CBC4"
              drilldownChartColorAPI="#47B881"
              baseChartColorAPI="#80CBC4"
              height={200}
              safeLimit={100}
            />
          </div>
          <div className="flex gap-3 w-full bg-white border-round p-4">
            <PollutantChartNEW
              envirodate={envirodate}
              envirotime={envirotime}
              dateAPI={dateArrayData}
              timeAPI={timeArrayData}
              pollutantData={enviroNO2}
              pollutantDataAPI={NO2ArrayData}
              selectedLocation={selectedLocation}
              pollutantName="NO2"
              baseChartColor="#FFDD82"
              baseChartColorAPI="#E57373"
              drilldownChartColor="#E57373"
              drilldownChartColorAPI="#FFDD82"
              height={200}
              safeLimit={80}
            />
          </div>
          <div className="flex gap-3 w-full bg-white border-round p-4">
            <PollutantChartNEW
              envirodate={envirodate}
              envirotime={envirotime}
              dateAPI={dateArrayData}
              timeAPI={timeArrayData}
              pollutantData={enviroso2}
              pollutantDataAPI={SO2ArrayData}
              selectedLocation={selectedLocation}
              pollutantName="SO2"
              baseChartColor="#C68FE6"
              drilldownChartColor="#FFF176"
              drilldownChartColorAPI="#C68FE6"
              baseChartColorAPI="#FFF176"
              height={200}
              safeLimit={80}
            />
          </div>
        </div>
      )}

      <RecommendationPanel
        show={true}
        renderRecommendations={renderRecommendations}
        // selectedLocation={selectedLocation}
      />
    </div>
  );
};

export default LiveAQI;
