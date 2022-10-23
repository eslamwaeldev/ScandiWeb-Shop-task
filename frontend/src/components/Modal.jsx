import { Query } from "@apollo/react-components";
import React, { Component } from "react";
import CartItem from "./CartItem";
import { FIND_PRODUCT } from "./queries";

export class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPrice: 0,
      quantity: {},
    };
    this.handleAddToTotalPrice = this.handleAddToTotalPrice.bind(this);
    this.handleSubtractFromTotalPrice = this.handleSubtractFromTotalPrice.bind(this);
    this.resetTotalPrice = this.resetTotalPrice.bind(this);
    this.handleQuantity = this.handleQuantity.bind(this);
    this.removeFromQuantity = this.removeFromQuantity.bind(this);
  }

  handleAddToTotalPrice(price) {
    this.setState((prevState) => ({
      totalPrice: prevState.totalPrice + price,
    }));
  }
  handleSubtractFromTotalPrice(price) {
    this.setState({
      totalPrice: this.state.totalPrice - price,
    });
  }
  resetTotalPrice(e) {
    console.log("reset");
    console.log(e.target.id);
    if (e.target.id === "myModal") {
      this.setState({
        totalPrice: 0,
      });
    }
  }
  handleQuantity(id, amount) {
    this.setState({
      ...this.state,
      quantity: {
        ...this.state.quantity,
        [id]: amount,
      },
    });
    console.log(this.state.quantity);
  }
  removeFromQuantity(id) {
    this.setState({
      ...this.state,
      quantity: {
        ...this.state.quantity,
        [id]: undefined,
      },
    });
  }
  render() {
    console.log(this.props.itemsIDs);
    return (
      this.props.modal && (
        <div onClick={this.resetTotalPrice}>
          <div id="myModal" className="modal" onClick={this.props.closeModal}>
            <div className="modal-content">
              <h4 className="cart-title">
                <span className="my-bag">My Bag, </span> {this.props.itemsIDs.length}
              </h4>
              <div className="cart-items">
                {this.props.itemsIDs.length > 0
                  ? this.props.itemsIDs.map((id, index) => {
                      return (
                        <Query key={index} query={FIND_PRODUCT} variables={{ product: id }} fetchPolicy="no-cache">
                          {({ loading, error, data }) => {
                            if (loading) return "Loading...";
                            if (error) return <h1>Error!..</h1>;
                            const { product } = data;
                            console.log(data.product);
                            return product.attributes.length > 0 ? (
                              <CartItem
                                key={product.name}
                                id={id}
                                attributes={product.attributes[0].items}
                                type={product.attributes[0].type}
                                color={product.attributes[0].items[0].value}
                                size={product.attributes[0].items[0].value}
                                name={product.name}
                                currency={product.prices[this.props.currency].currency.symbol}
                                price={product.prices[this.props.currency].amount}
                                img={product.gallery[0]}
                                handleAddToTotalPrice={this.handleAddToTotalPrice}
                                handleSubtractFromTotalPrice={this.handleSubtractFromTotalPrice}
                                removeItem={this.props.removeItem}
                                quantity={this.state.quantity}
                                handleQuantity={this.handleQuantity}
                                removeFromQuantity={this.removeFromQuantity}
                              />
                            ) : (
                              <CartItem
                                key={index}
                                id={id}
                                name={product.name}
                                currency={product.prices[this.props.currency].currency.symbol}
                                price={product.prices[this.props.currency].amount}
                                img={product.gallery[0]}
                                handleAddToTotalPrice={this.handleAddToTotalPrice}
                                handleSubtractFromTotalPrice={this.handleSubtractFromTotalPrice}
                                removeItem={this.props.removeItem}
                                quantity={this.state.quantity}
                                handleQuantity={this.handleQuantity}
                              />
                            );
                          }}
                        </Query>
                      );
                    })
                  : null}
              </div>
              <div className="price">
                <p className="total-text">Total</p>
                <p className="amount">
                  {this.state.totalPrice.toFixed(2)}{" "}
                  {this.props.USD ? "$" : this.props.EUR ? "£" : this.props.JPY ? "¥" : "$"}
                </p>
              </div>
              <div className="button-container">
                <button className="btn-cart btn-default btn-left">VIEW BAG</button>
                <button className="btn-cart btn-green btn-right">CHECKOUT</button>
              </div>
            </div>
          </div>
        </div>
      )
    );
  }
}

export default Modal;
