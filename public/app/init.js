angular.module('app', [
	'ngAnimate',
  'angular.filter',
  'ui.router',
  'toastr',
  'ui.tinymce',
  'flow',
  'satellizer',
])

.config(['flowFactoryProvider', '$authProvider', '$stateProvider', '$urlRouterProvider', function(flowFactoryProvider, $authProvider, $stateProvider, $urlRouterProvider) {
  
  flowFactoryProvider.defaults = {
    chunkSize: 2048 * 2048,
  };

  $authProvider.loginUrl = '/api/auth';

  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");

  $stateProvider  
    /**
      * PUBLIC
      */
    .state('public', {
      url: "/",
      templateUrl: 'app/public/public-template.html'
    })
      .state('public.login', {
        url: "login",
        templateUrl: 'app/login/login.html',
        controller: 'LoginCtrl'
      })

     /**
      * ADMIN
      */
    .state('admin', {
      cache: false,
      url:'/admin',
      templateUrl: 'app/admin/admin-template.html',
      controller: 'AdminCtrl',
      resolve: {
        authResolve: function(Auth){
          return Auth.check()
            .then(function(data){
              return { "auth": true};
            }, function(){
              return { "auth": false};
            });
        }
      }
    })
      .state('admin.user', {
        url:'/user',
        templateUrl: 'app/user/index.html',
        controller: 'UserCtrl'
      })

      .state('admin.news',{
        url: '/news',
        templateUrl: 'app/news/index.html',
        controller: 'NewsCtrl',
      })
      .state('admin.medias',{
        url: '/medias',
        templateUrl: 'app/media/index.html',
        controller: 'MediaCtrl',
      })

      .state('admin.season', {
        url:'/season',
        templateUrl: 'app/season/create.html',
        controller: 'SeasonCtrl',
      })

      .state('admin.rounds', {
        url:'/rounds',
        templateUrl: 'app/round/rounds.html',
        controller: 'RoundsCtrl',
      })
        .state('admin.round', {
          url:'/rounds/{round_id}',
          templateUrl: 'app/round/round.html',
          controller: 'RoundCtrl',
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
}])


.run([function(){
  console.log("init.js :4", "Angular Loaded!");
}])