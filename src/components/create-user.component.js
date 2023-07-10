import React, { Component } from "react";
import axios from "axios";

export class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeUsertype = this.onChangeUsertype.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      id:"",
      name: "",
      email: "",
      userType: "manufacturer",
      address: "",
      password: "",
      role: "",
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangeUsertype(e) {
    this.setState({
      userType: e.target.value,
    });
    console.log(this.state.userType);
  }

  onChangeAddress(e) {
    this.setState({
      address: e.target.value,
    });
  }

  async onSubmit(e) {
    e.preventDefault();
    this.state.role = sessionStorage.getItem("userType");
    const user = {
      id: sessionStorage.getItem("userId"),
      name: this.state.name,
      email: this.state.email,
      userType: this.state.userType,
      address: this.state.address,
      password: this.state.password,
      loggedUserType:this.state.role,
    };
    const headers = {
      "x-access-token": sessionStorage.getItem("jwtToken"),
    };

    console.log(user);

    await axios
      .post("http://localhost:8090/user/signup/" + this.state.role, user, {
        headers: headers,
      })
      .then((res) => console.log(res));

    this.setState({
      user_id: user.user_id,
    });

    window.location = "/users";
  }

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </div>
          <div className="form-group">
            <label>Password: </label>
            <input
              type="password"
              required
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </div>
          <div className="form-group">
            <label>Email: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
          </div>
          <div className="form-group">
            <label>Usertype: </label>
            <select
              ref="usertypeInput"
              required
              className="form-control"
              value={this.state.userType}
              onChange={this.onChangeUsertype}
            >
              <option key="manufacturer" value="manufacturer">
                Manufacturer
              </option>
              <option key="wholesaler" value="wholesaler">
                Wholesaler
              </option>
              <option key="distributor" value="distributor">
                Distributor
              </option>
              <option key="retailer" value="retailer">
                Retailer
              </option>
              <option key="consumer" value="consumer">
                Consumer
              </option>
            </select>
          </div>
          <div className="form-group">
            <label>Address: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.address}
              onChange={this.onChangeAddress}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create User"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default CreateUser;
