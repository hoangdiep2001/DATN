import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const User = (props) => (
  <tr>
    <td>{props.user.UserID}</td>
    <td>{props.user.Name}</td>
    <td>{props.user.Email}</td>
    <td>{props.user.UserType}</td>
    <td>{props.user.Address}</td>
    <td>
      <Link to={"/updateUser/" + props.user.UserID}>Edit</Link>
    </td>
  </tr>
);

export class UsersList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      role: "",
      users: [],
    };
  }

  componentDidMount() {
    const headers = {
      "x-access-token": sessionStorage.getItem('jwtToken')
    };
    const userType = sessionStorage.getItem('userType');
    console.log(sessionStorage.getItem("userType"), sessionStorage.getItem("userId"));
    // if(userType){
    if (true) {
      axios
        .get("http://localhost:8090/user/all/"+sessionStorage.getItem('userType')+"/false", {headers: headers})
        .then((response) => {
          this.setState({
            users: response.data.data,
          });
        })
        .catch((error) => console.log(error));
    }
    console.log("logged in as: " + sessionStorage.getItem("userType"), sessionStorage.getItem("userId"));
  }

  usersList() {
    return this.state.users.map((currentUser) => {
      return (
        <User
          user={currentUser.Record}
          deleteUser={this.deleteUser}
          key={currentUser.Key}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Users List</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>UserID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Usertype</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.usersList()}</tbody>
        </table>
      </div>
    );
  }
}

export default UsersList;
