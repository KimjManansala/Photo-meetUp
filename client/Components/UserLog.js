import React, { Component } from "react";

import { connect } from "react-redux";
import Input from "./input";

class UserLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      userEr: false,
      password: "",
      passwordEr: false
    };
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
  }

  handleUserChange(evt) {
    this.setState({ user: evt.target.value, userEr: false });
  }
  handlePassChange(evt) {
    this.setState({ password: evt.target.value, passwordEr: false });
  }
  checkIfEmpty() {
    if (!this.state.user) this.setState({ userEr: true });
    if (!this.state.password) this.setState({ passwordEr: true });
    if (this.state.user && this.state.password) return true;
  }

  handleSubmit(evt) {
    evt.preventDefault();
    if (this.checkIfEmpty()) {
      console.log("Will submit");
    }
  }

  render() {
    return (
      <div className="login-container">
        <form
          className="login-form-container"
          onSubmit={evt => {
            this.handleSubmit(evt);
          }}
        >
          <div className="control">
            <Input
              error={this.state.userEr}
              type={"text"}
              name={"Username"}
              value={this.state.user}
              method={this.handleUserChange}
            />
          </div>

          <div className="control">
            <Input
              error={this.state.passwordEr}
              type={"password"}
              name={"Password"}
              value={this.state.password}
              method={this.handlePassChange}
            />
          </div>
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link">Submit</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserLog);
