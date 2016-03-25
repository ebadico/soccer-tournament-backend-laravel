angular.module('app', [
  'ngSanitize',
  'ngAnimate',
  'angular.filter',
  'ui.router',
  'toastr',
  'ui.tinymce',
  'flow',
  'satellizer',
  'wu.masonry',
  'slickCarousel',
])

.constant('IS_DEBUGGING', false)

.config([
  'flowFactoryProvider',
  '$authProvider', 
  '$stateProvider', 
  '$urlRouterProvider',
  '$httpProvider',
  function(flowFactoryProvider, $authProvider, $stateProvider, $urlRouterProvider, $httpProvider) {

  //$httpProvider.defaults.cache = true;

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
      .state('public.home', {
        url:'',
        templateUrl: 'app/public/home/index.html',
        controller: 'HomeCtrl',
      })

      .state('public.login', {
        url: "login",
        templateUrl: 'app/login/login.html',
        controller: 'LoginCtrl',
      })

      .state('public.calendars', {
        url:'calendari?round',
        templateUrl: 'app/public/calendars/calendars.html',
        controller: 'PublicCalendarsCtrl',
      })
      .state('public.contacts', {
        url:'contatti',
        templateUrl: 'app/public/contacts/contacts.html',
        controller: 'PublicContactsCtrl',
      })
      .state('public.medias', {
        url:'media?type',
        templateUrl: 'app/public/medias/medias.html',
        controller: 'PublicMediasCtrl',
      })
        .state('public.medias.modal', {
          cache: false,
          reload: true,
          url: '/{item}',
          template: '<modal id="modal"></modal>',
        })
      .state('public.news', {
        url:'news?type',
        templateUrl: 'app/public/news/news.html',
        controller: 'PublicNewsCtrl',
      })
        .state('public.singlenews', {
          url:'news/{id}',
          templateUrl: 'app/public/news/single-news.html',
          controller: 'PublicSingleNewsCtrl',
          resolve:{
            ResolvedPost:function(News, $stateParams){
              return News.get($stateParams.id)
              .then(function(res){
                return res.data;
              })
            }
          }
        })

      .state('public.rankings', {
        url:'classifiche?round',
        templateUrl: 'app/public/rankings/rankings.html',
        controller: 'PublicRankingsCtrl',
      })
      .state('public.rules', {
        url:'regolamento',
        templateUrl: 'app/public/rules/rules.html',
        controller: 'PublicRulesCtrl',
      })
      .state('public.scorers', {
        url:'marcatori',
        templateUrl: 'app/public/scorers/scorers.html',
        controller: 'PublicScorersCtrl',
      })
      .state('public.team', {
        url:'team/{team_id}',
        templateUrl: 'app/public/team/team.html',
        controller: 'PublicTeamCtrl',
      })

    /**
      * ADMIN
      **/
    .state('admin', {
      abstract: true,
      //cache: false,
      url:'/admin',
      templateUrl: 'app/admin/admin-template.html',
      controller: 'AdminCtrl',
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

      .state('admin.rules',{
        url: '/rules',
        templateUrl: 'app/news/rules.html',
        controller: 'RulesCtrl',
      })
      .state('admin.contacts',{
        url: '/contacts',
        templateUrl: 'app/news/contacts.html',
        controller: 'ContactsCtrl',
      })

      .state('admin.medias',{
        url: '/medias',
        templateUrl: 'app/media/index.html',
        controller: 'MediaCtrl',
      })

      .state('admin.prizes',{
        url: '/prizes',
        templateUrl: 'app/prize/index.html',
        controller: 'PrizeCtrl',
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

      .state('admin.players', {
        url: '/players',
        templateUrl: 'app/player/players.html',
        controller: 'PlayerCtrl'
      })
      .state('admin.player', {
        url: '/player/{player_id}',
        templateUrl: 'app/player/single.html',
        controller: 'SinglePlayerCtrl'
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


.run(['$window', 'IS_DEBUGGING', '$rootScope', '$state', 'Auth', 'Round', function($window, IS_DEBUGGING, $rootScope, $state, Auth, Round){


  $window.fbAsyncInit = function() {
    FB.init({
      appId      : '1020464471354564',
      status: true, 
      cookie: true, 
      xfbml: true,
      version    : 'v2.5'
    });
    console.log("init.js :228", "fb_sdk");
  };

  Round.get()
  .then(function(res){
    $rootScope.rounds = res.data;
  });

  $rootScope.isLoginPage = false;
  $rootScope.sitename = '_MyTournament_';

  $rootScope.$on('$stateChangeStart', function(e, stateTo, toParams, stateFrom){
    if (stateTo.name.match(/^admin/) && !stateFrom.name.match(/^admin/)){
      Auth.check()
      .then(function(data){
        $state.transitionTo(stateTo.name, toParams);
      }, function(err){
        $state.transitionTo('public.login');
      });
    }
  });

  $rootScope.$on('$stateChangeStart', function(e, stateTo, toParams, stateFrom){
    $rootScope.stateLocation = stateTo.name;
    if ( stateTo.name.match(/^admin/) ){
      $rootScope.location = 'admin';
    }else{
      $rootScope.location = 'public';
    }
  });

  $rootScope.tinymceOptions = {
    onChange: function(e) {
      // put logic here for keypress and cut/paste changes
    },
    inline: false,
    plugins : 'advlist autolink link image lists charmap print preview paste',
    skin: 'lightgray',
    theme : 'modern',
    paste_use_dialog : false,
    paste_auto_cleanup_on_paste : true,
    paste_convert_headers_to_strong : false,
    paste_strip_class_attributes : "all",
    paste_remove_spans : true,
    paste_remove_styles : true,
    paste_retain_style_properties : "",
  };

  console.log('CoreLoaded');
  console.log("Welcome to GlobusCup 2016!");

  if(!IS_DEBUGGING){
    console.log = function(){};
  }
}])