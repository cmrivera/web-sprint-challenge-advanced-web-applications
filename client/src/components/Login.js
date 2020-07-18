import React, { Component } from "react";
import axios from "axios";

//create class component for login to create credentials state

class Login extends Component {
  state = {
    credentials: {
      username: "Lambda School",
      password: "i<3Lambd4",
    },
  };

  //component did mOunt to clear storage when needed and to display if component mounted
  componentDidMount() {
    console.log("component did mount");
    localStorage.clear();
  }

  //handlesubmit to post credentials given onSubmit
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login", this.state.credentials)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.payload);
        this.props.history.push("/BubblePage");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //handleChange to set credential state when given

  handleChange = (e) => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value,
      },
    });
  };
  render() {
    return (
      <div>
        <h1>Welcome to the Bubble App Login Page!</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="username"
            value={this.state.credentials.username}
            onChange={this.handleChange}
            placeholder="Username"
          />
          <input
            type="text"
            name="username"
            value={this.state.credentials.password}
            onChange={this.handleChange}
            placeholder="Pssword"
          />
          <button> Login </button>
        </form>
      </div>
    );
  }
}
export default Login;
