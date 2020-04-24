import React from "react";
import axios from "axios";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: {
        username: "",
        password: "",
      },
      isLoading: false,
    };
  }

  handleChange = (e) => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value,
      },
    });
    console.log(this.state.credentials);
  };

  login = (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    axios
      .post("http://localhost:5000/api/login", this.state.credentials)
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data.payload));
        this.props.history.push("/BubblePage");
        this.setState({ isLoading: false });
      })
      .catch((err) => console.log({ err }));
  };

  render() {
    return (
      <div>
        <h1>Welcome To The Bubble App</h1>
        <h2>Login</h2>
        <form onSubmit={this.login}>
          <input
            type="text"
            name="username"
            value={this.state.credentials.username}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
          />
          <button>Login</button>
        </form>
        {this.state.isLoading && (
          <div>
            <h3>Loading...</h3>
          </div>
        )}
      </div>
    );
  }
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  // return (
  //   <>
  //     <h1>Welcome to the Bubble App!</h1>
  //     <p>Build a login page here</p>
  //   </>
  // );
}

export default Login;
