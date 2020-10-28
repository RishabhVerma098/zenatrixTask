import { fruits } from "../../data";

export const getFruitsList = () => {
  return {
    type: "FRUITS",
    payload: fruits,
  };
};

export const addFruit = (fruit) => {
  return {
    type: "ADD_FRUIT",
    payload: fruit,
  };
};

export const filteredSuggetion = (normal, htmlVal) => {
  return {
    type: "FILTER",
    payload: {
      normal: normal,
      htmlVal: htmlVal,
    },
  };
};

export const element_added = (word, state) => {
  return function (dispatch) {
    let lower_state = state.map((v) => v.toLowerCase());
    let lower_word = word.toLowerCase();
    if (word !== null && lower_state.indexOf(lower_word) === -1) {
      dispatch(addFruit(word));
      dispatch(append(true));
    } else {
      dispatch(append(false));
    }
  };
};

export const append = (x) => {
  return {
    type: "ADDED",
    payload: x,
  };
};
