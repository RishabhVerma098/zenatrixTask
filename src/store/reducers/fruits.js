const fruitsReducer = (state = null, action) => {
  switch (action.type) {
    case "FRUITS":
      return [...action.payload];
    case "ADD_FRUIT":
      let lower_state = state.map((v) => v.toLowerCase());
      let lower_word = action.payload.toLowerCase();

      if (action.payload !== null && lower_state.indexOf(lower_word) === -1) {
        return [...state, action.payload];
      } else {
        return state;
      }
    default:
      return state;
  }
};

export default fruitsReducer;
