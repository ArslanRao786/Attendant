//libs
import React, { Fragment } from "react";
import { Menu, Dropdown, Icon, Tabs, Button } from "antd";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

//src
import { getUsers } from "../../../redux/actions/adminActions";
import ListView from "../../../Components/ListView";

//css
import "./DashBoard.css";

const DashBoard = props => {
  const { users } = props;
  const history = useHistory();
  const dispatch = useDispatch();

  const { TabPane } = Tabs;
  const availableUsers = users.filter(user => user.status === "Available");
  const unAvailableUsers = users.filter(user => user.status === "Un Available");
  const onLeaveUsers = users.filter(user => user.status === "On Leave");

  const menu = (
    <Menu>
      <Menu.Item>
        <a onClick={() => history.push("/dashboard/users-availability")}>
          Today's Availablibility
        </a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={() => history.push("/dashboard/users-overall-stats")}>
          OverAll Stats
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Fragment>
      <div className="dashboard-container">
        <div className="layout">
          <div className="dashboard-widgets">
            <Dropdown overlay={menu}>
              <a className="ant-dropdown-link" href="#">
                Dropdown <Icon type="down" />
              </a>
            </Dropdown>
            <Button
              onClick={() => history.push("/dashboard/settings")}
              type="primary"
              shape="circle"
              icon="setting"
            />
            <Button
              onClick={() => (
                dispatch({ type: "VERIFY_ADMIN_RESPONSE", payload: [] }),
                dispatch({ type: "GET_USERS_RESPONSE", payload: [] }),
                localStorage.clear(),
                history.push("/")
              )}
              type="primary"
              shape="circle"
              icon="logout"
            />
          </div>
          <div className="dashboard-card-container">
            <Tabs type="card">
              <TabPane tab="Available" key="1">
                <ListView users={availableUsers} actionItem={false} />
              </TabPane>
              <TabPane tab="Not Available" key="2">
                <ListView users={unAvailableUsers} actionItem={false} />
              </TabPane>
              <TabPane tab="On Leave" key="3">
                <ListView users={onLeaveUsers} actionItem={false} />
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ admin: { users } }) => ({
  users
});

const actionCreators = {
  getUsers
};

export default connect(mapStateToProps, actionCreators)(DashBoard);
