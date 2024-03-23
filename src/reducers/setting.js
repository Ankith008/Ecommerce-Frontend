const auth = "";
const stores = [];
const storeid = "";

const setting = (state = auth, action) => {
  switch (action.type) {
    case "SETTING_AUTH":
      return (state = action.payload);
    default:
      return state;
  }
};

export const settingstore = (state = stores, action) => {
  switch (action.type) {
    case "SETTING_STORE":
      return (state = action.payload);
    default:
      return state;
  }
};

export const settingstoreid = (state = storeid, action) => {
  switch (action.type) {
    case "SETTING_STORE_ID":
      return (state = action.payload);
    default:
      return state;
  }
};

export default setting;
