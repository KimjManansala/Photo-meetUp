import React, { Component } from "react";
import axios from "axios";
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

  handleError(type){

    this.setState({[type]: true})

  }


  handleSubmit(evt) {
    evt.preventDefault();
    if (this.checkIfEmpty()) {
      axios.get('/api/log', {
        params: { user: this.state.user, password: this.state.password }
      })
      .then(data=>{
        console.log('Hello', data.data)
        if(!data.data.success){
          if(data.data.type === 'username'){
            console.log('HELO2', )
            this.handleError('userEr')
          }else if(data.data.type === 'password'){
            this.handleError('passwordEr')
          }
        }else{
          this.props.method(data.data.user)
        }
      })
    }
  }
  componentDidMount(){
    console.log('THIS WLL BE PROPS', this.props.method)
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

export default UserLog;
