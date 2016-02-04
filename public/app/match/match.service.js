angular
  .module('app')

  .service('Match', function($http){
    this.get = function(){
      return $http.get('/api/match');
    }

    this.create = function(data){
      console.log("match.service.js :10", "asdasd");
      return $http.post('/api/match', data);
    }
  });