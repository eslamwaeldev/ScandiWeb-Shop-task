import { Query } from "@apollo/react-components";
import { FIND_PRODUCT } from "./queries";
import React, { Component } from "react";
import SideImg from "./SideImg";
import SizeBtn from "./SizeBtn";
import ColorBtn from "./ColorBtn";

export default class ItemPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chosenSize: "",
      chosenColor: "",
    };
    this.setChosenColor = this.setChosenColor.bind(this);
    this.setChosenSize = this.setChosenSize.bind(this);
  }
  setChosenColor(color) {
    this.setState({
      ...this.state,
      chosenColor: color,
    });
  }
  setChosenSize(size) {
    this.setState({
      ...this.state,
      chosenSize: size,
    });
  }
  render() {
    console.log("inside item page");
    return (
      <>
        <Query query={FIND_PRODUCT} variables={{ product: this.props.itemId }} fetchPolicy="no-cache">
          {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return <h1>Error!..</h1>;
            console.log(data);
            const { product } = data;
            return (
              <>
                <div className="item-page">
                  <div className="side-imgs">
                    <SideImg gallery={product.gallery} />
                  </div>
                  <div className="item-container">
                    <img className="main-img" src={product.gallery[0]} alt={product.name} />
                    <div className="item-details">
                      <h1>{product.name}</h1>
                      {product.attributes.length > 0 &&
                      product.attributes[0].type &&
                      product.attributes[0].type === "text" ? (
                        <div className="item-options-container">
                          <p className="item-option-title">Size:</p>
                          <div className="item-options-containers">
                            {product.attributes[0].items &&
                              product.attributes[0].items.map((size) => {
                                return (
                                  <SizeBtn
                                    key={size.id}
                                    setChosenSize={this.setChosenSize}
                                    size={size.value}
                                    chosenSize={this.state.chosenSize}
                                  />
                                );
                              })}
                          </div>
                        </div>
                      ) : (
                        <div className="item-options-container">
                          <p className="item-option-title">Color:</p>
                          <div className="item-options-containers">
                            {product.attributes[0].items &&
                              product.attributes[0].items.map((color) => {
                                return (
                                  <ColorBtn
                                    key={color.id}
                                    color={color.value}
                                    chosenColor={this.state.chosenColor}
                                    setChosen={this.setChosenColor}
                                    defaultColorChosen={this.state.defaultColorChosen}
                                    setDefaultChosenColor={this.setDefaultChosenColor}
                                  />
                                );
                              })}
                          </div>
                        </div>
                      )}
                      <div className="item-page-price">
                        <p className="item-option-title">Price:</p>
                        <p className="item-option-title price-size"></p>
                        {/* get the currency from nav bar and show price depending on it */}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          }}
        </Query>
      </>
    );
  }
}
