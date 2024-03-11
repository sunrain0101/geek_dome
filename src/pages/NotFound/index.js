import React from "react";
import { Result, Button } from "antd";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const NoFound = () => {
  const history = useHistory();
  return (
    <Result
      style={{ paddingTop: 100 }}
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button onClick={() => history.replace("/")} type="primary">
          Back Home
        </Button>
      }
    ></Result>
  );
};
export default NoFound;
