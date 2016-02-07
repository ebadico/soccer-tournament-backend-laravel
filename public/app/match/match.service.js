angular
  .module('app')

  .service('Match', function($http){
    this.get = function(){
      return $http.get('/api/match');
    }

    this.getWithFilter = function(filters){
      return $http.get('/api/match?day_id=' + filters.day_id + "&round_id=" + filters.round_id);
    }

    this.create = function(data){
      console.log("match.service.js :14", data);
      return $http.post('/api/match', data);
    }

    this.delete = function(match){
      return $http.delete('/api/match/' + match.id);
    }
  });