'use strict';

var app = angular.module('tenderApp');

//on click of item, ui-sref to the details view and trigger
//a get request by id and send that data to the details view and render
//use a resolve instead of a callback.

app.controller('homeController', function($scope) {
    console.log('homeCtrl!');


});

app.controller('auctionsController', function($scope, AuctionsService) {
    console.log('auctionsCtrl!');

    AuctionsService.getAll($scope.auctions)
    .then(res => {
        $scope.auctions = res.data;
        var auctions = $scope.auctions;
        console.log('auctions:', auctions)
        console.log('res.data:', res.data)
    })
    .catch(err => {
        console.log('err:', err);
    });

    $scope.addAuction = function(thisAuctionEdit) {
    	AuctionsService.create($scope.thisAuctionEdit);
    	$scope.auctions.push($scope.thisAuctionEdit);
    	console.log('thisAuction:', $scope.thisAuctionEdit)
        $scope.thisAuctionEdit = null;
    }

    $scope.auctionForm = true;

	$scope.showAuctionForm = function() {
		$auctionForm = true;
	}

	$scope.showAuctionForm = function() {
    	if($scope.auctionForm = false) {
    $scope.auctionForm = true;  
    	} else {
    $scope.auctionForm = false;
    	};
  	};

  	$scope.auctions = [];
  	$scope.saveAuctionsForm = function(thisAuctionEdit) {
    	AuctionsService.create($scope.thisAuctionEdit);
    	console.log($scope.thisAuctionEdit);
    	$scope.thisAuctionForm = $scope.auctionForm;  
    	$scope.auctions.push($scope.thisAuctionForm);
    	$scope.updateAuction();
    	$scope.thisAuctionForm = "null";
    	$scope.auctionForm = true;
    
  	}

    $scope.editAuction = (auction) => {
    	$scope.thisAuctionEdit = auction;
    	$scope.showAuctionForm(); 
    	$scope.editFormAuction = angular.copy(auction); 
    }

  	$scope.saveChanges = (thisAuctionEdit) => {
    	console.log(thisAuctionEdit)
    	AuctionsService.update(thisAuctionEdit) 	
      	.then(res => {
        	$scope.auctions.forEach((auction, i) => {
        	  	if(auction._id === res.data._id) {
        	    	$scope.auctions[i] = res.data;
          		}
        	})
  
        	$scope.auctions.push($scope.thisAuctionEdit);
        	$scope.thisAuctionEdit = null;

      	})
    }

    $scope.cancelEdit = () => {
    	$scope.thisAuctionEdit = null;
    };

    $scope.removeAuction = function(auction) {
        AuctionsService.removeAuction(auction);
        $scope.auctions.splice(0, 1);
        location.reload;
    }



});

app.controller('profilesController', function($scope, $rootScope, AuctionsService, ProfileService) {
    console.log('profileCtrl!');
    console.log('user:', $scope.user);

	var username = $rootScope.user.username;
    $scope.user = $rootScope.user;
	$scope.profilePic = $rootScope.user.customData.profilePic;
    // ProfileService.emailSort(email)
    // .then(res => {
    // 	$scope.auctions = res.data;
    // 	var auctions = $scope.auctions;
    // })

	ProfileService.nameSort(username)
	 .then(res => {
    	$scope.auctions = res.data;
    	var auctions = $scope.auctions;
    })



	// AuctionsService.getAll($scope.auctions)
 //    .then(res => {
 //        $scope.auctions = res.data;
 //        var auctions = $scope.auctions;
 //        console.log('auctions:', auctions)
 //        console.log('res.data:', res.data)

 //    })
 //    .catch(err => {
 //        console.log('err:', err);
 //    });

});