import React, { Component } from "react";

export class CategoryName extends Component {
  render() {
    return (
      <>
        <div className="category-component">
          <h1>
            {this.props.isWomen ? "Women" : null}
            {this.props.isMen ? "Men" : null}
            {this.props.isKids ? "Kids" : null}
          </h1>
        </div>
      </>
    );
  }
}

export default CategoryName;
