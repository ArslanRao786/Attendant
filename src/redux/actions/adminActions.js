import { fetchAction } from "../../utils";

export const verifyAdmin = (pincode, employeeid) => {
  return fetchAction({
    type: "VERIFY_ADMIN",
    endpoint: `http://localhost:4000/admin/${pincode}/${employeeid}`,
    verb: "GET"
  });
};

export const getUsers = () => {
  return fetchAction({
    type: "GET_USERS",
    endpoint: `http://localhost:4000/all-users`,
    verb: "GET"
  });
};

export const addUser = userData => {
  const { firstName, lastName, role, department, email } = userData;
  return fetchAction({
    type: "ADD_USER",
    endpoint: `http://localhost:4000/add-user/${firstName}/${lastName}/${role}/${department}/${email}`,
    verb: "POST"
  });
};

export const deleteUser = id => {
  return fetchAction({
    type: "DELETE_USER",
    endpoint: `http://localhost:4000/delete-user/${id}`,
    verb: "DELETE"
  });
};

export const verifyUser = (pincode, employeeid) => {
  return fetchAction({
    type: "VERIFY_USER",
    endpoint: `http://localhost:4000/user/${pincode}/${employeeid}`,
    verb: "GET"
  });
};

export const updateUser = userData => {
  const { firstName, lastName, role, department, email, id } = userData;
  return fetchAction({
    type: "UPDATE_USER",
    endpoint: `http://localhost:4000/update-user/${firstName}/${lastName}/${role}/${department}/${email}/${id}`,
    verb: "PUT"
  });
};

export const getAdmin = name => {
  return fetchAction({
    type: "GET_ADMIN",
    endpoint: `http://localhost:4000/get-admin/${name}`,
    verb: "GET"
  });
};

export const allUsersRecords = () => {
  return fetchAction({
    type: "GET_ALL_USERS_RECORDS",
    endpoint: `http://localhost:4000/all-users-records`,
    verb: "GET"
  });
};

export const getUser = name => {
  return fetchAction({
    type: "GET_SINGLE_USER_DATA",
    endpoint: `http://localhost:4000/single-user/${name}`,
    verb: "GET"
  });
};

export const changeOfficeTiming = (start, end) => {
  return fetchAction({
    type: "OFFICE_TIMING",
    endpoint: `http://localhost:4000/change-office-timing/${start}/${end}`,
    verb: "PUT"
  });
};

export const changeMinimumWorkingHours = time => {
  return fetchAction({
    type: "MINIMUM_WORKING_HOURS",
    endpoint: `http://localhost:4000/change-minimum-working-hours/${time}`,
    verb: "PUT"
  });
};
