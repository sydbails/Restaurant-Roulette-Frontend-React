import React, { Component } from "react";
import Signup from "./Signup";
import { Link } from "react-router-dom";
import { Form, Checkbox, Button } from "semantic-ui-react";

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      user: ""
    };
  }

  handleChange = event => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleLogin = event => {
    event.preventDefault();
    fetch("https://restaurant-roulette-backend.herokuapp.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        user: {
          email: this.state.email,
          password: this.state.password
        }
      })
    })
      .then(resp => resp.json())
      .then(resp => {
        if (resp === null) {
          alert("Incorrect username or password - please try again!");
        } else {
          this.setState({ user: resp.user });
          localStorage.setItem("user_id", resp.user.id);
          localStorage.setItem("jwt", resp.jwt);
          this.getUserCuisine();
        }
      })
      .then(resp => {
        console.log("User data received, routing to home");
        this.props.history.push("/home");
      });
  };

  getUserCuisine = () => {
    fetch(
      `https://restaurant-roulette-backend.herokuapp.com/api/users/${this.state.user.id}`
    )
      .then(resp => resp.json())
      .then(user => {
        this.setState({ user: user });
        this.props.userLogIn(user);
      });
  };

  handleClick = () => {
    this.props.history.push("/signup");
  };

  render() {
    return (
      <>
        <div className="pb-2 mt-4 mb-2" align="center">
          <h1 className="header" style={{ fontSize: "75px" }}>
            Restaurant Roulette
          </h1>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-4"></div>
            <div className="col-4">
              <Form onSubmit={event => this.handleLogin(event)}>
                <Form.Field>
                  <label>email:</label>
                  <input placeholder="email" onChange={this.handleChange} />
                </Form.Field>
                <Form.Field>
                  <label>password:</label>
                  <input placeholder="password" onChange={this.handleChange} />
                </Form.Field>
                <Form.Field>
                  <Checkbox label="I agree to the Terms and Conditions" />
                </Form.Field>
                <Button type="submit" color="green">
                  Login
                </Button>
                <small style={{ color: "#5C5932" }}>
                  Not a member?{" "}
                  <b onClick={this.handleClick} className="link">
                    Sign up.
                  </b>
                </small>
              </Form>
              <div className="col-4">
                <div className="img-div">
                  <img
                    src="./roulette-svgrepo-com.svg"
                    className="rotate"
                    style={{
                      maxWidth: "250px",
                      margin: "0 auto 0 auto",
                      position: "fixed",
                      bottom: "5%",
                      right: "5%"
                    }}
                  />
                </div>
              </div>

              {/* <form onSubmit={event => this.handleLogin(event)}>
                <div className="form-group">
                  <label>
                    <b>email:</b>
                  </label>
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    value={this.state.value}
                    onChange={this.handleChange}
                  />{" "}
                  <br />
                  <label>
                    <b>password:</b>
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={this.state.value}
                    onChange={this.handleChange}
                  />
                  <br />
                </div>
                <input type="submit" value="Login" className="button" />
                <br />
                <small style={{ color: "#5C5932" }}>
                  Not a member?{" "}
                  <b onClick={this.handleClick} className="link">
                    Sign up.
                  </b>
                </small>
              </form>
            </div>
          </div> */}
            </div>
          </div>
        </div>
      </>
    );
  }
}
