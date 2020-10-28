import React, { useEffect, useState } from "react";
import image from "../images/search.svg";
import {
  filteredSuggetion,
  getFruitsList,
  element_added,
} from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import "./searchBar.css";

function SearchBar() {
  const dispatch = useDispatch();

  //for list element coloring using keys
  const [activeOption, setAcativeOptions] = useState(0);
  //input
  const [text, setText] = useState("");

  //get all the fruits
  useEffect(() => {
    dispatch(getFruitsList());
  }, []);

  const fruits = useSelector((state) => state.fruitsReducer);
  const filteredOptions = useSelector((state) => state.filterReducer);
  const added = useSelector((state) => state.addedReducer);

  const onChangeOptions = (e) => {
    const userInput = e.target.value;
    let suggestions = [];

    if (userInput.length > 0) {
      const regex = new RegExp(`^${userInput}`, `i`);
      suggestions = fruits.sort().filter((v) => regex.test(v));
    }
    setText(userInput);
    let x = highlight(suggestions, userInput); //utily function
    dispatch(filteredSuggetion(suggestions, x));
    setAcativeOptions(0);
  };

  const onClick = (e) => {
    dispatch(filteredSuggetion([], []));
    setText(e.target.innerText);
    setAcativeOptions(0);
  };

  const renderOptions = () => {
    if (filteredOptions.normal.length > 0) {
      return (
        <ul className="suggestions">
          {filteredOptions.htmlVal.map((val, index) => {
            if (activeOption === index) {
              return (
                <li
                  onClick={() => onClick(filteredOptions.normal[index])}
                  key={index}
                  style={{ backgroundColor: "#ebeaf2" }}
                  dangerouslySetInnerHTML={{ __html: val }}
                ></li>
              );
            }

            return (
              <li
                onClick={() => onClick(filteredOptions.normal[index])}
                key={index}
                dangerouslySetInnerHTML={{ __html: val }}
              ></li>
            );
          })}
        </ul>
      );
    } else {
      return null;
    }
  };

  const onKey = (e) => {
    //Enter
    if (e.keyCode === 13) {
      setAcativeOptions(0);
      dispatch(filteredSuggetion([], []));
      setText(filteredOptions.normal[activeOption]);
    }
    //Up
    else if (e.keyCode === 38) {
      if (activeOption === 0) {
        return;
      }
      setAcativeOptions(activeOption - 1);
    }
    //Down
    else if (e.keyCode === 40) {
      if (activeOption === filteredOptions.normal.length - 1) {
        return;
      }
      setAcativeOptions(activeOption + 1);
    }
    //ESC
    else if (e.keyCode === 27) {
      dispatch(filteredSuggetion([], []));
      setText("");
      setAcativeOptions(0);
    } else if (e.keyCode === 16) {
      setText("");
      dispatch(element_added(text, fruits));
    }
  };

  const highlight = (s, input) => {
    let data = s;
    let str_data = "";

    data.forEach((i) => {
      str_data = str_data + i + ",";
    });

    const term = input;
    let results = str_data;

    results = results.replace(
      new RegExp(term, "gi"),
      (match) =>
        `<span style="border-bottom:4px solid #dd7c7c; padding-bottom:2px;">${match}</span>`
    );

    let temp = results.split(",");
    temp.pop();
    return temp;
  };

  return (
    <div className="search-bar">
      {added === null ? null : added ? (
        <h5>element added</h5>
      ) : (
        <h6>element not added</h6>
      )}
      <div className="search">
        <img src={image} alt=""></img>
        <input
          type="text"
          value={text}
          onChange={onChangeOptions}
          onKeyDown={onKey}
        ></input>
      </div>
      {filteredOptions.normal.length === 0 ? (
        <div className="des">
          <p>
            Use <span className="key">Enter</span> to select element
          </p>
          <p>
            Use <span className="key">UP</span> and{" "}
            <span className="key">DOWN</span> key to navigate between
            suggestions
          </p>
          <p>
            Use <span className="key">SHIFT</span> to add items
          </p>
          <p>
            Use <span className="key">ESC</span> to Clear
          </p>
        </div>
      ) : null}
      {renderOptions()}
    </div>
  );
}

export default SearchBar;
