var React = require('react');
var AppActions = require('../actions/AppActions');

var AddToCart = React.createClass({
    handler: function () {
        AppActions.addItem(this.props.item);
    },
    render: function () {
        return <button className="btn btn-primary" onClick={this.handler}>Add To Cart</button>
    }
})

module.exports = AddToCart;