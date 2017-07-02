var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _catalog = require('../data/product-list');

var CHANGE_EVENT = 'change';

//initialize empty array

var _catalog = [];

// push items to array
// static data
for (var i = 1; i < 7; i++) {
	_catalog.push({
		'id': 'Product' + i,
		'title': 'Product #' + i,
		'summary': 'This is an awesome product',
		'description': 'Healthy and Tasty',
		'cost': i
	});
}

var _cartItems = [];

//remove item form the shopping cart
function _removeItem(index) {
	_cartItems[index].inCart = false;
	_cartItems.splice(index, 1);
}

//increase item on click
function _increaseItem(index){
	_cartItems[index].qty++;
}

function _decreaseItem(index){
	if(_cartItems[index] .qty > 1){
		_cartItems[index].qty--;
	}
	else{
		_removeItem(index);
	}
}

//add item to the AppStore

function _addItem(item){
	if(!item.inCart){
		item['qty'] = 1;
		item['inCart'] = true;
		_cartItems.push(item);
	}
	else {
		_cartItems.forEach(function(cartItem, i){
			if(cartItem.id === item.id){
				_increaseItem(i);
			}
		});
	}
}

//calculate cart total

function _cartTotals(){
	var qty = 0,total = 0;
	_cartItems.forEach(function(cartItem){
		qty+=cartItem.qty;
		total+=cartItem.qty*cartItem.cost;
	});
	return {'qty': qty, 'total': total};
}


var AppStore = assign(EventEmitter.prototype, {
	emitChange: function () {
		this.emit(CHANGE_EVENT);
	},
	addChangeListener: function (callback) {
		this.on(CHANGE_EVENT, callback);
	},
	removeChangeListener: function (callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},
	getCart:function(){
		return _cartItems;
	},
	getCatalog:function(){
		return _catalog;
	},
	getCartTotals:function(){
		return _cartTotals();
	},
	dispatcherIndex:AppDispatcher.register(function(payload){
		var action = payload.action;
		switch(action.actionType){
			case AppConstants.ADD_ITEM:
			_addItem(payload.action.item);
			break;
			case AppConstants.REMOVE_ITEM:
			_removeItem(payload.action.index);
			break;
			case AppConstants.INCREASE_ITEM:
			_increaseItem(payload.action.index);
			break;
			case AppConstants.DECREASE_ITEM:
			_decreaseItem(payload.action.index);
			break;
		}
		AppStore.emitChange();
		return true;
	})
});


module.exports = AppStore;