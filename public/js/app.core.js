angular.module("app",["ngAnimate","angular.filter","ui.router","toastr","ui.tinymce","flow","satellizer"]).config(["flowFactoryProvider","$authProvider","$stateProvider","$urlRouterProvider",function(flowFactoryProvider,$authProvider,$stateProvider,$urlRouterProvider){flowFactoryProvider.defaults={chunkSize:4194304},$authProvider.loginUrl="/api/auth",$urlRouterProvider.otherwise("/"),$stateProvider.state("public",{url:"/",templateUrl:"app/public/public-template.html",controller:"PublicCtrl"}).state("public.login",{url:"login",templateUrl:"app/login/login.html",controller:"LoginCtrl",resolve:{authResolve:function(Auth,$state){return Auth.check().then(function(data){$state.go("admin.dashboard")},function(){$state.go("public.login")})}}}).state("admin",{"abstract":!0,cache:!1,url:"/admin",templateUrl:"app/admin/admin-template.html",controller:"AdminCtrl",resolve:{authResolve:function(Auth){return Auth.check().then(function(data){return{auth:!0}},function(){return{auth:!1}})}}}).state("admin.dashboard",{url:"",templateUrl:"app/admin/dashboard.html"}).state("admin.user",{url:"/user",templateUrl:"app/user/index.html",controller:"UserCtrl"}).state("admin.news",{url:"/news",templateUrl:"app/news/index.html",controller:"NewsCtrl"}).state("admin.medias",{url:"/medias",templateUrl:"app/media/index.html",controller:"MediaCtrl"}).state("admin.season",{url:"/season",templateUrl:"app/season/index.html",controller:"SeasonCtrl"}).state("admin.rounds",{url:"/rounds",templateUrl:"app/round/index.html",controller:"RoundsCtrl"}).state("admin.round",{url:"/rounds/{round_id}",templateUrl:"app/round/round.html",controller:"SingleRoundCtrl"}).state("admin.teams",{url:"/teams",templateUrl:"app/team/index.html",controller:"TeamsCtrl"}).state("admin.team",{url:"/team/{team_id}",templateUrl:"app/team/team.html",controller:"SingleTeamCtrl"}).state("admin.match",{url:"/match",templateUrl:"app/match/index.html",controller:"MatchCtrl"}).state("admin.results",{url:"/match/results",templateUrl:"app/match/results.html",controller:"MatchCtrl"}).state("admin.result",{url:"/match/result/{match_id}",templateUrl:"app/match/result.html",controller:"ResultCtrl"})}]).run(["$rootScope",function($rootScope){$rootScope.sitename="_MyTournament_",console.log("init.js :4","Core Loaded!")}]);