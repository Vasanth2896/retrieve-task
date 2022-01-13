import React from "react";
import { Button } from "react-bootstrap";
import "../styles/fileUpload.css";
import * as XLSX from "xlsx";

const FileUpload = (props) => {
  const { fileData, setFileData } = props;
  const hiddenFileInput = React.useRef(null);

  const handleDataImport = () => {
    hiddenFileInput.current.click();
  };

  const transformJson = (sheetData) => {
    const transformedData = [];
    const sheetHeaders = sheetData[0];
    const newSheetData = [...sheetData].slice(1);
    for (let iterate = 0; iterate < newSheetData.length; iterate++) {
      const orderItem = {};
      for (let iterate2 = 0; iterate2 < sheetHeaders.length; iterate2++) {
        orderItem[sheetHeaders[iterate2]] = newSheetData[iterate][iterate2];
      }
      transformedData.push(orderItem);
    }
    return transformedData;
  };

  const handleChange = (event) => {
    const uploadedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      const data = e.target.result;
      let readData = XLSX.read(data, { type: "binary" });
      const sheet = readData.SheetNames[0];
      const currentSheet = readData.Sheets[sheet];
      const dataParse = XLSX.utils.sheet_to_json(currentSheet, { header: 1 });
      const trasnformedData = transformJson(dataParse);
      setFileData(trasnformedData);
    };
    reader.readAsBinaryString(uploadedFile);
  };

  return (
    <>
      {!fileData && (
        <div className="fileUploadContainer">
          <p style={{ fontSize: 18 }}>Please upload a spreadsheet file</p>
          <Button className="fileUploadBtn" onClick={handleDataImport}>
            Upload
          </Button>
          <input
            type="file"
            ref={hiddenFileInput}
            onChange={handleChange}
            style={{ display: "none" }}
          />
        </div>
      )}
    </>
  );
};

export default FileUpload;
