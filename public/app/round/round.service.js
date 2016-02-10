angular.module('app')

  .service('Round', ['$http', function($http){
  
      this.get = function(){
        return $http.get('/api/round');
      }
  
      this.getSingle = function(id){
        return $http.get('/api/round/' + id);
      }
  
      this.create = function(round){
        return $http.post('/api/round', round);
      }
  
      this.edit = function(round){
        console.log("round.service.js :14", round);
        return $http.put('/api/round/' + round.id, round);
      }
  
      this.delete = function(round){
        return $http.delete('/api/round/' + round.id);
      }
  
    }])