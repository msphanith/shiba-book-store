import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCartQuantity, removeFromCart } from '../../store/actions/cartActions';


class Item extends Component {

    constructor(props) {
        super(props);

        this.state = {
            quantity: this.props.item.quantity,
            btnVisible: false
        };
    }

    handleChange = (e) => {

        if(e.target.value <= 0) {
            alert("Quantity must be greater than or equal to 1");

            return;
        }
        // if(e.target.value = 2) {
        //     alert("You Got 10% Discount!");

        //     return ;
        // }
        //To check product with stock

        // if(e.target.value > this.props.item.product.amount) {
        //     alert("You have exceeded the available items of this product!");

        //     return;
        // }

        if(this.state.quantity != e.target.value) {
            this.setState({
                quantity: e.target.value,
                btnVisible: true
            });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.updateCartQuantity(this.props.item.product.id, this.state.quantity);

        this.setState({
            btnVisible: false
        });
    }

    handleRemove = (e) => {
        this.props.removeFromCart(this.props.item.product.id);
    }

  render() {

      const { item } = this.props;

      return (

          <div className="row">
              <div className="col-2"><img className="img-responsive" src={item.product.cover} />
              </div>
              <div className="col-6">
                  <p className="product-name"><strong>{item.product.title}</strong></p>
              </div>
              <div className="col-4">
                  <div className="col-3">
                      <h6><strong>{ item.product.price } <span className="text-muted">x</span></strong></h6>
                  </div>
                  <form onSubmit={this.handleSubmit}>
                      <div className="row">
                      <div className="col-4">
                          <input type="number" className="form-control input-sm" onChange={this.handleChange} value={this.state.quantity}/>
                      </div>

                      {
                          this.state.btnVisible?(
                              <div className="col-4">
                                  <button type="submit" className="btn btn-secondary">Update</button>
                              </div>
                          ) : null
                      }

                      <div className="col-2">
                          <button type="button" onClick={this.handleRemove} className="btn btn-link btn-xs">
                              <i className="fa fa-trash"> </i>
                          </button>
                      </div>
                      </div>
                  </form>
              </div>
          </div>
      )
  }
}

const mapDispatchToProps = (dispatch) => {

    return {
        updateCartQuantity: (productId, quantity) => dispatch(updateCartQuantity(productId, quantity)),
        removeFromCart: (productId) => dispatch(removeFromCart(productId))
    }
};

export default connect(null, mapDispatchToProps)(Item);