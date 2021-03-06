'use strict';

var mongoose = require('mongoose');

var auctionSchema = new mongoose.Schema({
  item: { type: String, required: true},
  itemImage: { type: String, required: true},
  username: { type: String, required: true},
  initialBid: { type: Number, required: true },
  itemDescription: { type: String, required: true },
  exp: { type: String, required: true}, 
  highestBid: {
  	value: { type: Number },
  	user: { type: String }
  }
});

var Auction = mongoose.model('Auction', auctionSchema);

module.exports = Auction;

