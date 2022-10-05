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
`;

export class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
    };
    this.controlModal = this.controlModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  controlModal() {
    this.setState({
      modal: !this.state.modal,
    });
  }
  closeModal(e) {
    console.log(e);
    if (e.target.id === "myModal") {
      this.setState({
        modal: false,
      });
    }
  }
  render() {
    return (
      <>
        <Nav>
          <div className="nav-label-container">
            <NavLink link="Women" Selected={this.props.isWomen} setSelected={this.props.handleWomen} />
            <NavLink link="Men" Selected={this.props.isMen} setSelected={this.props.handleMen} />
            <NavLink link="Kids" Selected={this.props.isKids} setSelected={this.props.handleKids} />
          </div>
          <Logo />
          <div className="nav-icon-container">
            <div className="currency">
              <label>$</label>
              <select></select>
            </div>
            <div className="cart">
              <button className="nav-label" onClick={this.controlModal}>
                <CartIcon />
              </button>
            </div>
          </div>
        </Nav>
        <Modal modal={this.state.modal} closeModal={this.closeModal} />
      </>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
