angular
  .module('app')

  .controller('PlayerCtrl', function($scope, $state, Team, Player){
    $scope.players = [];
    $scope.teams = [];
    $scope.player = {};


    if ( $state.current.name === "admin.player"){
      Player
        .get()
        .then(function(res){
          $scope.players = res.data;
        });
    }


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
          if(res.status === 200){
            $scope.player = {};
          }
        },function(err){
          console.log("player.controller.js :33", err);
          $scope.error = err.statusText;
        });
      }

  });