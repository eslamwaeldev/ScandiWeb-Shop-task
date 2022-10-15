import React, { Component } from "react";

export default class Item extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChosen: false,
      id: this.props.id,
    };
    this.handleMouseIn = this.handleMouseIn.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }
  handleMouseIn() {
    this.setState({ ...this.state, isChosen: true });
  }
  handleMouseOut() {
    this.setState({ ...this.state, isChosen: false });
  }
  addToCart() {
    console.log("clicked");
    console.log(this.state.id);
  }
  render() {
    return (
      <div
        className={`grid-item ${this.state.isChosen && "hover"}`}
        onMouseEnter={this.handleMouseIn}
        onMouseLeave={this.handleMouseOut}
      >
        <div>
          <img className="item-img" alt="item" src={this.props.img} />
          <p className="item title">{this.props.title}</p>
          <p className="item item-price">
            <span>{this.props.currency}</span> {this.props.price}
          </p>
        </div>
        {this.state.isChosen ? (
          <div className="cart-overlay">
            <button className="cart-btn" onClick={this.addToCart}>
              <img className="cart-img" alt="cart" src={require("../assets/Common.png")} />
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}
