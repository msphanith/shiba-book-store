import React, { Component } from 'react';
import Item from './Item';
import { connect } from 'react-redux';

class Cart extends Component{
    
    render() {

        let total = 0;

        this.props.cart.map(item => total += item.product.price * item.quantity);

        const cart  = this.props.cart.length > 0?(
            <div>
                <div className="card-body">
                    {
                        this.props.cart.map(item => {
                            return (
                                <div key={item.product.id}>
                                    <Item item={item} />
                                  <hr/>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="card-footer">
                    <div className="row align-center">
                        <div className="col-11">
                            <h4 className="align-right">Net <strong>
                            {new Intl.NumberFormat("th-TH", {
                                    style: "currency",
                                    currency: "THB",
                                    maximumSignificantDigits: 3
                                    }).format(total)}
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
        )

        return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-12">
                            <div className="card card-info">
                                <div className="card-header">
                                    <div className="card-title">
                                        <div className="row">
                                            <div className="col-6">
                                                <h5><i className="fa fa-shopping-cart"></i> My Shopping Cart</h5>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                { cart }

                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}

const mapStateToProps = (state) => {

  return {
      cart: state.cart.cart
  }
};

export default connect(mapStateToProps)(Cart);