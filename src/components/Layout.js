import React from "react";
import { Container } from "react-bootstrap";
import FileUpload from "./FileUpload";

const Layout = () => {
  const [fileData, setFileData] = React.useState();

  return (
    <div>
      <Container>
        <FileUpload fileData={fileData} setFileData={setFileData} />
      </Container>
    </div>
  );
};

export default Layout;
