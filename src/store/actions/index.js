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
