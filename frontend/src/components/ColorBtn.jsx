import React, { Component } from "react";

export default class ColorBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: this.props.color,
    };
  }

  render() {
    return (
      <>
        <div
          className={`${
            this.state.color === this.props.chosenColor && "color-btn-container-chosen"
          } color-btn-container `}
        >
          <button
            className="color-btn"
            style={{ backgroundColor: this.state.color }}
            onClick={() => {
              this.props.setChosen(this.state.color);
              this.props.setColor && this.props.setColor(this.props.color, this.state.color);
            }}
          ></button>
        </div>
      </>
    );
  }
}
