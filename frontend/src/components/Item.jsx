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
        className={`grid-item ${this.props.inStock && this.state.isChosen && "hover"} ${
          this.props.inStock ? null : "not-in-stock"
        }`}
        onMouseEnter={this.handleMouseIn}
        onMouseLeave={this.handleMouseOut}
      >
        <div className="item-def">
          {this.props.inStock ? null : <p className="not-in-stock-text">OUT OF STOCK</p>}
          <button
            className="item-btn item-page-btn"
            onClick={async () => {
              await this.props.handleClickedItemId(this.props.id);
              this.props.handleItemPage();
            }}
          >
            <img className="item-img" alt="item" src={this.props.img} />
          </button>
          <button
            className="item title item-btn item-page-btn"
            onClick={async () => {
              await this.props.handleClickedItemId(this.props.id);
              this.props.handleItemPage();
            }}
          >
            {this.props.title}
          </button>

          <p className="item item-price">
            <span>{this.props.currency}</span> {this.props.price}
          </p>
        </div>
        {this.props.inStock && this.state.isChosen ? (
          <div className="cart-overlay">
            <button
              className="item-btn"
              onClick={() => {
                this.props.addToCart(this.props.id);
              }}
            >
              <img className="cart-img" alt="cart" src={require("../assets/Common.png")} />
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}
