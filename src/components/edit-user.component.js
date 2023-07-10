import React, { Component } from "react";
import axios from "axios";

export class EditUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeUsertype = this.onChangeUsertype.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      email: "",
      usertype: "",
      address: "",
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8090/user/" + this.props.match.params.id + "/" + sessionStorage.getItem("userType"))
      .then((response) => {
        this.setState({
          name: response.data.data.Name,
          email: response.data.data.Email,
          usertype: response.data.data.UserType,
          address: response.data.data.Address,
        });
        console.log(response.data.data);
      });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangeUsertype(e) {
    this.setState({
      usertype: e.target.value,
    });
  }

  onChangeAddress(e) {
    this.setState({
      address: e.target.value,
    });
  }

  async onSubmit(e) {
    e.preventDefault();

    const user = {
      name: this.state.name,
      email: this.state.email,
      usertype: this.state.usertype,
      address: this.state.address,
    };
    console.log(this.props.match);
    console.log(user);

    await axios
      .put("http://localhost:8090/user/" + this.props.match.params.id + "/" + sessionStorage.getItem("userType"),user)
      .then((res) => console.log(res.data));

    window.location = "/users";
  }

  render() {
    return (
      <div>
        <h3>Edit User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </div>
          <div className="form-group">
            <label>Email: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
          </div>
          {(sessionStorage.getItem("userType")==="admin")?
          <div className="form-group">
            <label>Usertype: </label>
            <select
              ref="usertypeInput"
              required
              className="form-control"
              value={this.state.usertype}
              onChange={this.onChangeUsertype}
            >
              <option key="manufacturer" value="manufacturer">
                Manufacturer
              </option>
              <option key="distributor" value="distributor">
                Distributor
              </option>
              <option key="wholesaler" value="wholesaler">
                Wholesaler
              </option>
              <option key="retailer" value="retailer">
                Retailer
              </option>
              <option key="consumer" value="consumer">
                Consumer
              </option>
            </select>
          </div>
          :""}
          <div className="form-group">
            <label>Address: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.address}
              onChange={this.onChangeAddress}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Update User"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default EditUser;

