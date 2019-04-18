import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import Input from "../Components/input";
import TextFieldInput from "../Components/TextFieldInput";

class createUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      profile: null,
      phone: "",
      phoneEr: false,
      about: "",
      aboutEr: false
    };
    this.handlePhoneChange = this.handlePhoneChange.bind(this)
  }

  submitFile(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", this.state.file[0]);
    axios
      .post(`/api/profile/photo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        this.setState({ profile: response.data.Location });

        // handle your response;
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleFileUpload(event) {
    this.setState({ file: event.target.files });
  }

  handlePhoneChange(event){
    console.log(typeof event.target.value,  /^\d*$/.test(event.target.value))
    if( /^\d*$/.test(event.target.value))
      if(event.target.value.length <= 10)
        this.setState({phone: event.target.value, phoneEr:false})
      else
        this.setState({phoneEr: true})
    else
    this.setState({phoneEr: true})
  }




  componentDidUpdate() {
    console.log(this.state)
  }
  componentDidMount() {
    console.log(this.handleChange);
  }

  render() {
    return (
      <div>

        {this.state.profile ? (
          <div className="profile-input">
            <img src={this.state.profile} />
          </div>
        ) : null}
        <form
          onSubmit={evt => {
            this.submitFile(evt);
          }}
        >
          <div className="field">
            <label className="label">{name}</label>
            <div className="control">
              <input
                label="upload file"
                type="file"
                accept="image/*"
                onChange={evt => {
                  this.handleFileUpload(evt);
                }}
              />
            </div>
          </div>

          <Input
          error={this.state.phoneEr}
          type={'text'}
          name={'Phone Number'}
          placeholder={'Ex. 832123456'}
          value={this.state.phone}
          method={this.handlePhoneChange}
          pattern={"[0-9]*"}
          />
          <TextFieldInput
          />


          <button type="submit">Send</button>
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
)(createUser);
