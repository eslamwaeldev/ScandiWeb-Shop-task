import React, { Component } from "react";
import { Query } from "@apollo/react-components";
import { FIND_ALL_ITEMS, all } from "./queries";
import Item from "./Item";

export default class AllItems extends Component {
  render() {
    const currency = this.props.USD ? 0 : this.props.EUR ? 1 : this.props.JPY ? 3 : 0;

    return (
      <>
        <Query query={FIND_ALL_ITEMS} variables={{ title: all }}>
          {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return <h1>Error!..</h1>;
            return (
              <>
                <div className="grid-container">
                  {data.category.products.map((product, index) => {
                    return (
                      <Item
                        key={index}
                        id={product.id}
                        title={product.name}
                        price={product.prices[currency].amount}
                        currency={product.prices[currency].currency.symbol}
                        img={product.gallery[0]}
                        inStock={product.inStock}
                        addToCart={this.props.addToCart}
                      />
                    );
                  })}
                </div>
              </>
            );
          }}
        </Query>
      </>
    );
  }
}
