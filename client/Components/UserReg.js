import React, { Component } from "react";

import Input from "./input";
class UserReg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      userEr: false,
      password: "",
      passwordEr: false,
      email: "",
      emailEr: false,
      fName: "",
      fNameEr: false,
      lName: "",
      lNameEr: false
    };
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlefName = this.handlefName.bind(this);
    this.handlelName = this.handlelName.bind(this);
  }

  handleUserChange(evt) {
    this.setState({ user: evt.target.value, userEr: false });
  }
  handlePassChange(evt) {
    this.setState({ password: evt.target.value, userEr: false });
  }
  handleEmailChange(evt) {
    this.setState({ email: evt.target.value, emailEr: false });
  }
  handlefName(evt) {
    this.setState({ fName: evt.target.value, fNameEr: false });
  }
  handlelName(evt) {
    this.setState({lName: evt.target.value, lNameEr: false})
  }
  checkIfEmpty() {
    if (!this.state.user) this.setState({ userEr: true });
    if (!this.state.password) this.setState({ passwordEr: true });
    if (!this.state.email) this.setState({ emailEr: true });
    if (!this.state.fName) this.setState({ fNameEr: true });
    if (!this.state.lName) this.setState({ lNameEr: true });
    if (
      this.state.user &&
      this.state.password &&
      this.state.email &&
      this.state.fName &&
      this.state.lName
    )
      return true;
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
          <div className="control">
            <Input
              error={this.state.emailEr}
              type={"email"}
              name={"Email"}
              value={this.state.email}
              method={this.handleEmailChange}
            />
          </div>

          <div className="control">
            <Input
              error={this.state.fNameEr}
              type={"text"}
              name={"First Name"}
              value={this.state.fName}
              method={this.handlefName}
            />
          </div>
          <div className="control">
            <Input
              error={this.state.lNameEr}
              type={"text"}
              name={"Last Name"}
              value={this.state.lName}
              method={this.handlelName}
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

export default UserReg;
