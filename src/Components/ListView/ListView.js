//libs
import React, { Fragment } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

//src
import ActionItem from "../ActionItem";
import { deleteUser } from "../../redux/actions/adminActions";

//css
import "./ListView.css";

const ListView = props => {
  const { users, actionItem, deleteUser } = props;
  const history = useHistory();
  return (
    <Fragment>
      <div className="header">
        <div className={actionItem ? "list-with-status" : "list"}>
          <h3>Name</h3>
          <h3>Department</h3>
          <h3>Email</h3>
          <h3>Role</h3>
          {actionItem && <h3>Status</h3>}
        </div>
      </div>

      {users.sort().map(user => {
        const {
          firstname,
          lastname,
          department,
          role,
          status,
          email,
          id
        } = user;
        return (
          <div>
            <div className={actionItem ? "list-with-status" : "list"}>
              <p>
                {firstname} {lastname}
              </p>
              <p>{department}</p>
              <p>{email}</p>
              <p>{role}</p>
              {actionItem && <p>{status}</p>}
              {actionItem && (
                <p
                  onClick={() =>
                    history.push(`/dashboard/settings/edit-user/${id}`)
                  }
                  className="action-hover"
                >
                  <ActionItem type={"edit"} />
                </p>
              )}
              {actionItem && (
                <p onClick={() => deleteUser(id)} className="action-hover">
                  <ActionItem type={"delete"} />
                </p>
              )}
            </div>
          </div>
        );
      })}
    </Fragment>
  );
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      deleteUser
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(ListView);
