import React, { Component } from "react";

export class CategoryName extends Component {
  render() {
    return (
      <>
        <div className="category-component">
          <h1>
            {this.props.isAll ? "All" : null}
            {this.props.isTech ? "Tech" : null}
            {this.props.isClothes ? "Clothes" : null}
          </h1>
        </div>
      </>
    );
  }
}

export default CategoryName;
