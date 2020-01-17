//libs
import React, { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

//src
import {
  verifyAdmin,
  verifyUser,
  getUsers
} from "../../redux/actions/adminActions";

//css
import "./LandingPage.css";

const LandingPage = props => {
  const dispatch = useDispatch();
  const { user, adminData, verifyAdmin, verifyUser, userData } = props;
  const [employeeId, setemployeeId] = useState(null);
  const [pinCode, setpinCode] = useState(null);
  const history = useHistory();

  const verified = () => {
    if (userData[0].pincode === "0") {
      history.push("/pin-change-form");
    } else {
      history.push("/users-landing-page");
    }
  };

  useEffect(() => {
    if (userData.message === "No User") {
      alert("Bad Credentials");
    } else if (userData.length > 0) {
      dispatch({ type: "USER", payload: userData[0].firstname });
      localStorage.setItem("User", userData[0].firstname);
      verified();
    }
  }, [userData]);

  useEffect(() => {
    if (adminData.message === "No Admin") {
      alert("Bad Credentials");
    } else if (adminData.length > 0) {
      dispatch({ type: "ADMIN", payload: adminData[0].firstname });
      localStorage.setItem("Admin", adminData[0].firstname);
      history.push("/dashboard/users-availability");
    }
  }, [adminData]);

  const onChangeHandler = e => {
    if (e.target.name === "id") {
      setemployeeId(e.target.value);
    } else {
      setpinCode(e.target.value);
    }
  };

  return (
    <div className="loginForm">
      {user ? <h2>User Punch Form</h2> : <h2>Admin Login Form</h2>}
      <div className="form">
        <div className="landingpage-container">
          <label for="employeeid">
            {user ? <b>Employee ID</b> : <b>Admin ID</b>}
          </label>
          <input
            onChange={onChangeHandler}
            type="numeric"
            placeholder="Enter ID"
            name="id"
            required
          />
          <label for="pincode">
            <b>Pin Code</b>
          </label>
          <input
            onChange={onChangeHandler}
            type="numeric"
            placeholder="Enter Pin Code"
            name="pincode"
            required
          />
          <button
            onClick={() => {
              user
                ? verifyUser(pinCode, employeeId)
                : verifyAdmin(pinCode, employeeId);
            }}
          >
            Login
          </button>
          {user ? (
            <a onClick={() => history.push("/")}>Admin Login From</a>
          ) : (
            <a onClick={() => history.push("/punch-form-user-login")}>
              Punch Form For User Login
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ admin: { adminData, userData } }) => ({
  adminData,
  userData
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      verifyAdmin,
      verifyUser,
      getUsers
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
