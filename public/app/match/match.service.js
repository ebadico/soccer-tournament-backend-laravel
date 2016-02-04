angular
  .module('app')

  .service('Match', function($http){
    this.get = function(){
      return $http.get('/api/match');
    }

    this.create = function(data){
      return $http.post('/api/match', data);
    }
  });