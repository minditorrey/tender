'use strict';

var app = angular.module('tenderApp');

app.service('ProfileService', function($http) {
	
	this.nameSort = (username) => {
		return $http.get(`/api/auctions/users/${username}`);
	}

	
})

app.service('AuctionsService', function($http) {

	this.getAll = () => {
    	return $http.get('/api/auctions');
  	};

	this.create = auction => {
    	return $http.post('/api/auctions', auction);
  	}
	
	this.update = auction => {
    	return $http.put(`/api/auctions/${auction._id}`, auction);
  	}

  	this.removeAuction = (auction) => {
  		return $http.delete(`/api/auctions/${auction._id}`)
  	}

  	this.getThisAuction = (id) => {
  		return $http.get(`/api/auctions/${id}`)
  	}

})





