import { combineReducers } from "redux";
import adminReducer from "./adminReducer";
import userReducer from "./userReducer";

const allReducers = combineReducers({
  admin: adminReducer,
  user: userReducer
});

export default allReducers;
