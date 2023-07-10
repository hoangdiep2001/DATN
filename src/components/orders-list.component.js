import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from "axios";

const Product = (props) => (

  <tr>
    <td>{props.product.ProductID}</td>
    <td>{props.product.Name}</td>
    <td>{props.product.ManufacturerID}</td>
    <td>{props.product.Date.ManufactureDate.substring(0, 10)}</td>
    {/* <td>{props.product.Date.SendToWholesalerDate.substring(0, 10)}</td>
    <td>{props.product.Date.SendToDistributorDate.substring(0, 10)}</td>
    <td>{props.product.Date.SendToRetailerDate.substring(0, 10)}</td> */}
    <td>{props.product.Date.SellToConsumerDate.substring(0, 10)}</td>
    <td>{props.product.Price}</td>
    <td>{props.product.Status}</td>

    {/* <td class="">
      <Link to={"/updateProduct/" + props.product.ProductID}>View detail</Link>
      <form onSubmit={this.markAsDelivered}>
      <input type="submit" name="edit" value="Delivered"/>
      </form>

    </td> */}
  </tr>
);

const WS = (props) => (
  <option
    key={props.product.Name}
    value={props.product.ProductID}
  >
    {props.product.Name}
  </option>
);

export class OrdersListComponent extends Component {
  constructor(props) {
    super(props);
    this.markAsDelivered = this.markAsDelivered.bind(this);
    this.onChangeTransactTargetId = this.onChangeTransactTargetId.bind(this);
    this.transactTarget = "";

    this.state = {
      role: sessionStorage.getItem('role'),
      //role: "manufacturer",
      products: [],
      product_id: "",
      transactMsg: "",
    };


    this.setState({
      role: sessionStorage.getItem('role'),
      products: [],
    });
  }

  componentDidMount() {
    const headers = {
      //"id": sessionStorage.getItem("jwtToken"),
      "id": "User1"
    };
    const signIn = {
      id: this.state.name,
      password: this.state.password,
    };
    const userType = sessionStorage.getItem('userType');
    if (userType) {
      axios
        .get("http://localhost:8090/product/manufacturer", { headers: headers })
        .then((response) => {
          this.setState({
            products: response.data.data,
          });
        })
        .catch((error) => console.log(error));
    }
  }

  markAsDelivered(e) {
    e.preventDefault(); console.log('You clicked submit.');
    console.log("product id: " + this.state.product_id);
    const currUserType = sessionStorage.getItem("userType");
    const currProduct = {
      id: "admin",
      loggedUserType: sessionStorage.getItem("userType"),
      productID: this.state.product_id,
      userId: sessionStorage.getItem("userId"),
    };
    // if(currUserType === "retailer"){
    //   currProduct.userId = sessionStorage.getItem("userId");
    // }
    console.log("sending product with: " + currProduct.loggedUserType + currProduct.productId+ currProduct.userId);

    axios
      .post("http://localhost:8090/transact/deliver", currProduct)
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

  }

  wholesalerList() {
    return this.state.products.map((currentProduct) => {
      if (currentProduct.Record.ConsumerID === sessionStorage.getItem('userId')) {
      return (
        <WS
          product={currentProduct.Record}
          deleteProduct={this.deleteProduct}
          key={currentProduct.Key}
        />
      );
      }else{return}
    });
  }

  drawTransact() {
    const currUserType = sessionStorage.getItem("userType");
    return (
    <select
      // ref="manufacturerInput"
      required
      className="form-control"
      onChange={this.onChangeTransactTargetId}
    >
      <option disabled selected value> -- select an option -- </option>
      {this.wholesalerList()}
    </select>
    );

  }

  onChangeTransactTargetId(e) {
    // console.log("before" + this.transactTargetId)
    this.transactTarget = e.target.value;
    this.setState({
      product_id: this.transactTarget,
    });
    console.log("after" + this.transactTarget); 
  }

  productsList() {
    return this.state.products.map((currentProduct) => {
      if (currentProduct.Record.ConsumerID !== sessionStorage.getItem('userId')) {
        return;
      } else {
        return (
          <Product
            product={currentProduct.Record}
            deleteProduct={this.deleteProduct}
            key={currentProduct.Key}
          />
        );
      }
    });
  }

  render() {
    return (
      <div>
        <h3>Products List</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>ProductId</th>
              <th>ProductName</th>
              <th>ManufacturerId</th>
              <th>ManufacturerDate</th>
              {/* <th>SendToWholesalerDate</th>
              <th>SendToDistributorDate</th>
              <th>SendToRetailerDate</th> */}
              <th>SellToConsumerDate</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>{this.productsList()}</tbody>
        </table>
        <form onSubmit={this.markAsDelivered}>
          <h3>Mark a product as delivered</h3>
          <label>Select product ID:</label>
          <div className="form-group">
            
            {/* <select
              // ref="manufacturerInput"
              required
              className="form-control"
              onChange={this.onChangeTransactTargetId}
            >
              {this.wholesalerList()}
            </select> */}
            {this.drawTransact()}
          </div>
          <div>
            <label>{this.state.transactMsg}</label>
          </div>

          <div className="form-group">
            <button type="submit"
              className="btn btn-primary"
            >Mark this product as delivered</button>
          </div>
        </form>
      </div>
      
    );
  }
}

export default OrdersListComponent
