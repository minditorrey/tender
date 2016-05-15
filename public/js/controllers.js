'use strict';

var app = angular.module('tenderApp');


app.controller('homeController', function($scope) {
    console.log('homeCtrl!');


});

app.controller('detailsController', function($rootScope, $scope, $state, $stateParams, AuctionsService) {
    console.log('detailsCtrl!');

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
       $scope.thisAuctionEdit = auction;
       $scope.showAuctionForm(); 
       $scope.editFormAuction = angular.copy(auction); 
    }

    $scope.saveChanges = (thisAuctionEdit) => {
       AuctionsService.update(thisAuctionEdit)  
       .then(res => {
            
            if(thisAuctionEdit._id === res.data._id) {
                $scope.auction = res.data;
                $scope.showAuctionForm();
            } 
        $scope.changeState(); 
        })

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

 //end detailsController

app.controller('auctionsController', function($scope, AuctionsService, $stateParams) {
    console.log('auctionsCtrl!');

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
    	// console.log('thisAuction:', $scope.thisAuctionEdit)
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

// $scope.auctions = [];
// $scope.saveAuctionsForm = function(thisAuctionEdit) {
//    AuctionsService.create($scope.thisAuctionEdit);
//    // console.log($scope.thisAuctionEdit);
//    $scope.thisAuctionForm = $scope.auctionForm;  
//    $scope.auctions.push($scope.thisAuctionForm);
//    $scope.updateAuction();
//    $scope.thisAuctionForm = "null";
//    $scope.auctionForm = true;

// }

    $scope.editAuction = (auction) => {
        $scope.thisAuctionEdit = auction;
        $scope.showAuctionForm(); 
        $scope.editFormAuction = angular.copy(auction); 
    }

    $scope.saveChanges = (thisAuctionEdit) => {
   // console.log(thisAuctionEdit)
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

// End auctionsController

app.controller('profilesController', function($scope, $rootScope, AuctionsService, ProfileService) {
    console.log('profileCtrl!');
    console.log('user:', $scope.user);

    var username = $rootScope.user.username;
    console.log('username', username);
    $scope.user = $rootScope.user;
    $scope.profilePic = $rootScope.user.customData.profilePic;


    ProfileService.nameSort(username)
        .then(res => {
            $scope.auctions = res.data;
        // var auctions = $scope.auctions;
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
   // console.log(thisAuctionEdit)
        AuctionsService.update(thisAuctionEdit)     
        .then(res => {
            $scope.auctions.forEach((auction, i) => {
                if(auction._id === res.data._id) {
                $scope.auctions[i] = res.data;
                }
            })

        $scope.auctions.push($scope.thisAuctionEdit);
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