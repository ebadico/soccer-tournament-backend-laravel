angular.module('app')

.service('Day', function($http){

	this.get = function(){
		return $http.get('/api/day');
	}

  //DO GET DAY FROM ROUNDs!!!!!!!!!!!!!!!!!!!!!!
  //YOU ARE MATCHING THE WRONG TEAMSSSSSS IN THE WRONG DAY OF THE WRONG ROUND FFS
  //IDIOT
  
  this.getFromRound = function(round_id){
    return $http.get('/api/day?round_id=' + round_id);
  }


	this.create = function(day){
    console.log("day.service.js :10 creating new day:", day);
		return $http.post('/api/day', day);
	}

  this.delete = function(day){
    return $http.delete('/api/day/' + day.id);
  }

})