angular.module('app')

.service('Day', ['$http', function($http){

  this.get = function(){
    return $http.get('/api/day');
  }
  
  this.getFromRound = function(round_id){
    return $http.get('/api/day?round_id=' + round_id);
  }

  this.last = function(){
    return $http.get('/api/day?last_day=1');
  }


  this.create = function(day){
    console.log("day.service.js :10 creating new day:", day);
    return $http.post('/api/day', day);
  }

  this.delete = function(day){
    return $http.delete('/api/day/' + day.id);
  }

}])