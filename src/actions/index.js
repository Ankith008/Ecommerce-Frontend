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
export const settingstoredetail = (data) => {
  return {
    type: "SETTING_STORE_DETAIL",
    payload: data,
  };
};

export const noofproduct = (data) => {
  return {
    type: "NO_OF_PRODUCT",
    payload: data,
  };
};
