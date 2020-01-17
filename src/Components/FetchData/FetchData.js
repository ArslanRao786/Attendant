//libs
import React, { Fragment } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

//src
import { getUsers, getAdmin, getUser } from "../../redux/actions/adminActions";

//css
import "./FetchData.css";

const NavigationBar = props => {
  const {
    getUsers,
    users,
    adminData,
    getAdmin,
    userData,
    getUser,
    admin,
    user
  } = props;
  const Admin = admin || localStorage.getItem("Admin");
  const User = user || localStorage.getItem("User");

  if (Admin) {
    if (users.length === 0) {
      getUsers();
    }

    if (adminData.length === 0) {
      getAdmin(localStorage.getItem("Admin"));
    }
  } else if (User) {
    if (userData.length === 0) {
      getUser(localStorage.getItem("User"));
    }
  }

  return <Fragment></Fragment>;
};

const mapStateToProps = ({
  admin: { users, adminData, userData, admin, user }
}) => ({
  users,
  adminData,
  userData,
  admin,
  user
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getUsers,
      getAdmin,
      getUser
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
