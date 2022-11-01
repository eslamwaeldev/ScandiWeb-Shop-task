import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import NavLink from "./NavLink";
import Logo from "./Logo";
import CartIcon from "./CartIcon";
import Modal from "./Modal";

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  height: 5rem;
  background: #ffffff;
  position: relative;
  justify-content: center;
  z-index: 2;
  .modal {
    z-index: 1;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 0px;
    min-height: ${`${
      document.documentElement.scrollHeight +
      document.documentElement.offsetHeight +
      0.556 * document.documentElement.clientHeight
    }px`};
    /* overflow: auto; */
    background: rgba(57, 55, 72, 0.22);
  }
`;

export class Navbar extends Component {
  render() {
    const currency = this.props.USD ? 0 : this.props.EUR ? 1 : this.props.JPY ? 3 : 0;
    return (
      <>
        <Nav>
          <div className="nav-label-container">
            <NavLink link="All Items" Selected={this.props.isAll} setSelected={this.props.handleAll} />
            <NavLink link="Tech" Selected={this.props.isTech} setSelected={this.props.handleTech} />
            <NavLink link="Clothes" Selected={this.props.isClothes} setSelected={this.props.handleClothes} />
          </div>
          <Logo />
          <div className="nav-icon-container">
            <div className="currency">
              {this.props.isUSD && <label>$</label>}
              {this.props.isEUR && <label>£</label>}
              {this.props.isJPY && <label>¥</label>}
              <button id="currency" className="nav-label currency-btn" onClick={this.props.handleCurrency}>
                <svg
                  onClick={this.props.handleCurrency}
                  id="down-arrow"
                  width="8"
                  height="4"
                  viewBox="0 0 8 4"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    onClick={this.props.handleCurrency}
                    id="down-arrow-path"
                    d="M1 0.5L4 3.5L7 0.5"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {this.props.currencyClicked && (
                <div className="options-menu">
                  <button
                    className="option nav-label"
                    onClick={async () => {
                      await this.props.handleUSD();
                      this.props.handleCurrency();
                    }}
                  >
                    $ USD
                  </button>
                  <button
                    className="option nav-label"
                    onClick={async () => {
                      await this.props.handleEUR();
                      this.props.handleCurrency();
                    }}
                  >
                    £ EUR
                  </button>
                  <button
                    className="option nav-label"
                    onClick={async () => {
                      await this.props.handleJPY();
                      this.props.handleCurrency();
                    }}
                  >
                    ¥ JPY
                  </button>
                </div>
              )}
            </div>
            <div className="cart">
              <button className="nav-label" onClick={this.props.controlModal}>
                <CartIcon />
              </button>
            </div>
          </div>
          <Modal
            itemsIDs={this.props.itemsIDs}
            modal={this.props.modal}
            closeModal={this.props.closeModal}
            currency={currency}
            removeItem={this.props.removeItem}
            handleCartPage={this.props.handleCartPage}
            handleAddToTotalPrice={this.props.handleAddToTotalPrice}
            handleSubtractFromTotalPrice={this.props.handleSubtractFromTotalPrice}
            resetTotalPrice={this.props.resetTotalPrice}
            handleQuantity={this.props.handleQuantity}
            removeFromQuantity={this.props.removeFromQuantity}
            quantity={this.props.quantity}
            totalPrice={this.props.totalPrice}
            size={this.props.size}
            setSize={this.props.setSize}
            color={this.props.color}
            setColor={this.props.setColor}
          />
        </Nav>
      </>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
