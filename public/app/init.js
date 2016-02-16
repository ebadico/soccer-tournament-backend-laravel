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
      abstract:true,
      url: "/",
      templateUrl: 'app/public/public-template.html',
      controller: 'PublicCtrl'
    })
      .state('public.login', {
        url: "login",
        templateUrl: 'app/login/login.html',
        controller: 'LoginCtrl',
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

      .state('public.home', {
        url:'',
        templateUrl: 'app/public/home/index.html',
        controller: 'HomeCtrl',
      })

     /**
      * ADMIN
      */
    .state('admin', {
      abstract: true,
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
      .state('admin.dashboard', {
        url:'',
        templateUrl: 'app/admin/dashboard.html'
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
        templateUrl: 'app/season/index.html',
        controller: 'SeasonCtrl',
      })

      .state('admin.rounds', {
        url:'/rounds',
        templateUrl: 'app/round/index.html',
        controller: 'RoundsCtrl',
      })
        .state('admin.round', {
          url:'/rounds/{round_id}',
          templateUrl: 'app/round/round.html',
          controller: 'SingleRoundCtrl',
        })


      .state('admin.teams', {
        url:'/teams',
        templateUrl: 'app/team/index.html',
        controller: 'TeamsCtrl',
      })
        .state('admin.team', {
          url:'/team/{team_id}',
          templateUrl: 'app/team/team.html',
          controller: 'SingleTeamCtrl',
        })


      .state('admin.match', {
        url:'/match',
        templateUrl: 'app/match/index.html',
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


.run(['$rootScope', '$state', function($rootScope, $state){
  $rootScope.sitename = '_MyTournament_';

  $rootScope.$on('$stateChangeStart', function(e, stateTo){
    if (stateTo.name.match(/^admin\./)){
      e.preventDefault();
    }else{
    }

    if (stateTo.name.match(/^admin\./)){
      $rootScope.location = 'admin';
    }else{
      $rootScope.location = 'public';
    }
  });

  console.log("init.js :4", "Core Loaded!");
}])