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


      $scope.createTeam = function(team){
        console.log("team.controller.js :25", $scope.team.round_id);
        Team.createTeam(team).then(function(res){
          console.log("team.controller.js :29", res);
          if(res.status === 200){
            $scope.team = {};
          }
        },function(err){
         if(err){
          console.log("team.controller.js :32", err);
         }
        })
      }

  });