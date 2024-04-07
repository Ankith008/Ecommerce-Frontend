import setting from "./setting";
import {
  settingstore,
  settingstoredetail,
  settingstoreid,
  settingnoofproduct,
} from "./setting";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  setting,
  settingstore,
  settingstoreid,
  settingnoofproduct,
  settingstoredetail,
});

export default rootReducer;
