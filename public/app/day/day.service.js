angular.module('app')

.service('Day', function($http){

	this.get = function(){
		return $http.get('/api/day');
	}

	this.createRound = function(day){
		return $http.post('/api/day', day);
	}

})