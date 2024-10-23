import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Tooltip } from "primereact/tooltip";
import React, { useState } from "react";
import {
  ColumnChart,
  CombinationChart,
  GroupedBarChart,
  GroupedColumnChart,
} from "Layout/GraphVisuals";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import CultureReportPrint from "./CultureReportPrint";

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
  const totalSites = [200, 210, 215, 220, 225]; // Example total cultural sites over years
  const maintainedSites = [20, 40, 50, 80, 180];

  return (
    <div className="flex gap-3 flex-column p-4">
      {show && (
        <div className="flex align-items-center justify-content-between w-full">
          <h1 className="m-0 p-0 text-primary1 text-xl text-medium">
            Cultural Preservation
          </h1>
          <Button
            label="Generate Report"
            icon="pi pi-file"
            onClick={() => setReportVisible(true)}
            //className="bg-white text-cyan-800 border-1 border-cyan-800"
            className="mb-4 bg-theme text-white"
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
      {/* First Row */}
      <div className="flex align-items-center justify-content-center gap-3 flex-row w-full">
        <Card className="w-full">
          <div className="flex">
            <i className="pi pi-info-circle text-cyan-800 text-right w-full text-sm cursor-pointer sites"></i>
          </div>

          <div className="flex align-items-center justify-content-center flex-row gap-1">
            <div className="flex align-items-center justify-content-center gap-2 flex-column">
              <h1 className="m-0 p-1 text-2xl text-cyan-800 text-center">
                215
              </h1>
              <p className="text-sm m-0 p-1 text-center">Cultural Sites</p>
            </div>
            <Divider layout="vertical" />
            <div className="flex align-items-center justify-content-center gap-1 flex-column">
              <h1 className="m-0 p-1 text-2xl text-cyan-800 text-center">
                10%
              </h1>
              <p className="text-sm m-0 p-1 text-center">Maintained Sites</p>
            </div>
          </div>
        </Card>
        <Tooltip target=".sites" position="right">
          <div className="flex align-items-start justify-content-start gap-4 p-2">
            <ul>
              <li>Historical Sites: 85</li>
              <li>Historical Landmarks: 70</li>
              <li>Museums: 60</li>
            </ul>
          </div>
        </Tooltip>
        <Card className="w-full">
          <div className="flex align-items-center justify-content-center gap-1 flex-column p-2">
            <h1 className="m-0 p-1 text-2xl text-cyan-800 text-center">26</h1>
            <p className="text-base m-0 p-1 text-center">
              Cultural Festivals/Events
            </p>
          </div>
        </Card>
        <Card className="w-full">
          <div className="flex align-items-center justify-content-center gap-1 flex-column p-2">
            <h1 className="m-0 p-1 text-2xl text-cyan-800 text-center">
              100 Cr
            </h1>
            <p className="text-base m-0 p-1 text-center">Fund Allocated</p>
          </div>
        </Card>
        <Card className="w-full">
          <div className="flex align-items-center justify-content-center gap-1 flex-column">
            <h1 className="m-0 p-1 text-2xl text-cyan-800 text-center">180</h1>
            <p className="text-sm m-0 p-1 text-center">
              {" "}
              Schools Offering Courses in Local Languages
            </p>
          </div>
        </Card>
        <Card className="w-full">
          <div className="flex align-items-center justify-content-center gap-1 flex-column p-2">
            <h1 className="m-0 p-1 text-2xl text-cyan-800 text-center">
              1,15,000
            </h1>
            <p className="text-base m-0 p-1 text-center"> Tourists</p>
          </div>
        </Card>
      </div>

      {/* Second Row */}
      <div className="flex align-items-center justify-content-center gap-3 w-full">
        <Card className="w-full">
          <CombinationChart
            title="Total Vs Maintained Cultural Sites Over Years"
            categories={categories}
            totalSites={totalSites}
            maintainedSites={maintainedSites}
            height={300}
          />
        </Card>
        <Card className="w-full">
          <ColumnChart
            title="Funds Allocated Over Years (in Crore)"
            categories={categories}
            series={funds}
            height={300}
          />
        </Card>
        <Card className="w-full">
          <GroupedBarChart
            title="Number of Tourists Over Years"
            labels={categories}
            dataSeries={touristData}
            height={300}
            dataPointWidth={20}
          />
        </Card>
      </div>
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

      {/* {recommendationsVisible && (
        <DisasterRecommdations />
      )} */}
    </div>
  );
};

export default Culture;
