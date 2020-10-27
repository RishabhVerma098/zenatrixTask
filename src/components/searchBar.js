import React, { useState } from "react";
import { places } from "../data";
import "./searchBar.css";
function SearchBar() {
  const [activeOption, setAcativeOptions] = useState(0);

  const [text, setText] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);

  const onChangeOptions = (e) => {
    const userInput = e.target.value;
    let suggestions = [];

    if (userInput.length > 0) {
      const regex = new RegExp(`^${userInput}`, `i`);
      suggestions = places.sort().filter((v) => regex.test(v));
    }
    setText(userInput);
    setFilteredOptions([...suggestions]);
    setAcativeOptions(0);
  };

  const onClick = (e) => {
    setFilteredOptions([]);

    setText(e.target.innerText);
    setAcativeOptions(0);
  };

  const renderOptions = () => {
    if (filteredOptions.length > 0) {
      return (
        <ul className="suggestions">
          {filteredOptions.map((val, index) => {
            if (activeOption === index) {
              return (
                <li
                  onClick={onClick}
                  key={index}
                  style={{ backgroundColor: "#ebeaf2" }}
                >
                  {val}
                </li>
              );
            }

            return (
              <li onClick={onClick} key={index}>
                {val}
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
      setFilteredOptions([]);
      setText(filteredOptions[activeOption]);
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
      if (activeOption === filteredOptions.length - 1) {
        return;
      }
      setAcativeOptions(activeOption + 1);
    }
    //ESC
    else if (e.keyCode === 27) {
      setFilteredOptions([]);
      setText("");
      setAcativeOptions(0);
    } else if (e.keyCode === 16) {
      if (places.indexOf(text) === -1) {
        //add element to array
      }
    }
  };

  return (
    <div className="search-bar">
      <div className="search">
        <input
          type="text"
          placeholder="Type here.."
          value={text}
          onChange={onChangeOptions}
          onKeyDown={onKey}
        ></input>
      </div>
      {filteredOptions.length === 0 ? (
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
