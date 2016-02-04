angular
  .module('app')

  .service('Team', function($http){
    this.get = function(){
      return $http.get('/api/team');
    }

    this.createTeam = function(data){
      console.log("team.service.js :10", data);
      return $http.post('/api/team', data);
    }
  });