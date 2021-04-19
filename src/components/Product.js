import React, { Component } from "react";
import formatCurrency from "../util";

export default class Product extends Component {
  render() {
    return (
      <div>
        <div className="product">
          <a href={"#" + this.props.product._id}>
            <img
              src={this.props.product.image}
              alt={this.props.product.title}
            />
            <p>{this.props.product.title}</p>
          </a>
          <div className="product-price">
            <div>{formatCurrency(this.props.product.price)}</div>
            <button className="button primary">Add To Cart</button>
          </div>
        </div>
      </div>
    );
  }
}
