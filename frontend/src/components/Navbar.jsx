import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import NavLink from "./NavLink";
import Logo from "./Logo";
import CartIcon from "./CartIcon";

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
`;

export class Navbar extends Component {
  render() {
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
              {/* <select name="currency" className="select">
                <option>$ USD</option>
                <option>£ EUR</option>
                <option>¥ JPY</option>
              </select> */}
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
        </Nav>
      </>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
