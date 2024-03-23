export const settingAuth = (data) => {
  return {
    type: "SETTING_AUTH",
    payload: data,
  };
};

export const settingstore = (data) => {
  return {
    type: "SETTING_STORE",
    payload: data,
  };
};

export const settingstoreid = (data) => {
  return {
    type: "SETTING_STORE_ID",
    payload: data,
  };
};
