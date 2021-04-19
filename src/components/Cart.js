import React, { Component } from "react";
import formatCurrency from "../util";

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCheckout: false,
    };
  }

  showCheckout = () => {
    this.setState({
      showCheckout: true,
    });

    // console.log(this.state.showCheckout);
  };

  createOrder = () => {
    console.log("test");
  };

  render() {
    const { cartItems } = this.props;
    return (
      <div>
        {cartItems.length === 0 ? (
          <div className="cart cart-header">Cart is empty</div>
        ) : (
          <div className="cart cart-header">
            You have {cartItems.length} in the cart
          </div>
        )}

        <div className="cart">
          <ul className="cart-items">
            {cartItems.map((item) => (
              <li key={item._id}>
                <div>
                  <img src={item.image} alt={item.title} />
                </div>
                <div>{item.title}</div>
                <div className="right">
                  {formatCurrency(item.price)} x {item.count}{" "}
                  <button
                    className="button"
                    onClick={() => this.props.removeFromCart(item)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {cartItems.length > 0 && ( // cartItems.length !== 0 // also works
          <div>
            <div className="cart">
              <div className="total">
                <div>
                  {" "}
                  Total:{" "}
                  {formatCurrency(
                    cartItems.reduce((a, c) => a + c.price * c.count, 0)
                  )}
                </div>
                <button className="button primary" onClick={this.showCheckout}>
                  Proceed
                </button>
              </div>
            </div>
            {this.state.showCheckout && (
              <div className="cart">
                <ul className="form-container">
                  <li>
                    <label htmlFor="email">Email</label>
                    <input
                      name="email"
                      type="email"
                      required
                      onChange={this.handleInput}
                    />
                  </li>

                  <li>
                    <label htmlFor="text">Name</label>
                    <input
                      name="name"
                      type="text"
                      required
                      onChange={this.handleInput}
                    />
                  </li>

                  <li>
                    <label htmlFor="address">Adress</label>
                    <input
                      name="address"
                      type="text"
                      required
                      onChange={this.handleInput}
                    />
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
