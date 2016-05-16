var express = require('express');
var router = express.Router();
var stormpath = require('express-stormpath');
var Auction = require('../models/auction');

router.get('/', (req, res) => {
  Auction.find({}, (err, auctions) => {
    res.status(err ? 400 : 200).send(err || auctions);
  });
});

router.post('/', (req, res) => {
	console.log(req.body);
  Auction.create(req.body, err => {
    res.status(err ? 400 : 200).send(err);
  });
});

router.get('/', (req, res) => {
  Auction.find({}, (err, auctions) => {
    res.status(err ? 400 : 200).send(err || auctions);
  });
});

router.route('/:id')
  .put((req, res) => {
    Auction.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, auction) => {
      res.status(err ? 400 : 200).send(err || auction);
    })
  })
  .delete((req, res) => {
    var auction = (req.body)
    Auction.findByIdAndRemove(req.params.id, (err, auction) => {
      res.status(err ? 400 : 200).send(err);
    })

  })

  .get((req, res) => {
    Auction.findById(req.params.id, function (err, auction) {
    res.status(err ? 400 : 200).send(err || auction);
    console.log('auction:', auction);
  });
});





router.post('/', (req, res) => {
	console.log(req.body);
  Auction.create(req.body, err => {
    res.status(err ? 400 : 200).send(err);
  });
});

router.route('/details/:id')
  	.post((req, res) => {
	console.log('details/id: req.body:', req.body)
    Auction.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, auction) => {
      res.status(err ? 400 : 200).send(err || auction);
    })
  })

router.route('/users/:username')
	.get((req, res) => {
		console.log(req.params.username)
		Auction
		.find({username: req.params.username})
		.exec((err, auctions) => {
			console.log(auctions)
			res.status(err ? 400 : 200).send(err || auctions);
		})
	})

module.exports = router;