//libs
import React from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

//src
import LandingPage from "./Containers/LandingPage";
import NavigationBAr from "./Containers/NavigationBar";
import DashBoard from "./Containers/Admin/DashBoard";
import Settings from "./Containers/Admin/Settings";
import CreateOrEditUser from "./Containers/Admin/CreateOrEditUser";
import UsersLandingPage from "./Containers/Users/UsersLandingPage";
import PinChangeForm from "./Containers/Users/PinChangeForm";
import OverAllStats from "./Containers/Admin/OverAllStats";

//css
import "antd/dist/antd.css";
import "./App.css";

const App = props => {
  const Admin = props.admin || localStorage.getItem("Admin");
  const User = props.user || localStorage.getItem("User");
  return (
    <div className="App">
      <NavigationBAr />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route
            path="/punch-form-user-login"
            render={props => <LandingPage {...props} user={true} />}
          />
          {Admin && (
            <Switch>
              <Route
                path="/dashboard/users-availability"
                exact
                component={DashBoard}
              />
              <Route path="/dashboard/settings" exact component={Settings} />
              <Route
                path="/dashboard/settings/create-user"
                exact
                component={CreateOrEditUser}
              />
              <Route
                path="/dashboard/settings/edit-user/:id"
                exact
                component={CreateOrEditUser}
              />
              <Route
                path="/dashboard/users-overall-stats"
                exact
                component={OverAllStats}
              />
              <Route
                path="/dashboard/users-overall-stats/sorted-by=name"
                exact
                component={OverAllStats}
              />
              <Redirect to="/dashboard/users-availability" />
            </Switch>
          )}
          {User && (
            <Switch>
              <Route
                path="/users-landing-page"
                exact
                component={UsersLandingPage}
              />
              <Route path="/pin-change-form" exact component={PinChangeForm} />
            </Switch>
          )}
        </Switch>
      </BrowserRouter>
    </div>
  );
};

const mapStateToProps = ({ admin: { admin, user } }) => ({
  admin,
  user
});

export default connect(mapStateToProps, null)(App);
