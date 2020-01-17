//libs
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";

//src
import { changePin } from "../../../redux/actions/userActions";

//css
import "./PinChangeForm.css";

const PinChangeForm = props => {
  const { changePin, userID } = props;
  const [newPin, setnewPin] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();

  const onChangeHandler = e => {
    if (e.target.name === "pin") {
      setnewPin(e.target.value);
    }
  };

  const changeThePin = () => {
    return (
      changePin(userID, newPin),
      history.push("/punch-form-user-login"),
      dispatch({ type: "USER_ID", payload: 0 }),
      dispatch({ type: "VERIFY_USER_RESPONSE", payload: [] })
    );
  };

  return (
    <div className="loginForm">
      <h2>Enter New Pin</h2>
      <div className="form">
        <div className="landingpage-container">
          <label for="pin">
            <b>Enter New Pin</b>
          </label>
          <input
            onChange={onChangeHandler}
            type="numeric"
            placeholder="Enter New Pin"
            name="pin"
            required
          />
          <button onClick={() => changeThePin()}>Save</button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ user: { userID } }) => ({
  userID
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      changePin
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PinChangeForm);
