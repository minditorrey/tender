var app = angular.module('tenderApp', ['ui.router', 'countdownTimer', 'stormpath', 'stormpath.templates']);

app.run(function($stormpath){
  $stormpath.uiRouter({
    loginState: 'login',
    defaultPostLoginState: 'home'
  });
});

app.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: '/templates/home.html',
			controller: 'homeController'
		})
    	.state('login', { 
    		url: '/login', 
    		templateUrl: '/templates/login.html' 
    	})
    	.state('register', { 
    		url: '/register', 
    		templateUrl: '/templates/register.html' 
    	})
    	.state('auctions', {
			url: '/auctions',
			templateUrl: '/templates/auctions.html',
			controller: 'auctionsController',
			sp: {
				authenticate: true
			}
		})
		.state('profiles', {
			url: '/profiles',
			templateUrl: '/templates/profiles.html',
			controller: 'profilesController',
			sp: {
				authenticate: true
			}
		})		
		.state('details', {
			url: '/details/:id',
			templateUrl: '/templates/details.html',
			controller: 'detailsController',
			sp: {
				authenticate: true
			}
			// resolve: {
			// 	AUCTION: function($auction) {
			// 		return $auction.get();
			// 	}
			// }
		})



	$urlRouterProvider.otherwise('/');

});