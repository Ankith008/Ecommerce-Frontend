import setting from "./setting";
import { settingstore } from "./setting";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  setting,
  settingstore,
});

export default rootReducer;
