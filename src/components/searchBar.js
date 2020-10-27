import React from "react";
import "./searchBar.css";
function SearchBar() {
  return (
    <div className="search-bar">
      <div className="search">
        <input type="text" placeholder="Type here.." value=""></input>
      </div>
      <div className="des">
        <p>use Enter to add items</p>
        <p>Use UP and DOWN key to navigate between suggestions</p>
      </div>
    </div>
  );
}

export default SearchBar;
