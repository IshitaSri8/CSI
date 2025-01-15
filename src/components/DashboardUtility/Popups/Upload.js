import axios from "axios";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
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
      // console.log(formData);

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

  return (
    <Dialog
      header="Upload File"
      visible={visible}
      style={{ width: "50vw" }}
      onHide={onHide}
    >
      <div className="w-full flex align-items-center justify-content-center gap-4 flex-column">
        {loading && (
          <ProgressSpinner
            style={{ width: "50px", height: "50px" }}
            strokeWidth="8"
            fill="var(--surface-ground)"
          />
        )}
        {!loading && (
          <>
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
            <Button
              onClick={handleUpload}
              label="Upload File"
              className="bg-cyan-800"
            ></Button>
          </>
        )}
      </div>
    </Dialog>
  );
};

export default Upload;
