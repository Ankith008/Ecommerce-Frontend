import setting from "./setting";
import { settingstore } from "./setting";
import { combineReducers } from "redux";
import { settingstoreid } from "./setting";

const rootReducer = combineReducers({
  setting,
  settingstore,
  settingstoreid,
});

export default rootReducer;
