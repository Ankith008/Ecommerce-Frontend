import setting from "./setting";
import { settingstore, settingstoredetail, settingstoreid } from "./setting";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  setting,
  settingstore,
  settingstoreid,
  settingstoredetail,
});

export default rootReducer;
