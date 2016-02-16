angular
  .module('app')

  .service('Player', ['$http', function($http){
    this.get = function(){
      return $http.get('/api/player');
    }

    this.getSingle = function(player_id){
      console.log("player.service.js :10", player_id);
      return $http.get('/api/player/' + player_id); 
    }

    this.create = function(data){
      return $http.post('/api/player', data);
    }

    this.edit = function(player){
      return $http.put('/api/player/' + player.id, player);
    }
  
    this.delete = function(player){
      return $http.delete('/api/player/' + player.id);
    }
  }])