import React, { useEffect, useState } from "react";
import image from "../images/search.svg";
import {
  filteredSuggetion,
  getFruitsList,
  element_added,
} from "../store/actions";
import KeyData from "./keydata";
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
  const [found, setFound] = useState(true);

  const onChangeOptions = (e) => {
    const userInput = e.target.value;
    let suggestions = [];

    if (userInput.length > 0) {
      const regex = new RegExp(`^${userInput}`, `i`);
      suggestions = fruits.sort().filter((v) => regex.test(v));
    }
    setText(userInput);

    if (suggestions.length === 0) {
      setFound(false);
    } else {
      setFound(true);
    }

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
                <li key={index}>
                  <button
                    onClick={onClick}
                    dangerouslySetInnerHTML={{ __html: val }}
                    style={{ backgroundColor: "#ebeaf2" }}
                  ></button>
                </li>
              );
            }

            return (
              <li key={index}>
                <button
                  onClick={onClick}
                  dangerouslySetInnerHTML={{ __html: val }}
                ></button>
              </li>
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
      // dispatch(filteredSuggetion([], []));
      // setText("");
      // setAcativeOptions(0);
      clearText();
    }
    //LEFT SHIFT
    else if (e.keyCode === 16) {
      // setText("");
      // dispatch(element_added(text, fruits));
      addText();
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

  const clearText = () => {
    dispatch(filteredSuggetion([], []));
    setText("");
    setAcativeOptions(0);
  };
  const addText = () => {
    setText("");
    dispatch(element_added(text, fruits));
  };

  const [see, setSee] = useState(true);

  useEffect(() => {
    setSee(true);
    setTimeout(() => {
      setSee(false);
    }, 1500);
  }, [added]);

  return (
    <div className="search-bar">
      <div className="search">
        <img src={image} alt=""></img>
        <input
          type="text"
          value={text}
          onChange={onChangeOptions}
          onKeyDown={onKey}
        ></input>
        <div className="clear-add">
          <button onClick={clearText} className="clear">
            Clear
          </button>
          <button onClick={addText}>Add</button>
        </div>
      </div>
      <div className="message">
        {added === null ? null : added ? (
          see ? (
            <h4>Element added</h4>
          ) : null
        ) : see ? (
          <h4>Element already present</h4>
        ) : null}
      </div>
      {found ? null : <h4 className="found">Nothing found </h4>}
      {filteredOptions.normal.length === 0 ? <KeyData /> : null}
      {renderOptions()}
    </div>
  );
}

export default SearchBar;
