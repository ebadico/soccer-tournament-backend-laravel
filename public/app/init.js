angular.module('app', [
	'ui.router'
])

.config(function($stateProvider, $urlRouterProvider) {
  
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");
  //
  // Now set up the states
  $stateProvider
		
		/**
	    * PUBLIC
	    */
    .state('public', {
      url: "/",
      templateUrl: 'app/public/public-template.html'
    })
      .state('public.login', {
        url: "/login",
        templateUrl: 'app/user/login.html',
        controller: 'LoginCtrl'
      })

	   /**
	    * ADMIN
	    */
    .state('admin', {
      cache: false,
    	url:'/admin',
    	templateUrl: 'app/admin/admin-template.html',
    })
      .state('admin.user', {
      	url:'/user',
      	templateUrl: 'app/user/index.html',
      	controller: 'UserCtrl'
      })
      .state('admin.create-user', {
      	url:'/create/user',
      	templateUrl: 'app/user/create.html',
      	controller: 'UserCtrl'
      })

      .state('admin.season', {
        url:'/season',
        templateUrl: 'app/season/index.html',
        controller: 'SeasonCtrl',
      })
      .state('admin.create-season', {
        url:'/create/season',
        templateUrl: 'app/season/create.html',
        controller: 'SeasonCtrl',
      })

      .state('admin.round', {
        url:'/round',
        templateUrl: 'app/round/index.html',
        controller: 'RoundCtrl',
      })
      .state('admin.create-round', {
        url:'/create/round',
        templateUrl: 'app/round/create.html',
        controller: 'RoundCtrl',
      })

      .state('admin.day', {
        url:'/day',
        templateUrl: 'app/day/index.html',
        controller: 'DayCtrl',
      })
      .state('admin.create-day', {
        url:'/create/day',
        templateUrl: 'app/day/create.html',
        controller: 'DayCtrl',
      })

      .state('admin.team', {
        url:'/team',
        templateUrl: 'app/team/index.html',
        controller: 'TeamCtrl',
      })
      .state('admin.create-team', {
        url:'/create/team',
        templateUrl: 'app/team/create.html',
        controller: 'TeamCtrl',
      })

      .state('admin.player', {
        url:'/player',
        templateUrl: 'app/player/index.html',
        controller: 'PlayerCtrl',
      })
      .state('admin.create-player', {
        url:'/create/player',
        templateUrl: 'app/player/create.html',
        controller: 'PlayerCtrl',
      })

      .state('admin.match', {
        url:'/match',
        templateUrl: 'app/match/index.html',
        controller: 'MatchCtrl',
      })
      .state('admin.create-match', {
        url:'/create/match',
        templateUrl: 'app/match/create.html',
        controller: 'MatchCtrl',
      })
      .state('admin.match-result', {
        url:'/match/result',
        templateUrl: 'app/match/result.html',
        controller: 'MatchCtrl',
      })
})


.run(function($rootScope, Season){

  Season
    .getCurrentSeason(function(season){
      if(season){
	       $rootScope.currentSeasonId = season.id;
      }
    });

  console.log("init.js :4", "Angular Loaded!");
})
