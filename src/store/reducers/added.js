const addedReducer = (state = null, action) => {
  switch (action.type) {
    case "ADDED":
      if (action.payload) {
        return true;
      } else {
        return false;
      }
    default:
      return state;
  }
};

export default addedReducer;
