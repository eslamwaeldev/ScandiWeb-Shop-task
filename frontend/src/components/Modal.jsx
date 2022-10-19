import { Query } from "@apollo/react-components";
import React, { Component } from "react";
import CartItem from "./CartItem";
import { FIND_PRODUCT } from "./queries";

export class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalPrice: 0,
    };
    this.handleAddToTotalPrice = this.handleAddToTotalPrice.bind(this);
    this.handleSubtractFromTotalPrice = this.handleSubtractFromTotalPrice.bind(this);
  }
  handleAddToTotalPrice(price) {
    this.setState({
      totalPrice: this.state.totalPrice + price,
    });
  }
  handleSubtractFromTotalPrice(price) {
    this.setState({
      totalPrice: this.state.totalPrice - price,
    });
  }
  render() {
    return (
      this.props.modal && (
        <div id="myModal" className="modal" onClick={this.props.closeModal}>
          <div className="modal-content">
            <h4 className="cart-title">
              <span className="my-bag">My Bag, </span> {this.props.itemsIDs.length}
            </h4>
            <div className="cart-items">
              {this.props.itemsIDs.length > 0
                ? this.props.itemsIDs.map((id, index) => {
                    return (
                      <Query key={index} query={FIND_PRODUCT} variables={{ product: id }}>
                        {({ loading, error, data }) => {
                          if (loading) return "Loading...";
                          if (error) return <h1>Error!..</h1>;
                          const { product } = data;
                          return product.attributes.length > 0 ? (
                            <CartItem
                              key={id}
                              type={product.attributes[0].type}
                              color={product.attributes[0].items[0].value}
                              size={product.attributes[0].items[0].value}
                              name={product.name}
                              currency={product.prices[this.props.currency].currency.symbol}
                              price={product.prices[this.props.currency].amount}
                              attributes={product.attributes[0].items}
                              img={product.gallery[0]}
                              handleAddToTotalPrice={this.handleAddToTotalPrice}
                              handleSubtractFromTotalPrice={this.handleSubtractFromTotalPrice}
                            />
                          ) : (
                            <CartItem
                              key={id}
                              name={product.name}
                              currency={product.prices[this.props.currency].currency.symbol}
                              price={product.prices[this.props.currency].amount}
                              img={product.gallery[0]}
                              handleAddToTotalPrice={this.handleAddToTotalPrice}
                              handleSubtractFromTotalPrice={this.handleSubtractFromTotalPrice}
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
              <p className="amount">{this.state.totalPrice.toFixed(2)}</p>
            </div>
            <div className="button-container">
              <button className="btn-cart btn-default btn-left">VIEW BAG</button>
              <button className="btn-cart btn-green btn-right">CHECKOUT</button>
            </div>
          </div>
        </div>
      )
    );
  }
}

export default Modal;
