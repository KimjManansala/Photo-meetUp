import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import Input from "../Components/input";
import TextFieldInput from "../Components/TextFieldInput";
import ImageUpload from "../Components/ImageUpload";
import PortFolioSec from "../Components/PortFolioSec";

class createUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      fileKey: null,
      profile: null,
      phone: "",
      phoneEr: false,
      about: "",
      aboutEr: false,
      numChar: 0,
      portImg: []
    };
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleAboutChange = this.handleAboutChange.bind(this);
    this.handlePortUpload = this.handlePortUpload.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
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
    console.log(event.target);
    this.setState({ file: event.target.files });
  }

  handlePhoneChange(event) {
    console.log(typeof event.target.value, /^\d*$/.test(event.target.value));
    if (/^\d*$/.test(event.target.value))
      if (event.target.value.length <= 10)
        this.setState({ phone: event.target.value, phoneEr: false });
      else this.setState({ phoneEr: true });
    else this.setState({ phoneEr: true });
  }

  handleAboutChange(event) {
    if (event.target.value.length <= 150) {
      this.setState({
        about: event.target.value,
        numChar: event.target.value.length,
        aboutEr: false
      });
    } else {
      this.setState({ aboutEr: true });
    }
  }
  deepCopy(x){
    return JSON.parse(JSON.stringify(x));
  }
  handlePortUpload(event) {
    console.log(this.state.portImg)
    let port = this.deepCopy(this.state.portImg)
    console.log(port)
    let images = event.target.files;
    for (let i = 0; i < images.length; i++) {
      let formData = new FormData();
      formData.append("file", images[i]);

      axios
        .post(`/api/portfolio/images`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(data => {
          port.push({ imgSrc: data.data.Location, imgkey: data.data.key });
          this.setState({ portImg: port });
        })
        .catch(console.error)
    }
    console.log(port)


    console.log(this.state.portImg)
  }

  handleRemove(key) {
    console.log(key);
  }

  componentDidUpdate() {
    console.log(this.state);
  }
  componentDidMount() {}

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
            type={"text"}
            name={"Phone Number"}
            placeholder={"Ex. 832123456"}
            value={this.state.phone}
            method={this.handlePhoneChange}
            pattern={"[0-9]*"}
          />
          <div className="about-container">
            <TextFieldInput
              name={"About me"}
              value
              value={this.state.about}
              error={this.state.aboutEr}
              method={this.handleAboutChange}
              placeholder={"Say something you want your clients to know"}
              charNum={this.state.numChar}
            />
          </div>
          <button type="submit">Save</button>

          <PortFolioSec
            uploadMethod={this.handlePortUpload}
            uploLabel={"Portfolio Images"}
            uploAccept={"image/*"}
            upLoType={"file"}
            images={this.state.portImg}
            remove={this.handleRemove}
          />
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
