import React, { Component } from "react";
import CategoryName from "./CategoryName";
import Navbar from "./Navbar";
import AllItems from "./AllItems";
import TechItems from "./TechItems";
import ClothesItems from "./ClothesItems";
import ItemPage from "./ItemPage";
import Cart from "./Cart";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAll: true,
      isTech: false,
      isClothes: false,
      isUSD: true,
      isEUR: false,
      isJPY: false,
      currencyClicked: false,
      modal: false,
      itemsIDs: [],
      isHome: true,
      isItem: false,
      isCart: false,
      clickedItemId: "",
      totalPrice: 0,
      quantity: {},
    };
    this.handleUSDSelected = this.handleUSDSelected.bind(this);
    this.handleEURSelected = this.handleEURSelected.bind(this);
    this.handleJPYSelected = this.handleJPYSelected.bind(this);
    this.handleAllSelected = this.handleAllSelected.bind(this);
    this.handleTechSelected = this.handleTechSelected.bind(this);
    this.handleClothesSelected = this.handleClothesSelected.bind(this);
    this.controlModal = this.controlModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleCurrencyClicked = this.handleCurrencyClicked.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.handleCartPage = this.handleCartPage.bind(this);
    this.handleItemPage = this.handleItemPage.bind(this);
    this.handleClickedItemId = this.handleClickedItemId.bind(this);
    this.handleAddToTotalPrice = this.handleAddToTotalPrice.bind(this);
    this.handleSubtractFromTotalPrice = this.handleSubtractFromTotalPrice.bind(this);
    this.resetTotalPrice = this.resetTotalPrice.bind(this);
    this.handleQuantity = this.handleQuantity.bind(this);
    this.removeFromQuantity = this.removeFromQuantity.bind(this);
  }
  addToCart(id) {
    if (this.state.itemsIDs.includes(id) === false) {
      console.log("inside if");
      this.setState({
        ...this.state,
        itemsIDs: this.state.itemsIDs.concat([id]),
      });
    }
  }
  removeFromCart(id) {
    const newItemsArr = this.state.itemsIDs.filter((item) => item !== id);
    this.setState({
      ...this.state,
      itemsIDs: newItemsArr,
    });
  }
  handleUSDSelected() {
    this.setState({
      ...this.state,
      isUSD: true,
      isEUR: false,
      isJPY: false,
    });
  }
  handleEURSelected() {
    this.setState({
      ...this.state,
      isUSD: false,
      isEUR: true,
      isJPY: false,
    });
  }
  handleJPYSelected() {
    this.setState({
      ...this.state,
      isUSD: false,
      isEUR: false,
      isJPY: true,
    });
  }

  handleAllSelected() {
    this.setState({
      ...this.state,
      isAll: true,
      isTech: false,
      isClothes: false,
      isHome: true,
      isCart: false,
      isItem: false,
    });
  }
  handleTechSelected() {
    this.setState({
      ...this.state,
      isAll: false,
      isTech: true,
      isClothes: false,
      isHome: true,
      isCart: false,
      isItem: false,
    });
  }
  handleClothesSelected() {
    this.setState({
      ...this.state,
      isAll: false,
      isTech: false,
      isClothes: true,
      isHome: true,
      isCart: false,
      isItem: false,
    });
  }
  handleCartPage() {
    this.setState({
      ...this.state,
      isAll: false,
      isTech: false,
      isClothes: false,
      isHome: false,
      isCart: true,
      isItem: false,
      modal: false,
    });
  }
  handleItemPage() {
    this.setState({
      ...this.state,
      isAll: false,
      isTech: false,
      isClothes: false,
      isHome: false,
      isCart: false,
      isItem: true,
    });
  }
  handleClickedItemId(id) {
    this.setState({
      ...this.state,
      clickedItemId: id,
    });
  }
  controlModal() {
    this.setState({
      ...this.state,
      modal: !this.state.modal,
    });
  }
  closeModal(e) {
    if (e.target.id === "myModal") {
      this.setState({
        ...this.state,
        modal: false,
      });
    }
  }
  handleCurrencyClicked() {
    this.setState({
      ...this.state,
      currencyClicked: !this.state.currencyClicked,
    });
  }
  handleAddToTotalPrice(price) {
    this.setState((prevState) => ({
      totalPrice: prevState.totalPrice + price,
    }));
  }
  handleSubtractFromTotalPrice(price) {
    this.setState({
      totalPrice: this.state.totalPrice - price,
    });
  }
  resetTotalPrice(e) {
    console.log("reset");
    console.log(e.target.id);
    if (e.target.id === "myModal") {
      this.setState({
        totalPrice: 0,
      });
    }
  }
  handleQuantity(id, amount) {
    this.setState({
      ...this.state,
      quantity: {
        ...this.state.quantity,
        [id]: amount,
      },
    });
    console.log(this.state.quantity);
  }
  removeFromQuantity(id) {
    this.setState({
      ...this.state,
      quantity: {
        ...this.state.quantity,
        [id]: undefined,
      },
    });
  }

  render() {
    return (
      <>
        <div className="container">
          <Navbar
            isAll={this.state.isAll}
            handleAll={this.handleAllSelected}
            isTech={this.state.isTech}
            handleTech={this.handleTechSelected}
            isClothes={this.state.isClothes}
            handleClothes={this.handleClothesSelected}
            controlModal={this.controlModal}
            isUSD={this.state.isUSD}
            handleUSD={this.handleUSDSelected}
            isEUR={this.state.isEUR}
            handleEUR={this.handleEURSelected}
            isJPY={this.state.isJPY}
            handleJPY={this.handleJPYSelected}
            currencyClicked={this.state.currencyClicked}
            handleCurrency={this.handleCurrencyClicked}
            modal={this.state.modal}
            closeModal={this.closeModal}
            USD={this.state.isUSD}
            EUR={this.state.isEUR}
            JPY={this.state.isJPY}
            itemsIDs={this.state.itemsIDs}
            removeItem={this.removeFromCart}
            handleCartPage={this.handleCartPage}
            handleAddToTotalPrice={this.handleAddToTotalPrice}
            handleSubtractFromTotalPrice={this.handleSubtractFromTotalPrice}
            resetTotalPrice={this.resetTotalPrice}
            handleQuantity={this.handleQuantity}
            removeFromQuantity={this.removeFromQuantity}
            quantity={this.state.quantity}
            totalPrice={this.state.totalPrice}
          />
          {this.state.isHome && (
            <CategoryName isAll={this.state.isAll} isTech={this.state.isTech} isClothes={this.state.isClothes} />
          )}
          {this.state.isAll && (
            <AllItems
              USD={this.state.isUSD}
              EUR={this.state.isEUR}
              JPY={this.state.isJPY}
              addToCart={this.addToCart}
              handleItemPage={this.handleItemPage}
              handleClickedItemId={this.handleClickedItemId}
            />
          )}
          {this.state.isTech && (
            <TechItems
              USD={this.state.isUSD}
              EUR={this.state.isEUR}
              JPY={this.state.isJPY}
              addToCart={this.addToCart}
              handleItemPage={this.handleItemPage}
              handleClickedItemId={this.handleClickedItemId}
            />
          )}
          {this.state.isClothes && (
            <ClothesItems
              USD={this.state.isUSD}
              EUR={this.state.isEUR}
              JPY={this.state.isJPY}
              addToCart={this.addToCart}
              handleClickedItemId={this.handleClickedItemId}
              handleItemPage={this.handleItemPage}
            />
          )}
          {this.state.isCart && <Cart />}
          {this.state.isItem && (
            <ItemPage
              itemId={this.state.clickedItemId}
              USD={this.state.isUSD}
              EUR={this.state.isEUR}
              JPY={this.state.isJPY}
              addToCart={this.addToCart}
            />
          )}
        </div>
      </>
    );
  }
}
