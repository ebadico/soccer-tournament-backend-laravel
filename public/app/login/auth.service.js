angular.module('app')

.service('Auth', function($http, $rootScope){
	this.login = function(credential){
		return $http.post('/api/auth', credential);
	}
	this.token = function(){
		return $rootScope.jwd_token;
	}	
})