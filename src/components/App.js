var React = require('react');
var Cart = require('./cart');
var Catalog = require('./catalog');

var App = React.createClass({
	render: function () {
		return (
			<div className="container appWrapper">
				
				<div className="col-md-8"><h1>Masalas &amp; Spices</h1><Catalog /></div>
				<div className="col-md-4"><h1>Cart</h1>
					<Cart /></div>

			</div>
		);
	}
});

module.exports = App;
