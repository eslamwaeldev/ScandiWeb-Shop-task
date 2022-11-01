import React, { Component } from "react";

export class CategoryName extends Component {
  render() {
    return (
      <>
        <div className="category-component">
          <h1>
            {this.props.isAll && "All"}
            {this.props.isTech && "Tech"}
            {this.props.isClothes && "Clothes"}
            {this.props.isCart && "Cart"}
          </h1>
        </div>
      </>
    );
  }
}

export default CategoryName;
