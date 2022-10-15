import React, { Component } from "react";

export class Modal extends Component {
  render() {
    return (
      this.props.modal && (
        <div id="myModal" className="modal" onClick={this.props.closeModal}>
          <div className="modal-content">
            <h4 className="cart-title">
              <span className="my-bag">My Bag, </span> 3items
            </h4>
            <div className="cart-items"></div>
            <div className="price">
              <p className="total-text">Total</p>
              <p className="amount">$200</p>
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
