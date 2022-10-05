import React, { Component } from "react";

export default class NavLink extends Component {
  render() {
    const isSelected = this.props.Selected;
    return (
      <>
        {isSelected ? (
          <div className="nav-label-wrap nav-label-wrap-highlighted  ">
            <button type="a" className="nav-label nav-label-highlighted" onClick={this.props.setSelected}>
              {this.props.link}
            </button>
          </div>
        ) : (
          <div className="nav-label-wrap  ">
            <button type="a" className="nav-label " onClick={this.props.setSelected}>
              {this.props.link}
            </button>
          </div>
        )}
      </>
    );
  }
}
