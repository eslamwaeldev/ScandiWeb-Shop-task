import React, { Component } from "react";
import ColorBtn from "./ColorBtn";
import SizeBtn from "./SizeBtn";

export default class CartItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: this.props.type,
      chosenColor: this.props.color,
      chosenSize: this.props.size,
      quantity: 1,
    };
    this.setChosenColor = this.setChosenColor.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.setChosenSize = this.setChosenSize.bind(this);
  }
  componentDidMount() {
    this.props.handleAddToTotalPrice(this.props.price);
  }
  setChosenColor(color) {
    this.setState({
      ...this.state,
      chosenColor: color,
    });
  }
  setChosenSize(size) {
    this.setState({
      ...this.state,
      chosenSize: size,
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
    return (
      <>
        <div className="cart-item-container">
          <div className="cart-item-details">
            <p className="cart-item-name">{this.props.name}</p>
            <p className="cart-item-price">
              {this.props.currency} {this.props.price}
            </p>
            {this.state.type && this.state.type === "text" ? (
              <div className="cart-size-container">
                <p className="size-title">Size</p>
                <div className="options-containers">
                  {this.props.attributes &&
                    this.props.attributes.map((size) => {
                      return (
                        <SizeBtn
                          key={size.id}
                          setChosenSize={this.setChosenSize}
                          size={size.value}
                          chosenSize={this.state.chosenSize}
                        />
                      );
                    })}
                </div>
              </div>
            ) : (
              this.props.attributes && (
                <div className="cart-color-container">
                  <p className="cart-color-title">Color</p>
                  <div className="options-containers">
                    {this.props.attributes.map((color) => {
                      return (
                        <ColorBtn
                          key={color.id}
                          color={color.value}
                          chosenColor={this.state.chosenColor}
                          setChosen={this.setChosenColor}
                          defaultColorChosen={this.state.defaultColorChosen}
                          setDefaultChosenColor={this.setDefaultChosenColor}
                        />
                      );
                    })}
                  </div>
                </div>
              )
            )}
          </div>
          <div className="quantity-control">
            <button
              className="quantity-btn"
              onClick={() => {
                this.increment();
                this.props.handleAddToTotalPrice(this.props.price);
              }}
            >
              +
            </button>
            <p className="items-number">{this.state.quantity}</p>
            <button
              className="quantity-btn"
              onClick={() => {
                this.decrement();
                if (this.state.quantity > 0) {
                  this.props.handleSubtractFromTotalPrice(this.props.price);
                }
              }}
            >
              -
            </button>
          </div>
          <div>
            <img className="cart-item-img" alt="item" src={this.props.img} />
          </div>
        </div>
      </>
    );
  }
}
