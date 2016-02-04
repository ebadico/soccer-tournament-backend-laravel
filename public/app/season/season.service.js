angular.module('app')

.service('Season', function($http){

	this.get = function(){
		return $http.get('/api/season');
	}

  this.getCurrentSeason = function(callback){
    $http.get('/api/season')
    .then(function(data){
      var seasons = data.data;
      seasons.forEach(function(season){
        if(season.current) return callback(season);
      });
    })
  }

	this.createSeason = function(){
		return $http.post('/api/season');
	}

})