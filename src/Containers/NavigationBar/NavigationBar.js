//libs
import React, { Fragment } from "react";

//src
import FetchData from "../../Components/FetchData/FetchData";

//css
import "./NavigationBar.css";

const NavigationBar = () => {
  return (
    <Fragment>
      <FetchData />
      <div className="NavBar">
        <h1>ATTENDANT</h1>
      </div>
    </Fragment>
  );
};

export default NavigationBar;
