import React, { Component } from "react";

export default class CartItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      size: true,
    };
  }
  render() {
    return (
      <>
        <div className="cart-item-container">
          <div className="cart-item-details">
            <p className="cart-item-name"></p>
            <p className="cart-item-price"></p>
            {this.state.size && (
              <div className="cart-size-container">
                <p className="size-title">Size</p>
                <div className="sizes-containers"></div>
              </div>
            )}
            <div className="cart-color-container">
              <p className="cart-color-title">Color</p>
              <div className="colors-containers"></div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
