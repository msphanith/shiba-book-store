import React, { Component } from "react";
import Item from "./Item";
import { connect } from "react-redux";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disPercent: 10,
      disAmount: 0,
      totalAmount: 0,
      initialValue: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.changeDis = this.changeDis.bind(this);
    this.disPlusOne = this.disPlusOne.bind(this);
    this.disMinusOne = this.disMinusOne.bind(this);
  }

  changeDis(disPercent) {
    const value = this.state.initialValue,
      disAmount = value * (disPercent / 100),
      totalAmount = Number(value) - disAmount;

    this.setState({
      disPercent: disPercent,
      disAmount: disAmount,
      totalAmount: totalAmount
    });
  }

  disPlusOne() {
    this.changeDis(this.state.disPercent + 1);
  }

  disMinusOne() {
    this.changeDis(this.state.disPercent - 1);
  }

  handleChange(e) {
    const disAmount = e.target.value * (this.state.disPercent / 100),
      totalAmount = Number(e.target.value) - disAmount;

    if (!isNaN(disAmount)) {
      this.setState({
        disAmount: disAmount,
        initialValue: e.target.value,
        totalAmount: totalAmount
      });
    }
  }

  render() {
    const divStyle = {
        minHeight: "11rem"
      },
      disInput = `${this.state.disPercent}%`;
    let total = 0;

    this.props.cart.map(
      (item) => (total += item.product.price * item.quantity)
    );

    const cart =
      this.props.cart.length > 0 ? (
        <div>
          <div className="card-body">
            {this.props.cart.map((item) => {
              return (
                <div key={item.product.id}>
                  <Item item={item} />
                  <hr />
                </div>
              );
            })}
          </div>
          <div className="card-footer">
            <div className="row align-center">
              <div className="col-11">
                <p>
                  Discount:{" "}
                  <strong>
                    {new Intl.NumberFormat("th-TH", {
                      style: "currency",
                      currency: "THB",
                      maximumSignificantDigits: 3
                    }).format(this.state.disAmount)}
                  </strong>
                </p>
                <h4 className="align-right">
                  Net{" "}
                  <strong>
                    {new Intl.NumberFormat("th-TH", {
                      style: "currency",
                      currency: "THB",
                      maximumSignificantDigits: 3
                    }).format(total - this.state.disAmount)}
                  </strong>
                </h4>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="card-body">
          <p>Cart is empty</p>
        </div>
      );

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-12">
            <div className="card card-info">
              <div className="card-header">
                <div className="card-title">
                  <div className="row">
                    <div className="col-6">
                      <h5>
                        <i className="fa fa-shopping-cart"></i> My Shopping Cart
                      </h5>
                    </div>
                  </div>
                </div>
              </div>

              {cart}
            </div>
          </div>
        </div>
        <hr />
        <div className="container">
          <h3>Discount Calculation</h3>
          <div className="row">
            <div className="col">
              <form>
                <div className="form-group">
                  <label htmlFor="amount">Harry Potter Book's Price</label>
                  <input
                    type="text"
                    id="amount"
                    className="form-control"
                    onChange={this.handleChange}
                    value={this.state.initialValue}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="tip-percent">Discount %</label>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={this.disMinusOne}
                      >
                        -
                      </button>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="tip-percent"
                      value={disInput}
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={this.disPlusOne}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="col">
              <div className="row align-items-center" style={divStyle}>
                <h5>Condition *</h5>
                <ul>
                  <li>
                    buy 2 unique series books discount 10% of those 2 books
                  </li>
                  <li>
                    buy 3 unique series books discount 11% of those 3 books
                  </li>
                  <li>
                    buy 4 unique series books discount 12% of those 4 books
                  </li>
                  <li>
                    buy 5 unique series books discount 13% of those 5 books
                  </li>
                  <li>
                    buy 6 unique series books discount 14% of those 6 books
                  </li>
                  <li>
                    buy 7 unique series books discount 15% of those 7 books
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart
  };
};

export default connect(mapStateToProps)(Cart);
