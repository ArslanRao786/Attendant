//libs
import React, { useEffect, Fragment } from "react";
import { Menu, Dropdown, Icon, Button } from "antd";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

//src
import { getOverAllStats } from "../../../utils";
import { allUsersRecords } from "../../../redux/actions/adminActions";

//css
import "./OverAllStats.css";

const OverAllStats = props => {
  const { users, allUsersRecords, allRecords } = props;

  useEffect(() => {
    allUsersRecords();
  }, []);

  const dispatch = useDispatch();
  const history = useHistory();

  // const usersData = users.sort((a, b) => {
  //   return a.firstname < b.firstname ? -1 : 0;
  // });

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

  const sortBy = (
    <Menu>
      <Menu.Item>
        <a
          onClick={() => {
            users.sort((a, b) => {
              return a.firstname < b.firstname ? -1 : 0;
            });
            history.push("/dashboard/users-overall-stats/sorted-by=name");
          }}
        >
          Name
        </a>
      </Menu.Item>
    </Menu>
  );

  function callback(key) {
    console.log(key);
  }

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
            <Dropdown overlay={sortBy}>
              <a className="ant-dropdown-link" href="#">
                Sort By <Icon type="down" />
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
          <Fragment>
            <div
              style={{ backgroundColor: "#def5ec" }}
              className="over-all-stats-list"
            >
              <h3 style={{ marginLeft: "100px" }}>Name</h3>
              <h3>Total Working Hours</h3>
              <h3>Average Working Hours</h3>
            </div>

            {users.map(user => {
              const { firstname, lastname, id } = user;
              const stats = allRecords.filter(user => user.fk == id);
              const userRecords = getOverAllStats(stats);
              return (
                <div style={{ marginTop: 0 }} className="over-all-stats-list">
                  <p style={{ marginLeft: "100px" }}>
                    {firstname} {lastname}
                  </p>
                  <p>{userRecords.totalWorkingHours}</p>
                  <p>{userRecords.averageWorkingHours}</p>
                </div>
              );
            })}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ admin: { users, allRecords } }) => ({
  users,
  allRecords
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      allUsersRecords
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(OverAllStats);
