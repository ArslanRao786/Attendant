//libs
import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Button, Input, InputNumber } from "antd";
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";

//src
import ListView from "../../../Components/ListView";
import {
  changeOfficeTiming,
  changeMinimumWorkingHours
} from "../../../redux/actions/adminActions";

//css
import "./Settings.css";

const Settings = props => {
  const history = useHistory();
  const { users, changeOfficeTiming, changeMinimumWorkingHours } = props;
  const { Search } = Input;
  const [value, setvalue] = useState();
  const [fromTime, setfromTime] = useState();
  const [toTime, settoTime] = useState();
  const [minimumWorkingHours, setminimumWorkingHours] = useState();

  let user = [];
  if (value) {
    user = users.filter(user => user.firstname === value);
  } else {
    user = users;
  }

  return (
    <Fragment>
      <div className="office-timing">
        <InputNumber
          min={1}
          max={12}
          onChange={value => setfromTime(value)}
          placeholder="Start Time"
        />
        <InputNumber
          min={1}
          max={12}
          onChange={value => settoTime(value)}
          placeholder="End Time"
        />
        <Button
          onClick={() => changeOfficeTiming(fromTime, toTime)}
          type="primary"
          style={{ width: "200px" }}
        >
          Change Office Timing
        </Button>
      </div>
      <div className="office-timing">
        <InputNumber
          min={1}
          max={12}
          onChange={value => setminimumWorkingHours(value)}
          placeholder="Hours"
        />

        <Button
          onClick={() => changeMinimumWorkingHours(minimumWorkingHours)}
          type="primary"
          style={{ width: "200px" }}
        >
          Minimum Working Hours
        </Button>
      </div>
      <div className="settings-container">
        <Search
          placeholder="Search By First Name"
          onSearch={val => setvalue(val)}
        />
        <div className="settings-list-container">
          <ListView users={user} actionItem={true} />
        </div>
        <div className="button-container">
          <Button
            onClick={() => history.push("/dashboard/settings/create-user")}
            type="primary"
          >
            Add User
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ admin: { users } }) => ({
  users
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      changeOfficeTiming,
      changeMinimumWorkingHours
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
