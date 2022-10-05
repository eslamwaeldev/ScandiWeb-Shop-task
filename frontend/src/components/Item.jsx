import React, { Component } from "react";

export default class Item extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChosen: false,
    };
    this.handleMouseIn = this.handleMouseIn.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }
  handleMouseIn() {
    this.setState({ ...this.state, isChosen: true });
  }
  handleMouseOut() {
    this.setState({ ...this.state, isChosen: false });
  }
  render() {
    return (
      <div
        className={`grid-item ${this.state.isChosen && "hover"}`}
        onMouseEnter={this.handleMouseIn}
        onMouseLeave={this.handleMouseOut}
      >
        <div>
          <img className="item-img" alt="item" src={require("../assets/Image.png")} />
          <p className="item title">{this.props.title}</p>
          <p className="item item-price">{this.props.price}</p>
        </div>
        {this.state.isChosen ? (
          <div className="cart-overlay">
            <img className="cart-img" alt="cart" src={require("../assets/Common.png")} />
          </div>
        ) : null}
      </div>
    );
  }
}
