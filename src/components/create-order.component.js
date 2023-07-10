import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
//import { sendToWholesaler } from "../../../servers/models/transact";

const User = (props) => (
  <tr>
    <td>{props.user.UserID}</td>
    <td>{props.user.Name}</td>
    <td>{props.user.Email}</td>
    <td>{props.user.UserType}</td>
    <td>{props.user.Address}</td>
  </tr>
);

const WS = (props) => (
  <option
    key={props.user.UserID}
    value={props.user.UserID}
  >
    {props.user.UserID}
  </option>
);

export class CreateOrder extends Component {
  constructor(props) {
    super(props);

    this.beginTransact = this.beginTransact.bind(this);

    this.state = {
      loggedUserType: sessionStorage.getItem("UserType"),
      productId: this.props.match.params.id,
      product_name: "",

      manufacturerDate: "",
      sendToWholesalerDate: "",
      sendToDistributorDate: "",
      sendToRetailerDate: "",
      sellToConsumerDate: "",
      orderedDate: "",
      deliveredDate: "",

      manufacturer_id: "",
      distributor_id: "",
      wholesaler_id: "",
      consumer_id: "",
      retailer_id: "",
      status: "",
      price: 0,
      manufacturers: [],
      users: [],
      transactMsg: "Placeholder",
      orderMSG: "placeHolder"
    };

    console.log("selected product: " + this.props);
  }

  componentDidMount() {
    //console.log(sessionStorage.getItem("role"));
    axios.get("http://localhost:8090/product/" + this.props.match.params.id + "/" + sessionStorage.getItem("role"))
      .then((response) => {
        this.setState({
          product_name: response.data.data.Name,
          manufacturer_id: response.data.data.ManufacturerID,
          retailer_id: response.data.data.RetailerID,
          distributor_id: response.data.data.DistributerID,
          wholesaler_id: response.data.data.WholesalerID,
          manufacturerDate: response.data.data.Date.ManufactureDate,
          sendToWholesalerDate: response.data.data.Date.SendToWholesalerDate,
          sendToDistributorDate: response.data.data.Date.SendToDistributorDate,
          sendToRetailerDate: response.data.data.Date.SendToRetailerDate,
          orderedDate: response.data.data.Date.OrderedDate,
          deliveredDate: response.data.data.Date.DeliveredDate,
          status: response.data.data.Status,
          price: response.data.data.Price,
        })
        console.log(this.state.product_name);
      })

    axios
      .get("http://localhost:8090/user/all/manufacturer")
      .then((response) => {
        this.setState({
          users: response.data.data,
        });
        //console.log(response.data.data);
      })
      .catch((error) => console.log(error));


  }

  TransactLabel() {
    const currUserType = sessionStorage.getItem("userType");
    if (currUserType === "manufacturer") {
      return "Send to Wholesaler"
    } else if (currUserType === "wholesaler") {
      return "Send to Distributor"
    } else if (currUserType === "distributor") {
      return "Send to Retailer"
    } else if (currUserType === "retailer") {
      return "sell to Custommer"
    }
  }

  handleTransactSubmit(e) {
    e.preventDefault(); console.log('You clicked submit.');
  }

  beginTransact(e) {
    e.preventDefault(); console.log('You clicked submit.');
    // console.log("product id: " + this.props.match.params.id);

    const currProduct = {
      id: "admin",
      loggedUserType: sessionStorage.getItem("userType"),
      productID: this.props.match.params.id,
      userId: sessionStorage.getItem("userId"),
    };
    console.log("sending product with: " + currProduct.loggedUserType + currProduct.userId+ currProduct.productID);

    axios
      .post("http://localhost:8090/transact/order", currProduct)
      .then((response) => {
        // this.setState({
        //   users: response.data.data,
        // });
        console.log("respond received, " + response.data.data);
        this.setState({
          transactMsg: "Transaction completed",
        });
      })
      .catch((error) => {
        this.setState({
          transactMsg: "Transaction failed",
        });
        console.log("transact failed");
        console.log(error);
      })
    window.location = "/orders";
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

  wholesalerList() {
    return this.state.users.map((currentUser) => {
      return (
        <WS
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
        <h3>Product detail</h3>
        <form onSubmit={this.beginTransact}>
          <div className="form-group">
            <label>ProductName: </label>
            <input
              //type="text"
              disabled
              className="form-control"
              value={this.state.product_name}
            />
          </div>
          <div className="form-group">
            <label>Price: </label>
            <input
              ref="manufacturerInput"
              disabled
              className="form-control"
              value={this.state.price}
            />
          </div>
          <div className="form-group">
            <label>ManufacturerID: </label>
            <input
              ref="manufacturerInput"
              disabled
              className="form-control"
              value={this.state.manufacturer_id}
            />
          </div>
          <div className="form-group">
            <label>Manufacturer Date: </label>
            <input
              ref="manufacturerInput"
              disabled
              className="form-control"
              value={this.state.manufacturerDate}
            />
          </div>
          <div className="form-group">
            <label>WholesalerID: </label>
            <input
              ref="manufacturerInput"
              disabled
              className="form-control"
              value={this.state.wholesaler_id}
            />
          </div>
          <div className="form-group">
            <label>Send To Wholesaler Date: </label>
            <input
              ref="manufacturerInput"
              disabled
              className="form-control"
              value={this.state.sendToWholesalerDate}
            />
          </div>

          <div className="form-group">
            <label>DistributerID: </label>
            <input
              ref="manufacturerInput"
              disabled
              className="form-control"
              value={this.state.distributor_id}
            />
          </div>
          <div className="form-group">
            <label>Send To Distributor Date: </label>
            <input
              ref="manufacturerInput"
              disabled
              className="form-control"
              value={this.state.sendToDistributorDate}
            />
          </div>
          <div className="form-group">
            <label>RetailerID: </label>
            <input
              ref="manufacturerInput"
              disabled
              className="form-control"
              value={this.state.retailer_id}
            />
          </div>
          <div className="form-group">
            <label>Send To Retailer Date: </label>
            <input
              ref="manufacturerInput"
              disabled
              className="form-control"
              value={this.state.sendToRetailerDate}
            />
          </div>
          <div className="form-group">
            <label>Deliver date: </label>
            <input
              ref="manufacturerInput"
              disabled
              className="form-control"
              value={this.state.deliveredDate}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Order this product"
              className="btn btn-primary"
            />
          </div>
          <div>
            <label>{this.state.transactMsg}</label>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateOrder;
