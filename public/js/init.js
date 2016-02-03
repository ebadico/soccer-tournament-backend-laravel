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
      templateUrl: '../views/public/main-template.html'
    })
    .state('public.login', {
      url: "/login",
      templateUrl: '../views/public/login.html',
      controller: 'LoginCtrl'
    })

	   /**
	    * ADMIN
	    */
    .state('admin', {
    	url:'/admin',
    	templateUrl: '../views/admin/main-template.html'
    })
    .state('admin.dashboard', {
    	url:'/dashboard',
    	templateUrl: '../views/admin/dashboard.html'
    })
    .state('admin.user', {
    	url:'/user',
    	templateUrl: '../views/admin/user/user.html',
    	controller: 'UserCtrl'
    })
    .state('admin.create-user', {
    	url:'/craete-user',
    	templateUrl: '../views/admin/user/create-user.html',
    	controller: 'UserCtrl'
    })
    .state('admin.season', {
      url:'/season',
      templateUrl: '../views/admin/season.html',
      controller: 'SeasonCtrl'
    })
    .state('admin.create-season', {
      url:'/craete-season',
      templateUrl: '../views/admin/create-season.html',
      controller: 'SeasonCtrl'
    })
})


.run(function(){
	console.log("init.js :4", "INIT");
})
