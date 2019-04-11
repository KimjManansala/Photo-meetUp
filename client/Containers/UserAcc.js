import React, { Component } from "react";
import { connect } from "react-redux";
import Tabs from "../Components/Tabs";
import AccountSec from "../Components/AccountSec";
class UserAcc extends Component {
  constructor(props) {
    super(props);

    // this.props.
    this.state = {
      activeTab: 0
    };
    this.manageTab = this.manageTab.bind(this);
  }
  manageTab(newTab) {
    this.setState({ activeTab: newTab });
  }
  render() {
    return (
      <div>
        <Tabs method={this.manageTab} activeTab={this.state.activeTab} />
        <AccountSec activeTab={this.state.activeTab} />
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserAcc);
