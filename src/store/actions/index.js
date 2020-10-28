import { fruits } from "../../data";

export const getFruitsList = () => {
  return {
    type: "FRUITS",
    payload: fruits,
  };
};

export const addFruit = () => {
  //todo
  return;
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
