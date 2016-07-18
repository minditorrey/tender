'use strict';

var app = angular.module('tenderApp');

app.controller('homeController', function($scope) {
});

app.controller('detailsController', function($rootScope, $scope, $state, $stateParams, AuctionsService) {
    AuctionsService.getThisAuction($stateParams.id)
    .then(res => {
        $scope.auction = res.data;
    })
    .catch(err => {
        console.log('err:', err);
    });

    $scope.auctionForm = true;

    $scope.showAuctionForm = function() {
        if($scope.auctionForm = false) {
            $scope.auctionForm = true;  
        } else {
            $scope.auctionForm = false;
        };
    };

    $scope.editAuction = (auction) => {
        if($scope.user.username === $scope.auction.username) {
            alert("You can't bid on your own items.");
        } else {
            $scope.thisAuctionEdit = auction;
            $scope.showAuctionForm(); 
            $scope.editFormAuction = angular.copy(auction); 
        }
    }
    $scope.saveChanges = (thisAuctionEdit) => {
        if($scope.thisAuctionEdit.highestBid.value < ($scope.auction.highestBid.value && $scope.auction.initialBid)) {
            alert("Bids must be greater than the initial bid and the current highest bid.");            
        } else {
            AuctionsService.update(thisAuctionEdit)  
                .then(res => {
                    if(thisAuctionEdit._id === res.data._id) {
                        $scope.auction = res.data;
                        $scope.showAuctionForm();
                    } 
                    $scope.auctionForm = true;
                    $scope.changeState(); 
                })
        }
    }

    $scope.cancelEdit = () => {
        $scope.thisAuctionEdit = null;
        $scope.auctionForm = true;
    };

    $scope.removeAuction = function(auction) {
        AuctionsService.removeAuction(auction);
        $scope.auctions.splice(0, 1); 
        $scope.changeState();   
    }

    $scope.changeState = function () {
        $state.go('auctions');
    };
});

app.controller('auctionsController', function($scope, AuctionsService, $stateParams) {
    AuctionsService.getAll()
    .then(res => {
        $scope.auctions = res.data;
        var auctions = $scope.auctions;
    })
    .catch(err => {
        console.log('err:', err);
    });

    $scope.addAuction = function(thisAuctionEdit) {
    	AuctionsService.create($scope.thisAuctionEdit);
    	$scope.auctions.push($scope.thisAuctionEdit);
        $scope.thisAuctionEdit = null;
        $scope.auctionForm = true;
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

    $scope.editAuction = (auction) => {
        $scope.thisAuctionEdit = auction;
        $scope.showAuctionForm(); 
        $scope.editFormAuction = angular.copy(auction); 
    }

    $scope.saveChanges = (thisAuctionEdit) => {
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
        $scope.auctionForm = true;  
    };

    $scope.removeAuction = function(auction) {
        AuctionsService.removeAuction(auction);
        $scope.auctions.splice(0, 1);
        location.reload;
    }

});

app.controller('profilesController', function($scope, $state, $rootScope, AuctionsService, ProfileService) {
    var username = $rootScope.user.username;
    $scope.user = $rootScope.user;
    $scope.profilePic = $rootScope.user.customData.profilePic;

    ProfileService.nameSort(username)
        .then(res => {
            $scope.auctions = res.data;
        })

        $scope.editAuction = (auction) => {
            $scope.thisAuctionEdit = auction;
            $scope.showAuctionForm(); 
            $scope.editFormAuction = angular.copy(auction); 
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

    $scope.saveChanges = (thisAuctionEdit) => {
        AuctionsService.update(thisAuctionEdit)     
        .then(res => {
            $scope.auctions.forEach((auction, i) => {
                if(auction._id === res.data._id) {
                $scope.auctions[i] = res.data;
                }
            })

        $state.go('auctions');
        $scope.thisAuctionEdit = null;
        $scope.auctionForm = true;
        })
    }

    $scope.cancelEdit = () => {
        $scope.thisAuctionEdit = null;
        $scope.auctionForm = true;
    };

    $scope.removeAuction = function(auction) {
        AuctionsService.removeAuction(auction);
        $scope.auctions.splice(0, 1);
        location.reload;
    }

});