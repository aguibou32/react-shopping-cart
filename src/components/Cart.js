import React, { Component } from "react";
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      address: "",
      showCheckout: false,
    };
  }

  showCheckout = () => {
    this.setState({
      showCheckout: true,
    });

    // console.log(this.state.showCheckout);
  };

  createOrder = (e) => {
    // console.log("test");
    e.preventDefault();

    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItems: this.props.cartItems,
    };

    // console.log(order);
    this.props.createOrder(order);
  };

  handleInput = (e) => {
    // console.log(e);

    this.setState({
      [e.target.name]: e.target.value,
    });
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
          <Fade left cascade={true}>
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
          </Fade>
        </div>
        {cartItems.length > 0 && ( // cartItems.length !== 0 // also works
          <div>
            <div className="cart">
              <Fade right>
                <div className="total">
                  <div>
                    {" "}
                    Total:{" "}
                    {formatCurrency(
                      cartItems.reduce((a, c) => a + c.price * c.count, 0)
                    )}
                  </div>
                  <button
                    className="button primary"
                    onClick={this.showCheckout}
                  >
                    Proceed
                  </button>
                </div>
              </Fade>
            </div>
            {this.state.showCheckout && (
              <div className="cart">
                <Fade right>
                  <form onSubmit={this.createOrder}>
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

                      <li>
                        <button className="button primary">Checkout</button>
                      </li>
                    </ul>
                  </form>
                </Fade>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
