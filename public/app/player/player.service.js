angular
  .module('app')

  .service('Player', function($http){
    this.get = function(){
      return $http.get('/api/player');
    }

    this.create = function(data){
      console.log("player.service.js :10", "asdasd");
      return $http.post('/api/player', data);
    }
  });