import React, { useState } from "react";
import { places } from "../data";
import "./searchBar.css";
function SearchBar() {
  const [activeOption, setAcativeOptions] = useState(0);

  const [text, setText] = useState("");
  const [filteredOptions, setFilteredOptions] = useState({
    normal: [],
    htmlVal: [],
  });

  const onChangeOptions = (e) => {
    const userInput = e.target.value;
    let suggestions = [];

    if (userInput.length > 0) {
      const regex = new RegExp(`^${userInput}`, `i`);
      suggestions = places.sort().filter((v) => regex.test(v));
    }
    setText(userInput);
    let x = highlight(suggestions, userInput);
    setFilteredOptions({ normal: suggestions, htmlVal: x });
    setAcativeOptions(0);
  };

  //TODO:
  const onClick = (e) => {
    setFilteredOptions({ normal: [], htmlVal: [] });

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
      setFilteredOptions({ normal: [], htmlVal: [] });
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
      setFilteredOptions({ normal: [], htmlVal: [] });
      setText("");
      setAcativeOptions(0);
    } else if (e.keyCode === 16) {
      if (places.indexOf(text) === -1) {
        //add element to array
      }
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
    console.log(temp);
    return temp;
  };

  return (
    <div className="search-bar">
      <div className="search">
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
      {/* <button style={{ height: "20px" }} onClick={() => highlight()}>
        Press
      </button> */}
    </div>
  );
}

export default SearchBar;
