import { combineReducers } from "redux";
import alert from "./alert/alertReducer";
import auth from "./auth/authReducer";

export default combineReducers({
  auth,
  alert,
});
