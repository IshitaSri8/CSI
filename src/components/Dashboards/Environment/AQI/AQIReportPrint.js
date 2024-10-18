import React, { useState, useRef } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import AqiDashboard from "./AqiDashboard";
import AQIRecommendations from "./AQIRecommendations";

export default function AQIReportPrint({
  visible,
  toggleModalVisibility,
  selectedLocation,
  startDate,
  endDate,
}) {
  const contentRef = useRef(null);
  const [aqiValue, setAqiValue] = useState(null);
  const [pm25Value, setPM25Value] = useState(null);
  const [pm10Value, setPM10Value] = useState(null);
  const handleAqiData = (data) => {
    setAqiValue(data.aqiValue);
    setPM25Value(data.pm25Value);
    setPM10Value(data.pm10Value);
  };

  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
    bodyClass: "p-2",
  });

  const handleExport = async () => {
    if (contentRef.current) {
      const canvas = await html2canvas(contentRef.current);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, -heightLeft, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const now = new Date();
      const dateStr = `${now.getDate()}/${
        now.getMonth() + 1
      }/${now.getFullYear()}`;
      const timeStr = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

      pdf.setFontSize(10);
      pdf.text(
        `Generated on ${dateStr} at ${timeStr}`,
        10,
        pdf.internal.pageSize.height - 10
      );

      pdf.save("aqi_summary_report.pdf");
    }
  };

  return (
    <>
      <div ref={contentRef}>
        <div className="w-full print-container gap-2">
          <div className="flex flex-column gap-2 align-items-center w-full">
            <h1
              style={{ color: "#166c7d" }}
              className="m-0 p-0 text-center text-2xl"
            >
              City Sustainability Index 2024
            </h1>
            <h4 className="m-0 p-0">{selectedLocation}</h4>
            <h4 className="m-0 p-0">Ayodhya, Uttar Pradesh</h4>

            <div className="flex align-items-center justify-content-center flex-row">
              <p>
                Date Range: &nbsp;{startDate?.toLocaleDateString()}&nbsp; to{" "}
                {endDate?.toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="w-full">
            <AqiDashboard
              onDataChange={handleAqiData}
              show={false}
              pSelectedLocation={selectedLocation}
              pSelectedStartDate={startDate}
              pSelectedEndDate={endDate}
            />
          </div>
        </div>
      </div>
      <div className="flex align-items-center justify-content-end p-2 w-full">
        <Button
          label="Print"
          icon="pi pi-print"
          size="small"
          className="p-button-secondary mr-2"
          onClick={handlePrint}
        />
        <Button
          label="Export as PDF"
          icon="pi pi-file-export"
          size="small"
          className="p-button-success"
          onClick={handleExport}
        />
      </div>
    </>
  );
}
