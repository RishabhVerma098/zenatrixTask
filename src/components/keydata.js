import React from "react";

function KeyData() {
  return (
    <div className="des">
      <p>
        Use <span className="key">ENTER</span> to select element
      </p>
      <p>
        Use <span className="key">UP</span> and{" "}
        <span className="key">DOWN</span> key to navigate between suggestions
      </p>
      <p>
        Use <span className="key">LEFT SHIFT</span> to add items
      </p>
      <p>
        Use <span className="key">ESC</span> to Clear
      </p>
    </div>
  );
}

export default KeyData;
