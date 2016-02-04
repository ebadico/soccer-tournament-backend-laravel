angular
  .module('app')

  .controller('TeamCtrl', function($scope, Team, Round){
    $scope.teams = [];
    $scope.team = {};
    $scope.rounds = [];

    Round
      .get()
      .then(function(res){
        $scope.rounds = res.data;
      });

    Team
      .get()
      .then(function(res){
        if(res.status){
          $scope.teams = res.data;
        }
      },function(err){
        $scope.error = err;
      });

      console.log("team.controller.js :25", $scope.team.round_id);

      $scope.createTeam = function(team){
        Team.createTeam(team)
      }

  });