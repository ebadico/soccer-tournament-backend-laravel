angular.module('app')

.factory('Auth', function($http){
	var Auth = {
		token:'',
	};

	Auth.login = function(credential){
		//$http.get(), get token back
		console.log("Auth.factory.js :7", credential);
	}

	Auth.logout = function(){
		//$http.get(), get token back
	}

	Auth.isLoggedIn = function(){
		
	}


	return Auth;
})