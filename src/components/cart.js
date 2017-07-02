var React = require('react');
var AppStore = require('../stores/AppStore');
var RemoveFromCart = require('./removeFromCart');
var Increase = require('./increaseItem');
var Decrease = require('./decreaseItem');


function cartItems() {
    return { items: AppStore.getCart() }
}

var Cart = React.createClass({
    //default state
    getInitialState: function () {
        return cartItems();
    },
    componentWillMount: function () {
        AppStore.addChangeListener(this._onChange);
    },

    _onChange: function () {
        this.setState(cartItems())
    },

    render: function () {
        var total = 0;
        var items = this.state.items.map(function (item, i) {
            var subtotal = item.cost * item.qty;
            total += subtotal;

            return (
                <div className="cart_item" key={i}>
                    <div><RemoveFromCart index={i} /></div>
                    <div className="title">{item.title}</div>
                    <div className="itemqty">
                    
                   
                        <span><Increase index={i} /></span>
                        <span>{item.qty}</span><span>in Cart</span>
                        <span><Decrease index={i} /></span>
                    </div>
                    <div className="total">${subtotal}</div>
                </div>
            );
        })
        return (
            <div className="cart_wrapper">
           
                
                {items}
               
            </div>
        )
    }
});

module.exports = Cart;