var React = require('react');
var AppStore = require('../stores/AppStore');
var AddToCart = require('./addToCart');

function getCatalog() {
    return { items: AppStore.getCatalog() }
};

var Catalog = React.createClass({
    getInitialState: function () {
        return getCatalog()
    },
    render: function () {
        var items = this.state.items.map(function (item) {
            return (
                <div className="col-md-4">
                    <div className="card">
                        <div key={item.id}></div>
                        <div className="title">{item.title}</div>
                        <div className="summary">{item.summary}</div>
                        <div className="cost">${item.cost}</div>
                        <div><AddToCart item={item} /></div>
                    </div>
                </div>
            );
        })
        return (
            <div className="card_wrapper clearfix">

                {items}

            </div>
        )
    }
})

module.exports = Catalog;