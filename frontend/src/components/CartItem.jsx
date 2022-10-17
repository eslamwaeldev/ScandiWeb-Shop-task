import React, { Component } from "react";
import ColorBtn from "./ColorBtn";

export default class CartItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      size: false,
      chosenColor: "red",
      quantity: 1,
    };
    this.setChosenColor = this.setChosenColor.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }
  setChosenColor(color) {
    this.setState({
      ...this.state,
      chosenColor: color,
    });
  }
  increment() {
    this.setState({
      ...this.state,
      quantity: this.state.quantity + 1,
    });
  }
  decrement() {
    if (this.state.quantity > 0) {
      this.setState({
        ...this.state,
        quantity: this.state.quantity - 1,
      });
    }
  }

  render() {
    const colorArr = ["red", "blue", "green"];
    return (
      <>
        <div className="cart-item-container">
          <div className="cart-item-details">
            <p className="cart-item-name">Nike Air</p>
            <p className="cart-item-price">$ 144.69</p>
            {this.state.size && (
              <div className="cart-size-container">
                <p className="size-title">Size</p>
                <div className="sizes-containers"></div>
              </div>
            )}
            <div className="cart-color-container">
              <p className="cart-color-title">Color</p>
              <div className="colors-containers">
                {colorArr.map((color) => {
                  return (
                    <ColorBtn
                      key={color}
                      color={color}
                      chosenColor={this.state.chosenColor}
                      setChosen={this.setChosenColor}
                      defaultColorChosen={this.state.defaultColorChosen}
                      setDefaultChosenColor={this.setDefaultChosenColor}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="quantity-control">
            <button className="quantity-btn" onClick={this.increment}>
              +
            </button>
            <p className="items-number">{this.state.quantity}</p>
            <button className="quantity-btn" onClick={this.decrement}>
              -
            </button>
          </div>
          <div>
            <img className="cart-item-img" alt="item" src={require("../assets/Image.png")} />
          </div>
        </div>
      </>
    );
  }
}
