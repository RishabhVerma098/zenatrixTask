const fruitsReducer = (state = null, action) => {
  switch (action.type) {
    case "FRUITS":
      return [...action.payload];
    default:
      return state;
  }
};

export default fruitsReducer;
