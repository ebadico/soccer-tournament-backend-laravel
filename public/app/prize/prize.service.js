angular.module('app')

.service('Prize', ['$http', function($http){
    
    this.create = function(prize){
      console.log("prize.service.js :6", prize);
      return $http.post('/api/prize', prize);
    }

    this.get = function(){
      return $http.get('/api/prize');
    }

    this.delete = function(prize){
      return $http.delete('/api/prize/' + prize.id);
    }


  }])