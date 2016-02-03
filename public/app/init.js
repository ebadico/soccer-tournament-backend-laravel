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
    	url:'/admin',
    	templateUrl: 'app/admin/admin-template.html'
    })
      .state('admin.user', {
      	url:'/user',
      	templateUrl: 'app/user/index.html',
      	controller: 'UserCtrl'
      })
      .state('admin.create-user', {
      	url:'/create-user',
      	templateUrl: 'app/user/create.html',
      	controller: 'UserCtrl'
      })
      .state('admin.season', {
        url:'/season',
        templateUrl: 'app/season/index.html',
        controller: 'SeasonCtrl',
      })
      .state('admin.create-season', {
        url:'/create-season',
        templateUrl: 'app/season/create.html',
        controller: 'SeasonCtrl',
      })
})


.run(function(){
	console.log("init.js :4", "Angular Loaded!");
})
