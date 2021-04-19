import React, { Component } from "react";
import formatCurrency from "../util";
// import Product from "./Product";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";

import Modal from "react-modal";

export default class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: null,
    };
  }

  openModal = (product) => {
    this.setState({
      product: product,
    });
  };

  closeModal = () => {
    this.setState({
      product: null,
    });
  };

  render() {
    return (
      <div>
        <Fade bottom cascade /* cascade can be set to true cascade={true}*/>
          <ul className="products">
            {this.props.products.map((product) => (
              <li key={product._id}>
                {/* <Product /> // In the future, just render a product component here */}
                <div className="product">
                  <a
                    href={"#" + product._id}
                    onClick={() => this.openModal(product)}
                  >
                    <img src={product.image} alt={product.title} />
                    <p>{product.title}</p>
                  </a>
                  <div className="product-price">
                    <div>{formatCurrency(product.price)}</div>
                    <button
                      onClick={() => this.props.addToCart(product)}
                      className="button primary"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Fade>
        {this.state.product && (
          <Modal
            isOpen={
              true
            } /* Setting modal to true here because if the product exist the modal has to be rendered*/
            onRequestClose={this.closeModal}
          >
            <Zoom>
              <button className="close-modal" onClick={this.closeModal}>
                x
              </button>
              <div>Product Details</div>

              <div className="product-details">
                <img
                  src={this.state.product.image}
                  alt={this.state.product.title}
                />
                <div className="product-details-description">
                  <p>
                    <strong>{this.state.product.title}</strong>
                  </p>

                  <p>{this.state.product.description}</p>

                  <p>
                    Available sizes:{" "}
                    {this.state.product.availableSizes.map((x) => (
                      <span>
                        {" "}
                        <button className="button">{x}</button>
                      </span>
                    ))}
                  </p>
                  <div className="product-price">
                    <div>{formatCurrency(this.state.product.price)}</div>
                    <button
                      className="button primary"
                      onClick={() => {
                        this.props.addToCart(this.state.product);
                        this.closeModal();
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </Zoom>
          </Modal>
        )}
      </div>
    );
  }
}
