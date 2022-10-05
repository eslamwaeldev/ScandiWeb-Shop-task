import React, { Component } from "react";
import { connect } from "react-redux";
import Home from "./Home.jsx";

export class App extends Component {
  render() {
    return (
      <>
        <Home />
      </>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
