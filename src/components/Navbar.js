import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class Navbar extends Component {

    render() {

        this.props.cartUpdated();

        let total = 0;

        this.props.cart.map(item => total += item.product.price * item.quantity);

        return (

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <NavLink className="navbar-brand" to="/">SHIBA BOOK SHOP </NavLink>
                    </div>

                    <div className="navbar-text" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-right">
                            <li><NavLink to="/my-cart">
                                {
                                    this.props.cart.length > 0 ? (
                                        <span className="label label-info">{ this.props.cart.length } items: (${total.toFixed(2)})</span>
                                    ) : null
                                }
                                <i class="fas fa-shopping-cart"></i> Shopping Card</NavLink></li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        cart: state.cart.cart,
        cartUpdated: () => { return true }
    }
};

export default connect(mapStateToProps)(Navbar);