//libs
import React, { useState, useEffect, Fragment } from "react";
import { Card, Button, Modal } from "antd";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

//src
import {
  punchIn,
  punchOut,
  changeStatus,
  previousRecords
} from "../../../redux/actions/userActions";
import PreviousRecordsDisplay from "../../../Components/PreviousRecordsDisplay";

//css
import "./UsersLandingPage.css";

const UsersLandingPage = props => {
  const [visible, setvisible] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const [punch, setpunch] = useState(true);
  const {
    punchInData,
    punchIn,
    punchOut,
    punchInID,
    previousRecords,
    previousRecordsData,
    userData,
    changeStatus
  } = props;

  const showModal = () => {
    const { id } = userData[0];
    previousRecords(id);
    setvisible(true);
  };

  const handleOk = () => {
    setvisible(false);
  };

  const handleCancel = () => {
    setvisible(false);
  };

  useEffect(() => {
    dispatch({ type: "PUNCH_IN_ID", payload: punchInData.id });
  }, [punchInData]);

  if (!previousRecordsData) {
    return null;
  }

  const punchTime = () => {
    if (punch) {
      return (
        punchIn(userData[0].id),
        setpunch(false),
        changeStatus({ id: userData[0].id, status: "Available" })
      );
    } else {
      return (
        punchOut(punchInID),
        setpunch(true),
        localStorage.clear(),
        changeStatus({ id: userData[0].id, status: "Un Available" }),
        dispatch({ type: "USER_ID", payload: null }),
        dispatch({ type: "VERIFY_USER_RESPONSE", payload: [] }),
        history.push("/punch-form-user-login")
      );
    }
  };

  return (
    <Fragment>
      <div className="card-container">
        <Card
          title={
            userData.length &&
            `${userData[0].firstname} ${userData[0].lastname}`
          }
          className="card"
        >
          <div className="user-buttons">
            <Button onClick={punchTime} type="primary" className="modal-button">
              {punch ? "Punch In" : "Punch Out"}
            </Button>
            <Button type="primary" onClick={showModal} className="modal-button">
              Previous Records
            </Button>
            <Button
              type="primary"
              onClick={() =>
                changeStatus({ id: userData[0].id, status: "On Leave" })
              }
              className="modal-button"
            >
              Leave
            </Button>
          </div>
        </Card>

        <Modal
          title={
            userData.length &&
            `${userData[0].firstname} ${userData[0].lastname}`
          }
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[]}
        >
          <PreviousRecordsDisplay data={previousRecordsData} />
        </Modal>
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({
  user: { punchInData, punchOutData, userID, punchInID, previousRecordsData },
  admin: { userData }
}) => ({
  punchInData,
  punchOutData,
  punchInID,
  previousRecordsData,
  userData
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      punchIn,
      punchOut,
      changeStatus,
      previousRecords,
      changeStatus
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersLandingPage);
