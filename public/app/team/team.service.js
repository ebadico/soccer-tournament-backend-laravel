angular
  .module('app')

  .service('Team', function($http){
    this.get = function(){
      return $http.get('/api/team');
    }

    this.getFromRound = function(round_id){
     return $http.get('/api/team?round_id=' + round_id );
    }

    this.getTeam = function(team_id){
      return $http.get('/api/team/' + team_id);
    }

    this.create = function(data){
      console.log("team.service.js :10", data);
      return $http.post('/api/team', data);
    }

    this.edit = function(team){
      return $http.put('/api/team/' + team.id, team);
    }

    this.delete = function(team){
      return $http.delete('/api/team/' + team.id);
    }
  });