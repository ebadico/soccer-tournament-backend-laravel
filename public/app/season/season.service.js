angular.module('app')

.service('Season', function($http){

	this.get = function(){
		return $http.get('/api/season');
	}

	this.createSeason = function(){
		return $http.post('/api/season');
	}

})