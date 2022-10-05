import React, { Component } from "react";

export class Logo extends Component {
  render() {
    return (
      <>
        <div className="logo-container">
          <img className="logo" alt="logo" src={require("../assets/logo.png")} />
        </div>
      </>
    );
  }
}

export default Logo;
