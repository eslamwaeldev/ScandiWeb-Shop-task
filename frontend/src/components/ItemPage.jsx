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
      chosenSize: this.props.size && this.props.size,
      chosenColor: this.props.color && this.props.color,
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
  componentDidMount() {
    this.props.size &&
      this.setState({
        ...this.state,
        chosenSize: this.props.size,
      });
    this.props.color &&
      this.setState({
        ...this.state,
        chosenColor: this.props.color,
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
            const { description } = product;
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
                                    setSize={this.props.setSize}
                                    id={this.props.itemId}
                                  />
                                );
                              })}
                          </div>
                        </div>
                      ) : (
                        <div className="item-options-container">
                          {product.attributes.length > 0 && product.attributes[0].items && (
                            <>
                              <p className="item-option-title">Color:</p>
                              <div className="item-options-containers">
                                {product.attributes[0].items.map((color) => {
                                  return (
                                    <ColorBtn
                                      key={color.id}
                                      color={color.value}
                                      chosenColor={this.state.chosenColor}
                                      setChosen={this.setChosenColor}
                                      defaultColorChosen={this.state.defaultColorChosen}
                                      setDefaultChosenColor={this.setDefaultChosenColor}
                                      setColor={this.props.setColor}
                                      id={this.props.itemId}
                                    />
                                  );
                                })}
                              </div>
                            </>
                          )}
                        </div>
                      )}
                      <div className="item-page-price">
                        <p className="item-option-title">Price:</p>
                        <p className="item-option-title price-size">
                          {
                            product.prices[this.props.USD ? 0 : this.props.EUR ? 1 : this.props.JPY ? 3 : 0].currency
                              .symbol
                          }
                          {product.prices[this.props.USD ? 0 : this.props.EUR ? 1 : this.props.JPY ? 3 : 0].amount}
                        </p>
                      </div>
                      <div className="item-btn-container">
                        <button
                          className="btn-cart btn-green item-page-add-btn"
                          onClick={() => {
                            this.props.addToCart(this.props.itemId);
                          }}
                        >
                          Add to cart
                        </button>
                      </div>
                      <div className="description">
                        <div className="" dangerouslySetInnerHTML={{ __html: description }}></div>
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
