import React from "react";
import { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import "primereact/resources/themes/saga-blue/theme.css"; // Choose your theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import AqiDashboard from "../src/components/Dashboards/Environment/AQI/AqiDashboard";
import AQIRecommendations from "../src/components/Dashboards/Environment/AQI/AQIRecommendations";
import AQIReportPrint from "../src/components/Dashboards/Environment/AQI/AQIReportPrint";
import GenerateAqiReport from "./GenerateAQIReport";

const AQI = () => {
  const [aqiValue, setAqiValue] = useState(null);
  const [pm25Value, setPM25Value] = useState(null);
  const [pm10Value, setPM10Value] = useState(null);
  const handleAqiData = (data) => {
    setAqiValue(data.aqiValue);
    setPM25Value(data.pm25Value);
    setPM10Value(data.pm10Value);
  };
  return (
    <div className="p-2">
      <TabView>
        <TabPanel header="Performance">
          <AqiDashboard onDataChange={handleAqiData} show={true} />
        </TabPanel>
        <TabPanel header="Recommendations">
          <AQIRecommendations
            aqi={aqiValue}
            pm25={pm25Value}
            pm10={pm10Value}
          />
        </TabPanel>
        <TabPanel header="Report">
          <GenerateAqiReport />
        </TabPanel>
      </TabView>
    </div>
  );
};

export default AQI;

{
  /* {show && (
            <>
              <div className="flex align-items-center justify-content-start flex-wrap md:flex-nowrap mt-2">
                <Card className="h-15rem w-6">
                  <CustomBarChart
                    title="Human Loss by Age Group and Gender"
                    categories={categories}
                    series={series}
                    height={200}
                    width={500}
                    xtitle="Age Group"
                    ytitle="Number of Losses"
                  />
                </Card>
                <Card className="h-15rem w-6 ml-1 ">
                  <DonutChart
                    title={"Health Impact of NO2"}
                    labels={NO2impactlabels}
                    series={NO2Impactseries}
                    height={200}
                    width={300}
                  />
                </Card>
              </div>
            </>
          )} */

  {
    /* {show && (
        <Panel
          toggleable
          onToggle={handleToggleRecommendations}
          headerTemplate={(options) => {
            const toggleIcon = recommendationsVisible
              ? "pi pi-chevron-up"
              : "pi pi-chevron-down";
            return (
              <div className="flex justify-content-between align-items-center px-4 bg-white border-round">
                <p className="text-primary1 font-semibold text-xl">
                  View Recommendations
                </p>
                <button
                  className={`p-link ${toggleIcon}`}
                  onClick={options.onTogglerClick}
                  style={{
                    background: "none",
                    // border: "none",
                    cursor: "pointer",
                    color: "#001F23",
                  }}
                />
              </div>
            );
          }}
        >
          {recommendationsVisible && (
            <AQIRecommendations
              aqi={aqiValue}
              pm25={pm25Value}
              pm10={pm10Value}
            />
          )}
        </Panel>
      )} */
  }
}
