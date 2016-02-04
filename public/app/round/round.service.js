angular.module('app')

.service('Round', function($http){

	this.get = function(){
		return $http.get('/api/round');
	}

	this.createRound = function(round){
		return $http.post('/api/round', round);
	}

})