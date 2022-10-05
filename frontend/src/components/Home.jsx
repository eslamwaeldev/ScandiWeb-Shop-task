import React, { Component } from "react";
import { connect } from "react-redux";
import CategoryName from "./CategoryName";
import Item from "./Item";
import Navbar from "./Navbar";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isWomen: true,
      isMen: false,
      isKids: false,
    };
    this.handleWomenSelected = this.handleWomenSelected.bind(this);
    this.handleMenSelected = this.handleMenSelected.bind(this);
    this.handleKidsSelected = this.handleKidsSelected.bind(this);
  }
  handleWomenSelected() {
    this.setState({
      isWomen: true,
      isMen: false,
      isKids: false,
    });
  }
  handleMenSelected() {
    this.setState({
      isWomen: false,
      isMen: true,
      isKids: false,
    });
  }
  handleKidsSelected() {
    this.setState({
      isWomen: false,
      isMen: false,
      isKids: true,
    });
  }

  render() {
    return (
      <>
        <Navbar
          isWomen={this.state.isWomen}
          handleWomen={this.handleWomenSelected}
          isMen={this.state.isMen}
          handleMen={this.handleMenSelected}
          isKids={this.state.isKids}
          handleKids={this.handleKidsSelected}
        />
        <CategoryName isWomen={this.state.isWomen} isMen={this.state.isMen} isKids={this.state.isKids} />
        <div className="grid-container">
          <Item title="Apollo running short" price="$50" />
          <Item title="Apollo running short" price="$50" />
          <Item title="Apollo running short" price="$50" />
          <Item title="Apollo running short" price="$50" />
          <Item title="Apollo running short" price="$50" />
          <Item title="Apollo running short" price="$50" />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
