import React, { useState, useRef } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import LandDashboard from "./LandDashboard";
import LandRecommendations from "./LandRecommendations";
 
export default function LandReportPrint({ visible, toggleModalVisibility }) {
  const contentRef = useRef(null);
 
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
 
      pdf.save("Land_summary_report.pdf");
    }
  };
 
  return (
    <Dialog
      header=""
      visible={visible}
      style={{ width: "95vw" }}
      onHide={toggleModalVisibility}
    >
      <div ref={contentRef}>
        <div className="w-full print-container">
          <div className="flex flex-column gap-2 align-items-center w-full">
            <h1 style={{ color: "#00a269" }} className="m-0 p-0 text-center">
              City Sustainability Index 2024
            </h1>
            <h4 className="m-0 p-0">Ayodhya, Uttar Pradesh</h4>
          </div>
          <div className="w-full">
            <LandDashboard />
          </div>
          <div className="w-full">
            <LandRecommendations />
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
    </Dialog>
  );
}
 
 