import React, { Component } from "react";

export default class SideImg extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chosen: false,
    };
    this.handleChosen = this.handleChosen.bind(this);
    this.handleNotChosen = this.handleNotChosen.bind(this);
  }
  handleChosen() {
    this.setState({
      chosen: true,
    });
  }
  handleNotChosen() {
    this.setState({
      chosen: false,
    });
  }

  render() {
    return (
      <>
        {this.props.gallery.map((itemImg, index) => {
          return index > 0 && <img key={index} className={"side-img"} src={itemImg} alt="item-img" />;
        })}
      </>
    );
  }
}
