import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Tooltip } from "primereact/tooltip";
import React, { useState } from "react";
import { BarChart, GroupedBarChart } from "Layout/GraphVisuals";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import CommunityReportPrint from "./CommunityReportPrint";

const Community = ({ show }) => {
  const [ReportVisible, setReportVisible] = useState(false);
  const tcategories = [
    "Anganwari-Housing Area/Cluster",
    "Community room",
    "Community hall and library",
    "Recreational club",
    "Music, dance and drama center",
    "Meditation and spiritual center",
    "Old-age home",
  ];

  // Series data for existing and target values
  const tseries = [
    [88, 88, 29, 4, 4, 4, 1], // Existing values
    [220, 220, 73, 11, 11, 11, 2], // Target values
  ];
  const categories = ["2020", "2021", "2022", "2023", "2024"];
  const fseries = [
    [80, 90, 178, 148, 215], // Funds allocated for each year (in crores)
  ];

 
  return (
    <div className="flex align-items-center justify-content-center gap-2  flex-column p-4">
      {show && (
      <div className="flex align-items-center justify-content-between w-full">
          <h1 className="m-0 p-0 text-2xl text">
            Community Engagement & Holisitic Well-Being
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
              <CommunityReportPrint />
            </Dialog>
          </div>
      )}
      {/* First Row */}
      <div className="flex align-items-center justify-content-center gap-2 flex-row w-full">
        <Card className="w-full">
          <div className="flex">
            <i className="pi pi-info-circle text-cyan-800 text-right w-full text-sm cursor-pointer ngo"></i>
          </div>

          <div className="flex align-items-center justify-content-center flex-row gap-2">
            <div className="flex align-items-center justify-content-center gap-3 flex-column">
              <h1 className="m-0 p-1 text-2xl text-cyan-800 text-center">
                215
              </h1>
              <p className="text-sm m-0 p-1 text-center">NGOs/Forums</p>
            </div>
          </div>
        </Card>
        <Tooltip target=".ngo" position="right">
          <div className="flex align-items-start justify-content-start gap-4 p-2 w-full flex-column">
            <h1 className="m-0 p-0 text-lg text-cyan-800 text-center">
              List of NGOs/Forums
            </h1>
            <ul>
              <li>NGO1 (Work)</li>
              <li>NGO2 (Work)</li>
              <li>NGO3 (Work)</li>
              <li>NGO4 (Work)</li>
              <li>NGO5 (Work)</li>
            </ul>
          </div>
        </Tooltip>
        <Card className="w-full">
          <div className="flex align-items-center justify-content-center gap-1 flex-column p-2">
            <h1 className="m-0 p-1 text-2xl text-cyan-800 text-center">26</h1>
            <p className="text-base m-0 p-2 text-center">
              Annual Public Awareness Meetings/Workshops
            </p>
          </div>
        </Card>
        <Card className="w-full">
          <div className="flex">
            <i className="pi pi-info-circle text-cyan-800 text-right w-full text-sm cursor-pointer feedback"></i>
          </div>

          <div className="flex align-items-center justify-content-center flex-row gap-2">
            <div className="flex align-items-center justify-content-center gap-3 flex-column">
              <h1 className="m-0 p-1 text-2xl text-cyan-800 text-center">58</h1>
              <p className="text-sm m-0 p-1 text-center">
                Feedback Survey Channels
              </p>
            </div>
          </div>
        </Card>
        <Tooltip target=".feedback" position="bottom">
          <div className="flex align-items-start justify-content-start gap-4 p-2 w-full flex-column">
            <h1 className="m-0 p-0 text-lg text-cyan-800 text-center">
              List of Feedback Survey Channels
            </h1>
            <ul>
              <li>Healthcare: 16</li>
              <li>Education: 26</li>
              <li>Transport: 16</li>
            </ul>
          </div>
        </Tooltip>
      </div>

      {/* Second Row */}
      <div className="flex align-items-center justify-content-center gap-2 w-full">
        <Card className="w-4">
          <BarChart
            title="Number of NGOs/Forums Over Years"
            categories={categories}
            series={fseries}
            height={300}
            width={"100%"}
            xtitle=""
            ytitle=""
            color={["#1f77b4"]} // Use a single color for the bars
            labelFontSize={10} // Font size for axis labels
            titleOptions={{
              fontFamily: "Montserrat",
              fontWeight: "bold",
              color: "#333",
              align: "center",
              padding: { bottom: 10 },
            }}
          />
        </Card>

        <Card className="w-8">
          <GroupedBarChart
            title="Socio-Cultural Facilities"
            categories={tcategories}
            series={tseries}
            height={300}
            xtitle=""
            ytitle=""
            color={["#4D7479", "#F7A47A"]} // Assign different colors to the bars
          />
        </Card>
      </div>
    </div>
  );
};

export default Community;
