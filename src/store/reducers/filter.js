const initial = {
  normal: [],
  htmlVal: [],
};
const filterReducer = (state = initial, action) => {
  switch (action.type) {
    case "FILTER":
      return { ...action.payload };
    default:
      return state;
  }
};

export default filterReducer;
