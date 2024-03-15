const auth = "";

const setting = (state = auth, action) => {
  switch (action.type) {
    case "SETTING_AUTH":
      return (state = action.payload);
    default:
      return state;
  }
};

export default setting;
