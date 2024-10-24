import React, { useRef } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Report from "./Report";
import Recommendations from "./Recommendations";

export default function ReportPrint({ visible, toggleModalVisibility }) {
  const contentRef = useRef(null);

  // Set up the print function using react-to-print
  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
    pageStyle: `
      @media print {
        @page { margin: 20mm; }
      }
      body { margin: 0; padding: 0; font-family: Arial, sans-serif; }
      .print-container { padding: 20px; }
      .text-theme { color: #007bff; }
      .text-900 { color: #333; }
    `,
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

      pdf.save("_summary_report.pdf");
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
            <h1 className="m-0 p-0 text-center text-theme mb-4 text-2xl">
              City Sustainability Index 2024
            </h1>
            {/* <h4 className="m-0 p-0">Ayodhya, Uttar Pradesh</h4> */}
          </div>
          <div className="w-full">
            <Report />
          </div>
          <div className="w-full">
            <h1 className="m-0 p-0 text-900 mb-4 text-2xl">Recommendations</h1>
            <Recommendations />
          </div>
        </div>
      </div>
      <div className="flex align-items-center justify-content-end p-2 w-full">
        <Button
          label="Print"
          icon="pi pi-print"
          size="small"
          className="bg-cyan-700 mr-2"
          onClick={handlePrint} // Call the print function from react-to-print
        />
        <Button
          label="Export as PDF"
          icon="pi pi-file-export"
          size="small"
          className="bg-cyan-800"
          onClick={handleExport}
        />
      </div>
    </Dialog>
  );
}
