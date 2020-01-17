const initialState = {
  adminData: [],
  error: null,
  users: [],
  userData: [],
  allRecords: [],
  admin: null,
  user: null
};

const adminReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case "VERIFY_ADMIN_RESPONSE":
      return { ...state, adminData: payload };
    case "VERIFY_ADMIN_ERROR":
      return { ...state, error: payload };

    case "VERIFY_USER_RESPONSE":
      return { ...state, userData: payload };
    case "VERIFY_USER_ERROR":
      return { ...state, error: payload };

    case "GET_USERS_RESPONSE":
      return { ...state, users: payload };
    case "GET_USERS_ERROR":
      return { ...state, error: payload };

    case "ADD_USER_RESPONSE":
      const updatedUsers = [...state.users, payload];
      return { ...state, users: updatedUsers };
    case "ADD_USER_ERROR":
      return { ...state, error: payload };

    case "DELETE_USER_RESPONSE":
      const { id } = payload;
      const updatedUsersData = state.users.filter(user => user.id != id);
      return {
        ...state,
        users: updatedUsersData
      };
    case "DELETE_USER_ERROR":
      return { ...state, error: payload };

    case "UPDATE_USER_RESPONSE":
      const filteredUsers = state.users.filter(
        user => user.id != payload[0].id
      );
      const updatedUser = [...filteredUsers, payload[0]];
      return { ...state, users: updatedUser };
    case "UPDATE_USER_ERROR":
      return { ...state, error: payload };

    case "GET_ADMIN_RESPONSE":
      return { ...state, adminData: payload };
    case "GET_ADMIN_ERROR":
      return { ...state, error: payload };

    case "GET_ALL_USERS_RECORDS_RESPONSE":
      return { ...state, allRecords: payload };
    case "GET_ALL_USERS_RECORDS_ERROR":
      return { ...state, error: payload };

    case "GET_SINGLE_USER_DATA_RESPONSE":
      return { ...state, userData: payload };
    case "GET_SINGLE_USER_DATA_ERROR":
      return { ...state, error: payload };

    case "OFFICE_TIMING_RESPONSE":
      return alert("Office Timings Changed");
    case "OFFICE_TIMING_ERROR":
      return { ...state, error: payload };

    case "MINIMUM_WORKING_HOURS_RESPONSE":
      return alert("Minimum Working Hours Changed");
    case "MINIMUM_WORKING_HOURS_ERROR":
      return { ...state, error: payload };

    case "ADMIN":
      return { ...state, admin: payload };

    case "USER":
      return { ...state, user: payload };

    default:
      return { ...state };
  }
};

export default adminReducer;
