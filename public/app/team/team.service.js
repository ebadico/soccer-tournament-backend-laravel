angular
  .module('app')

  .service('Team', function($http){
    this.get = function(){
      return $http.get('/api/team');
    }

    this.getFromRound = function(round_id){
     return $http.get('/api/team')
     .then(function(res){
      var roundTeam = [];
       res.data.forEach(function(team){
          if(team.round_id === round_id) roundTeam.push(team);
       });
       return roundTeam;
     }); 
    }

    this.createTeam = function(data){
      console.log("team.service.js :10", data);
      return $http.post('/api/team', data);
    }
  });