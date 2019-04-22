import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import Input from "../Components/input";
import TextFieldInput from "../Components/TextFieldInput";
import ImageUpload from "../Components/ImageUpload";
import PortFolioSec from "../Components/PortFolioSec";
import PleaseLogin from "../Components/PleaseLogin";

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
      portImg: [],
      finishLoadng: false
    };
    this.checkLoging();
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleAboutChange = this.handleAboutChange.bind(this);
    this.handlePortUpload = this.handlePortUpload.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }
  checkLoging() {
    axios.get("/checklogged").then(data => {
      console.log(data);
      if (data.data.user) {
        this.props.changeUser(data.data.user);
      } else {
        console.log("none");
      }
      this.setState({ finishLoadng: true });
    });
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
    console.log(event.target.files[0])
    let formData = new FormData();

    formData.append('file', event.target.files[0])
    axios.post('/api/profile/image', formData,{
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then(console.log)
    .catch(console.log)
    // console.log(event.target.files)
    // console.log(event.target.files)
    // this.setState({ file: event.target.files[0]});
    // console.log(this.state.file)
  }

  deepCopy(x) {
    return JSON.parse(JSON.stringify(x));
  }
  handlePortUpload(event) {

    let port = this.deepCopy(this.state.portImg);

    let images = event.target.files;
    for (let i = 0; i < images.length; i++) {
      let formData = new FormData();
      formData.append("file", images[i]);
      formData.append("user", "kimj");
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
        .catch(console.error);
    }
    console.log(port);

    console.log(this.state.portImg);
  }




  handlePhoneChange(event) {
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
  

  handleRemove(key) {
    console.log(key);
  }

  componentDidUpdate() {}
  componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        {this.state.finishLoadng ? (
          <React.Fragment>
            {this.props.user.name ? (
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
                 

                  <ImageUpload
                    label={"Profile Picture"}
                    accept={"image/*"}
                    type={"file"}
                    method={this.handleFileUpload}
                  />

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
                      placeholder={
                        "Say something you want your clients to know"
                      }
                      charNum={this.state.numChar}
                    />
                  </div>
                  <h2>Please choose your best 10 photos</h2>
                  <div className="portfolio-sec">
                    <PortFolioSec
                      uploadMethod={this.handlePortUpload}
                      uploLabel={"Portfolio Images"}
                      uploAccept={"image/*"}
                      upLoType={"file"}
                      images={this.state.portImg}
                      remove={this.handleRemove}
                    />
                  </div>
                  <button type="submit">Save</button>
                </form>
              </div>
            ) : (
              <PleaseLogin />
            )}
          </React.Fragment>
        ) : null}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userReducer
});

const mapDispatchToProps = dispatch => ({
  changeUser: user => {
    dispatch({ type: "UPDATE_USER", value: user });
  },
  removeUser: () => {
    dispatch({ type: "REMOVE_USER" });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createUser);
