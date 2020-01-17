//libs
import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

//src
import { addUser, updateUser } from "../../../redux/actions/adminActions";

//css
import "./CreateOrEditUser.css";

const CreateOrEditUser = props => {
  const { id } = useParams();
  const { addUser, users, updateUser } = props;
  const history = useHistory();
  const user = users.filter(user => user.id == id);
  const [firstName, setfirstName] = useState(user.length && user[0].firstname);
  const [lastName, setlastName] = useState(user.length && user[0].lastname);
  const [department, setdepartment] = useState(
    user.length && user[0].department
  );
  const [email, setemail] = useState(user.length && user[0].email);
  const [role, setrole] = useState(user.length && user[0].role);

  const onChangeHandler = e => {
    if (e.target.name === "firstname") {
      setfirstName(e.target.value);
    } else if (e.target.name === "lastname") {
      setlastName(e.target.value);
    } else if (e.target.name === "department") {
      setdepartment(e.target.value);
    } else if (e.target.name === "email") {
      setemail(e.target.value);
    } else {
      setrole(e.target.value);
    }
  };

  const saveUser = () => {
    if (id) {
      updateUser({ firstName, lastName, department, role, email, id });
    } else {
      addUser({ firstName, lastName, department, role, email });
    }
  };

  return (
    <div className="loginForm">
      <h2>Add User</h2>
      <div className="form">
        <div className="landingpage-container">
          <label for="firstname">
            <b>Fisrst Name</b>
          </label>
          <input
            onChange={onChangeHandler}
            type="string"
            placeholder="Enter First Name"
            name="firstname"
            value={id && firstName}
            required
          />
          <label for="lastname">
            <b>Last Name</b>
          </label>
          <input
            onChange={onChangeHandler}
            type="string"
            placeholder="Enter Last Name"
            name="lastname"
            value={id && lastName}
            required
          />
          <label for="email">
            <b>Email</b>
          </label>
          <input
            onChange={onChangeHandler}
            type="string"
            placeholder="Enter Email example@.com"
            name="email"
            value={id && email}
            required
          />
          <label for="department">
            <b>Department</b>
          </label>
          <input
            onChange={onChangeHandler}
            type="string"
            placeholder="Enter Department"
            name="department"
            value={id && department}
            required
          />
          <label for="role">
            <b>Role</b>
          </label>
          <input
            onChange={onChangeHandler}
            type="string"
            placeholder="Enter Role"
            name="role"
            value={id && role}
            required
          />
          <button
            onClick={() => (saveUser(), history.push("/dashboard/settings"))}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addUser,
      updateUser
    },
    dispatch
  );
};

const mapStateToProps = ({ admin: { users } }) => ({
  users
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrEditUser);
