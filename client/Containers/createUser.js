import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";

class createUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    };
  }
  handleChange(name, event) {
    this.setState({
      [name]: event.target.value
    });
  }

  submitFile(event){
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', this.state.file[0]);
    axios.post(`/api/profile/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      console.log(response)
      // handle your response;
    }).catch(error => {
      console.log(error)
    });
  }

  handleFileUpload(event){
    this.setState({file: event.target.files});
  }
  componentDidUpdate() {
    console.log(this.state);
  }

  render() {
    return (
      <div>
        Hello
        <form onSubmit={(evt)=>{this.submitFile(evt)}}>
          <input
            label="upload file"
            type="file"
            accept='image/*'
            onChange={(evt)=>{this.handleFileUpload(evt)}}
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
