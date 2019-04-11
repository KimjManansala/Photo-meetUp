
import React from "react";

const Tab = ({ method, show, label }) => {
  return (
    <React.Fragment>
      <li className={show ? "is-active" : null} onClick={() => method()}>
        <a>
          {label}
        </a>
      </li>
    </React.Fragment>
  );
};

export default Tab;