angular
  .module('app')

  .service('Player', function($http){
    this.get = function(){
      return $http.get('/api/player');
    }

    this.create = function(data){
      return $http.post('/api/player', data);
    }
  });