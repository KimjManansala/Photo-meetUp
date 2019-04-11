import React from "react";

import Tab from "./Tab";

class Tabs extends React.Component {
  

  render() {
    const { method, activeTab } = this.props;

    return (
      <div className="tabs is-boxed is-medium">
        <ul>
          <Tab
            method={() => {
              method(0);
            }}
            show={activeTab === 0}
            label={"Login"}
          />
          <Tab
            method={() => {
              method(1);
            }}
            show={activeTab === 1}
            label={"Register"}
          />
        
        </ul>
      </div>
    );
  }
}

export default Tabs;