angular
  .module('app')

  .controller('PlayerCtrl', function($scope, Team, Player){
    $scope.players = [];
    $scope.teams = [];
    $scope.player = {};

    Player
      .get()
      .then(function(res){
        $scope.players = res.data;
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


      $scope.createPlayer = function(player){
        Player.create(player)
        .then(function(res){
          if(res.status){
            $scope.teams = res.data;
          }
        },function(err){
          console.log("player.controller.js :33", err);
          $scope.error = err.statusText;
        });
      }

  });