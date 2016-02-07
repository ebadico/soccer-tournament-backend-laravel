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

	this.create = function(season){
		return $http.post('/api/season', season);
	}

  this.delete = function(season){
    return $http.delete('/api/season/' + season.id);
  }

  this.edit = function(season){
    return $http.put('/api/season/' + season.id, season);
  }


})