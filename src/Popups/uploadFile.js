import React from "react";
import { FileUpload } from "primereact/fileupload";
const uploadFile = () => {
  return (
    <div>
      <FileUpload
        name="demo[]"
        url={"/api/upload"}
        multiple
        accept="image/*"
        maxFileSize={1000000}
        emptyTemplate={
          <p className="m-0">Drag and drop files to here to upload.</p>
        }
      />
    </div>
  );
};

export default uploadFile;
