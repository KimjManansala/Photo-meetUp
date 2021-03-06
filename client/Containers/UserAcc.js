import React, { Component } from "react";
import { connect } from "react-redux";
import Tabs from "../Components/Tabs";
import AccountSec from "../Components/AccountSec";
// import history from "../history";
class UserAcc extends Component {
  constructor(props) {
    super(props);

    // this.props.
    this.state = {
      activeTab: 0
    };
    this.manageTab = this.manageTab.bind(this);
    this.addUserToStore = this.addUserToStore.bind(this)
  }
  manageTab(newTab) {
    this.setState({ activeTab: newTab });
  }

  addUserToStore(user){

    this.props.changeUser(user)
    if(this.props.history)
    this.props.history.push('/createUserInfo')

  }

  render() {
    return (
      <div className='account-container'>
        <Tabs method={this.manageTab} activeTab={this.state.activeTab} />
        <AccountSec activeTab={this.state.activeTab} method={this.addUserToStore}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    user: state.userReducer
});

const mapDispatchToProps = dispatch => ({
    changeUser: (user) => {dispatch({type:'UPDATE_USER', value: user})}
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserAcc);
