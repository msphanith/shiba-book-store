import React, { Component } from 'react';

class Product extends Component
{
    state = {
        inCart: this.props.inCart
    };

    addToCart = (e) => {

        e.preventDefault();

        this.props.addToCart(this.props.product)

        this.setState({
            inCart: true
        })
    }

    render() {

        const { product } = this.props;

        return (
            <div className="col-md-3">
                <figure className="card card-product">
                    <div className="img-wrap">
                        <img className="img-responsive" src={product.cover} 
                        alt=''/>
                    </div>
                    <figcaption className="info-wrap">
                        <p className="title">{product.title}</p>
                    </figcaption>
                    <div className="bottom-wrap">

                        {
                            this.state.inCart?(
                                <span className="btn btn-success">Added to cart</span>
                            ) : (
                                <a href="#" onClick={this.addToCart} className="btn btn-sm btn-primary float-right">Add to cart</a>
                            )
                        }

                        <div className="price-wrap">
                            <span className="price-new">
                            {new Intl.NumberFormat("th-TH", {
                                style: "currency",
                                currency: "THB",
                                maximumSignificantDigits: 3
                                }).format(product.price )}
                            </span>
                        </div>
                    </div>
                </figure>
            </div>
        )
    }
}

export default Product;