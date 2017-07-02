var React = require('react');
var AppActions = require('../actions/AppActions');

var RemoveFromCart = React.createClass({
    handler: function () {
        AppActions.removeItem(this.props.index);
    },
    render: function () {
        return <button className="close" onClick={this.handler}><i className="fa fa-close"></i></button>
    }
});

module.exports = RemoveFromCart;