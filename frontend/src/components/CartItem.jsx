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

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.setChosenColor = this.setChosenColor.bind(this);
    this.setChosenSize = this.setChosenSize.bind(this);
  }
  componentDidMount() {
    if (this.props.modal) {
      if (this.props.quantity[this.props.id] === 0 || this.props.quantity[this.props.id]) {
        this.setState({
          ...this.state,
          quantity: this.props.quantity[this.props.id],
        });
        this.props.handleAddToTotalPrice(this.props.price * this.props.quantity[this.props.id]);
      } else {
        this.props.handleQuantity(this.props.id, this.state.quantity);
        this.props.handleAddToTotalPrice(this.props.price);
      }
    } else {
      if (this.props.quantity[this.props.id] === 0 || this.props.quantity[this.props.id]) {
        this.setState({
          ...this.state,
          quantity: this.props.quantity[this.props.id],
        });
      }
    }
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
        <div className={`${this.props.modal ? "" : "border"} cart-item-container`}>
          <div className={`${this.props.modal ? "cart-item-details" : "cart-item-page-details"}`}>
            <p className="cart-item-name">{this.props.name}</p>
            <p className="cart-item-price">
              {this.props.currency} {this.props.price}
            </p>
            {this.state.type && this.state.type === "text" ? (
              <div>
                <p className="size-title">Size:</p>
                <div className={`${this.props.modal ? "options-containers" : "cart-page-options"}`}>
                  {this.props.attributes &&
                    this.props.attributes.map((size) => {
                      return (
                        <SizeBtn
                          key={size.id}
                          setChosenSize={this.setChosenSize}
                          size={size.value}
                          chosenSize={this.state.chosenSize}
                          id={this.props.id}
                          setSize={this.props.setSize && this.props.setSize}
                        />
                      );
                    })}
                </div>
              </div>
            ) : (
              this.props.attributes && (
                <div>
                  <p className="cart-color-title">Color:</p>
                  <div className={`${this.props.modal ? "options-containers" : "cart-page-options"}`}>
                    {this.props.attributes.map((color) => {
                      return (
                        <ColorBtn
                          key={color.id}
                          id={this.props.id}
                          color={color.value}
                          chosenColor={this.state.chosenColor}
                          setChosen={this.setChosenColor}
                          defaultColorChosen={this.state.defaultColorChosen}
                          setDefaultChosenColor={this.setDefaultChosenColor}
                          setColor={this.props.setColor && this.props.setColor}
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
              onClick={async () => {
                this.increment();
                await this.props.handleAddToTotalPrice(this.props.price);
                this.props.handleTax && (await this.props.handleTax());
                await this.props.handleQuantity(this.props.id, this.state.quantity);
                this.props.handleCartQuantity && this.props.handleCartQuantity();
              }}
            >
              +
            </button>
            <p className="items-number">{this.state.quantity}</p>
            <button
              className="quantity-btn"
              onClick={async () => {
                this.decrement();
                if (this.state.quantity > 0) {
                  await this.props.handleSubtractFromTotalPrice(this.props.price);
                  this.props.handleTax && (await this.props.handleTax());
                  await this.props.handleQuantity(this.props.id, this.state.quantity);
                  this.props.handleCartQuantity && this.props.handleCartQuantity();
                } else {
                  await this.props.removeItem(this.props.id);
                  this.props.removeFromQuantity(this.props.id);
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
