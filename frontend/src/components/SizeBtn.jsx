import React, { Component } from "react";

export default class SizeBtn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      size: this.props.size,
    };
  }
  render() {
    return (
      <>
        <button
          className={`${this.props.chosenSize === this.state.size && "size-btn-chosen"} size-btn`}
          onClick={() => {
            this.props.setChosenSize(this.state.size);
            this.props.setSize && this.props.setSize(this.props.id, this.state.size);
          }}
        >
          {this.props.size}
        </button>
      </>
    );
  }
}
