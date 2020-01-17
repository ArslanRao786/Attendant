//libs
import React, { Fragment } from "react";

//src
import { getDesiredData } from "../../utils";

//css
import "./PreviousRecordsDisplay.css";

const PreviousRecordsDisplay = props => {
  const data = getDesiredData(props.data);

  return (
    <Fragment>
      <div style={{ backgroundColor: "#def5ec" }} className="records-list">
        <h3>Date</h3>
        <h3>Punch In</h3>
        <h3>Punch Out</h3>
      </div>

      {data.map(data => {
        const { date, punchInTime, punchOutTime } = data;
        return (
          <div className="records-list">
            <h3>{date}</h3>
            <h3>{punchInTime}</h3>
            <h3>{punchOutTime}</h3>
          </div>
        );
      })}
    </Fragment>
  );
};

export default PreviousRecordsDisplay;
