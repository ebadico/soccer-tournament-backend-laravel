angular
  .module('app')

  .service('Player', ['$http', function($http){
    this.get = function(){
      return $http.get('/api/player');
    }

    this.create = function(data){
      return $http.post('/api/player', data);
    }

    this.delete = function(player){
      return $http.delete('/api/player/' + player.id);
    }
  }])