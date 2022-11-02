import { Query } from "@apollo/react-components";
import React, { Component } from "react";
import CartItem from "./CartItem";
import { FIND_PRODUCT } from "./queries";

export default class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tax: this.props.totalPrice * 0.21,
      numOfItems: 0,
    };
    this.handleCartPageTax = this.handleCartPageTax.bind(this);
    this.handleCartQuantity = this.handleCartQuantity.bind(this);
  }
  componentDidMount() {
    this.handleCartPageTax();
    this.handleCartQuantity();
  }
  componentWillUnmount() {
    this.props.resetTotalPrice();
  }
  handleCartPageTax() {
    this.setState({
      ...this.state,
      tax: this.props.totalPrice * 0.21,
    });
  }
  handleCartQuantity() {
    let q = 0;
    this.props.itemsIDs.forEach((item) => {
      q = q + this.props.quantity[item];
    });
    console.log("this is the q ", q);
    this.setState({
      ...this.state,
      numOfItems: q,
    });
  }
  render() {
    return (
      <>
        <div className="cart-page-container">
          <div className="cart-items">
            {this.props.itemsIDs.length > 0 ? (
              this.props.itemsIDs.map((id, index) => {
                return (
                  <Query key={index} query={FIND_PRODUCT} variables={{ product: id }} fetchPolicy="no-cache">
                    {({ loading, error, data }) => {
                      if (loading) return "Loading...";
                      if (error) return <h1>Error!..</h1>;
                      const { product } = data;
                      const itemId = id;
                      console.log(data.product);
                      return product.attributes.length > 0 ? (
                        <>
                          <CartItem
                            key={product.name}
                            id={id}
                            attributes={product.attributes[0].items}
                            type={product.attributes[0].type}
                            color={
                              this.props.color[itemId]
                                ? this.props.color[itemId]
                                : product.attributes[0].items[0].value
                            }
                            size={
                              this.props.size[itemId]
                                ? this.props.size[itemId]
                                : product.attributes[0].items[0].value
                            }
                            name={product.name}
                            currency={product.prices[this.props.currency].currency.symbol}
                            price={product.prices[this.props.currency].amount}
                            img={product.gallery[0]}
                            handleAddToTotalPrice={this.props.handleAddToTotalPrice}
                            handleSubtractFromTotalPrice={this.props.handleSubtractFromTotalPrice}
                            removeItem={this.props.removeItem}
                            quantity={this.props.quantity}
                            handleQuantity={this.props.handleQuantity}
                            removeFromQuantity={this.props.removeFromQuantity}
                            setSize={this.props.setSize}
                            setColor={this.props.setColor}
                            handleTax={this.handleCartPageTax}
                            handleCartQuantity={this.handleCartQuantity}
                          />
                        </>
                      ) : (
                        <>
                          <CartItem
                            key={index}
                            id={id}
                            name={product.name}
                            currency={product.prices[this.props.currency].currency.symbol}
                            price={product.prices[this.props.currency].amount}
                            img={product.gallery[0]}
                            handleAddToTotalPrice={this.props.handleAddToTotalPrice}
                            handleSubtractFromTotalPrice={this.props.handleSubtractFromTotalPrice}
                            removeItem={this.props.removeItem}
                            quantity={this.props.quantity}
                            handleQuantity={this.props.handleQuantity}
                            handleTax={this.handleCartPageTax}
                            handleCartQuantity={this.handleCartQuantity}
                          />
                        </>
                      );
                    }}
                  </Query>
                );
              })
            ) : (
              <div className="no-items-container">
                <p className="no-item-text">No Items added yet</p>
              </div>
            )}
          </div>
          <div className="cart-page-price-container">
            <div className="cart-page-price">
              <p className="cart-page-light-text">Tax 21%:</p>
              <p className="cart-page-total-amount">
                {this.state.tax.toFixed(2)}{" "}
                {this.props.USD ? "$" : this.props.EUR ? "£" : this.props.JPY ? "¥" : "$"}
              </p>
            </div>
            <div className="cart-page-price">
              <p className="cart-page-light-text">Quantity:</p>
              <p className="cart-page-total-amount">{this.state.numOfItems}</p>
            </div>
            <div className="cart-page-price">
              <p className="cart-page-text">Total:</p>
              <p className="cart-page-total-amount">
                {this.props.totalPrice.toFixed(2)}{" "}
                {this.props.USD ? "$" : this.props.EUR ? "£" : this.props.JPY ? "¥" : "$"}
              </p>
            </div>
          </div>
          <div className="button-container">
            <button className="btn-cart btn-green btn-left">ORDER</button>
          </div>
        </div>
      </>
    );
  }
}
