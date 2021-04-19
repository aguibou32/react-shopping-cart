// import logo from './logo.svg';
// import './App.css';
import React from "react";
import Cart from "./components/Cart";
import Filter from "./components/Filter";
import Products from "./components/Products";
import data from "./data.json";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      products: data.products,
      // cartItems: [],
      cartItems: JSON.parse(localStorage.getItem("cartItems"))
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
      size: "",
      sort: "",
    };
  }

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();

    let alreadyInCart = false;

    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });

    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }
    // console.log(this.state.cartItems);
    this.setState({
      cartItems: cartItems,
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  removeFromCart = (productToRemove) => {
    // const cartItems = this.state.cartItems.slice();
    // this.setState({
    //   cartItems: cartItems.filter((x) => x._id !== productToRemove._id),
    // });

    this.setState((prevState) => {
      return {
        cartItems: prevState.cartItems.filter((product) => {
          // We are computing the new state based on the previous one
          return productToRemove !== product;
          // for each and every item, we comparing the productToRemove and product, if they are not equal, it stays
          // in the array, if they are, the option is then removed.
        }),
      };
    });
    const cartItems = this.state.cartItems.slice();
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  createOrder = (order) => {
    alert("Need to save " + order);
  };

  sortProducts = (event) => {
    // console.log(event);

    const sort = event.target.value;

    this.setState((prevState) => ({
      sort: sort,
      products: prevState.products
        .slice()
        .sort((a, b) =>
          sort === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : sort === "highest"
            ? a.price < b.price
              ? 1
              : -1
            : a._id > b._id
            ? 1
            : -1
        ),
    }));
  };

  filterProducts = (event) => {
    if (event.target.value === "") {
      this.setState({
        size: event.target.value,
        products: data.products,
      });
    } else {
      this.setState({
        size: event.target.value,
        products: data.products.filter(
          (product) => product.availableSizes.indexOf(event.target.value) >= 0
        ),
      });
    }
  };

  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">Cool Gadgets </a>
        </header>

        <main>
          <div className="content">
            <div className="main">
              <Filter
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              />
              <Products
                products={this.state.products}
                addToCart={this.addToCart}
              />
            </div>
            <div className="side-bar">
              <Cart
                cartItems={this.state.cartItems}
                removeFromCart={this.removeFromCart}
                showCheckout={this.showCheckout}
                createOrder={this.createOrder}
              />
            </div>
          </div>
        </main>

        <footer>All right reserved</footer>
      </div>
    );
  }
}

export default App;
