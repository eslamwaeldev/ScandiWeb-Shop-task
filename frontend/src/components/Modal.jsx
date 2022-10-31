import { Query } from "@apollo/react-components";
import React, { Component } from "react";
import CartItem from "./CartItem";
import { FIND_PRODUCT } from "./queries";

export class Modal extends Component {
  render() {
    console.log(this.props.itemsIDs);
    return (
      this.props.modal && (
        <div onClick={this.props.resetTotalPrice}>
          <div id="myModal" className="modal" onClick={this.props.closeModal}>
            <div className="modal-content">
              <h4 className="cart-title">
                <span className="my-bag">My Bag, </span> {this.props.itemsIDs.length}{" "}
                <span className="my-bag">items</span>
              </h4>
              <div className="cart-items">
                {this.props.itemsIDs.length > 0 ? (
                  this.props.itemsIDs.map((id, index) => {
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
                              handleAddToTotalPrice={this.props.handleAddToTotalPrice}
                              handleSubtractFromTotalPrice={this.props.handleSubtractFromTotalPrice}
                              removeItem={this.props.removeItem}
                              quantity={this.props.quantity}
                              handleQuantity={this.props.handleQuantity}
                              removeFromQuantity={this.props.removeFromQuantity}
                            />
                          ) : (
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
                            />
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
              <div className="price">
                <p className="total-text">Total</p>
                <p className="amount">
                  {this.props.totalPrice.toFixed(2)}{" "}
                  {this.props.USD ? "$" : this.props.EUR ? "£" : this.props.JPY ? "¥" : "$"}
                </p>
              </div>
              <div className="button-container">
                <button className="btn-cart btn-default btn-left" onClick={this.props.handleCartPage}>
                  VIEW BAG
                </button>
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
