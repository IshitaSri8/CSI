import { Tooltip } from "primereact/tooltip";
import React, { useState } from "react";
import {
  CombinationChart,
  GroupedBarChart,
  LineChart,
} from "Layout/GraphVisuals";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import CultureReportPrint from "./CultureReportPrint";
import DisasterRecommendations from "components/Dashboards/Administration/Disaster Management/DisasterRecommendations";
import { Panel } from "primereact/panel";
import { ProgressBar } from "primereact/progressbar";
import festival from "assets/Festival Illustration.svg";
import cultural from "assets/Cultural Sites.svg";

const Culture = ({ show }) => {
  const [ReportVisible, setReportVisible] = useState(false);
  const [recommendationsVisible, setRecommendationsVisible] = useState(false);

  const handleToggleRecommendations = () => {
    setRecommendationsVisible(!recommendationsVisible);
  };

  const touristData = [
    {
      name: "Domestic Tourists",
      data: [50000, 60000, 70000, 80000, 85000], // Values for Domestic Tourists (2020-2024)
    },
    {
      name: "International Tourists",
      data: [10000, 15000, 20000, 25000, 30000], // Values for International Tourists (2020-2024)
    },
  ];

  const categories = ["2020", "2021", "2022", "2023", "2024"];
  const funds = [80, 90, 100, 110, 100]; // Funds allocated for each year (in crores)
  const totalSites = [200, 150, 215, 290, 250]; // Example total cultural sites over years
  const maintainedSites = [20, 40, 50, 80, 180];

  return (
    <div className="flex gap-3 flex-column p-4">
      {show && (
        <div className="flex align-items-center justify-content-between w-full">
          <h1 className="m-0 p-0 text-primary1 text-2xl font-medium">
            Cultural Preservation
          </h1>
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
            <CultureReportPrint />
          </Dialog>
        </div>
      )}
      <div className="flex gap-3 align-items-stretch">
        <div
          className="flex flex-column align-items-stretch justify-content-center gap-3"
          style={{ flex: "20%" }}
        >
          {/* Cultural Sites */}
          <div className="flex flex-column bg-white border-round p-3 w-full">
            <div className="flex align-items-start">
              <p className="text-primary1 font-semibold text-lg p-0 m-0">
                Cultural Sites
              </p>
              <i className="pi pi-info-circle text-secondary2 text-right w-full text-sm cursor-pointer sites"></i>
              <Tooltip target=".sites" position="right">
                <div className="flex align-items-start justify-content-start gap-4 p-2">
                  <ul>
                    <li>Historical Sites: 85</li>
                    <li>Historical Landmarks: 70</li>
                    <li>Museums: 60</li>
                  </ul>
                </div>
              </Tooltip>
            </div>
            <div className="flex align-items-center">
              <p className="text-4xl font-semibold m-0 text-secondary2 p-4">
                215
              </p>
              <img src={cultural} alt="cultural" />
            </div>
            <p className="text-tertiary3 text-left p-0 m-0">Maintained Sites</p>
            <ProgressBar
              value={10}
              style={{ height: "0.75rem" }} // Adjust the height
              className="w-full mt-2" // Full width of its container
              color="#FFAD0D"
              displayValueTemplate={() => null} // Hide the displayed value
            />
            <p className="text-secondary2 text-center text-lg font-medium p-0 m-0">
              10%
            </p>
          </div>

          {/* Cultural Festivals/Events */}
          <div className="flex flex-column bg-white border-round p-3 w-full">
            <p className="text-primary1 font-semibold text-lg p-0 m-0">
              Cultural Festivals & Events
            </p>
            <div className="flex align-items-center">
              <p className="text-4xl font-semibold m-0 text-secondary2 p-4">
                26
              </p>
              <img src={festival} alt="festival" />
            </div>
          </div>

          {/* Fund Allocated */}
          <div className="flex flex-column bg-white border-round p-3 w-full">
            <p className="text-primary1 font-semibold text-lg p-0 m-0">
              Funds Allocated
            </p>
            <p className="text-4xl font-semibold m-0 text-secondary2 p-3 text-center">
              {" "}
              100 <span className="text-xl">Cr</span>
            </p>
          </div>
        </div>

        <div
          className="flex flex-column align-items-center justify-content-center gap-3"
          style={{ flex: "40%" }}
        >
          {/* Total Vs Maintained Cultural Sites Over Years */}
          <div className="flex bg-white border-round align-items-center p-4 w-full">
            <CombinationChart
              title="Total Vs Maintained Cultural Sites Over Years"
              categories={categories}
              totalSites={totalSites}
              maintainedSites={maintainedSites}
              height={258}
            />
          </div>

          {/* Funds Allocated Over Years */}
          <div className="flex bg-white border-round align-items-center p-4 w-full">
            <LineChart
              title="Funds Allocated Over Years (in Crore)"
              categories={categories}
              data={funds}
              height={150}
            />
          </div>
        </div>

        <div
          className="flex flex-column align-items-center justify-content-center gap-3"
          style={{ flex: "40%" }}
        >
          <div className="flex align-items-center justify-content-center gap-3 w-full">
            {/* Tourists */}
            <div className="flex flex-column bg-white border-round p-3 w-full">
              <p className="text-primary1 font-semibold p-0 m-0 text-lg">
                Tourists
              </p>
              <p className="text-4xl font-semibold m-0 text-secondary2 p-4 text-center">
                1,15,000
              </p>
            </div>
            {/* Schools Offering Courses in Local Languages */}
            <div className="flex flex-column bg-white border-round p-3 w-full">
              <p className="text-primary1 font-semibold p-0 m-0">
                Schools Offering Courses in Local Languages
              </p>
              <p className="text-4xl font-semibold m-0 text-secondary2 p-3 text-center">
                180
              </p>
            </div>
          </div>

          {/* Number of Tourists Over Years */}
          <div className="flex bg-white border-round align-items-center p-4 w-full">
            <GroupedBarChart
              title="Number of Tourists Over Years"
              labels={categories}
              dataSeries={touristData}
              height={340}
              dataPointWidth={20}
            />
          </div>
        </div>
      </div>

      {show && (
        <Panel
          //  header="View Recommendations"
          toggleable
          onToggle={handleToggleRecommendations} // Optional: if you want to perform an action on toggleheaderTemplate={(options) => {
          headerTemplate={(options) => {
            const toggleIcon = options.collapsed
              ? "pi pi-chevron-right" // Arrow pointing to the right when collapsed
              : "pi pi-chevron-down"; // Arrow pointing down when expanded

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
          {recommendationsVisible && <DisasterRecommendations />}
        </Panel>
      )}
    </div>
  );
};

export default Culture;




