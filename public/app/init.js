angular.module('app', [
	'ngAnimate',
  'angular.filter',
  'ui.router',
  'toastr',
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
        templateUrl: 'app/season/create.html',
        controller: 'SeasonCtrl',
      })

      .state('admin.round', {
        url:'/round',
        templateUrl: 'app/round/create.html',
        controller: 'RoundCtrl',
      })

      .state('admin.day', {
        url:'/day',
        templateUrl: 'app/day/create.html',
        controller: 'DayCtrl',
      })

      .state('admin.teams', {
        url:'/teams',
        templateUrl: 'app/team/create.html',
        controller: 'TeamsCtrl',
      })
        .state('admin.team', {
          url:'/team/{team_id}',
          templateUrl: 'app/team/team.html',
          controller: 'TeamCtrl',
        })

      .state('admin.player', {
        url:'/player',
        templateUrl: 'app/player/create.html',
        controller: 'PlayerCtrl',
      })

      .state('admin.match', {
        url:'/match',
        templateUrl: 'app/match/create.html',
        controller: 'MatchCtrl',
      })
      .state('admin.results', {
        url:'/match/results',
        templateUrl: 'app/match/results.html',
        controller: 'MatchCtrl',
      })
        .state('admin.result', {
          url:'/match/result/{match_id}',
          templateUrl: 'app/match/result.html',
          controller: 'ResultCtrl',
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