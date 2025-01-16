import axios from "axios";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { FileUpload } from "primereact/fileupload";
import { ProgressSpinner } from "primereact/progressspinner";
import React, { useState } from "react";

const Upload = ({ visible, onHide, parameter }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    try {
      if (!file) {
        alert("No file chosen. Please select a file to upload.");
        return;
      }
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        `http://localhost:8010/upload/${parameter}`,
        formData
      );

      if (response.status === 200) {
        setLoading(false);
        alert("File uploaded successfully!");
        onHide(); // Close dialog after successful upload
      } else {
        alert(`Upload failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const handleDownloadTemplate = () => {
    // URL of the Excel template file in the public directory
    var url = "";
    if (parameter === "water") {
      url = `${process.env.PUBLIC_URL}/Water_Template.xlsx`;
    }

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "template.xlsx"); // Set the name for the downloaded file

    // Append to body, trigger click and remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Clean up
  };

  return (
    <Dialog
      header="Upload File"
      visible={visible}
      style={{ width: "50vw", fontSize: "2rem" }}
      onHide={onHide}
      className="font-bold text-xl"
    >
      <div className="w-full flex align-items-start justify-content-center gap-4 flex-column p-2">
        {loading && (
          <ProgressSpinner
            style={{ width: "50px", height: "50px" }}
            strokeWidth="8"
            fill="var(--surface-ground)"
          />
        )}
        {!loading && (
          <>
            <Button
              label="Download Template"
              icon="pi pi-download"
              onClick={handleDownloadTemplate}
              className="bg-transparent text-primary1 font-bold" // Attach download handler
            />
            <FileUpload
              name="file"
              auto
              customUpload
              accept=".xlsx, .xls"
              uploadHandler={(event) => {
                setFile(event.files[0]);
              }}
              emptyTemplate={<p>Please upload the excel file</p>}
              className="w-full"
            />
            <div className="flex w-full align-items-end justify-content-end">
              <Button
                onClick={handleUpload}
                label="Upload File"
                className="bg-cyan-800"
              ></Button>
            </div>
          </>
        )}
      </div>
    </Dialog>
  );
};

export default Upload;
