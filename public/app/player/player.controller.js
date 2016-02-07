angular
  .module('app')

  .controller('PlayerCtrl', function($scope, $state, toastr, Team, Player){
    $scope.players = [];
    $scope.teams = [];
    $scope.player = {};

    getPlayers();
    getTeams();


    $scope.create = function(player){
      Player.create(player)
      .then(function(res){
        if(res.status === 200){
          $scope.player = {};
          toastr.success('Giocatore creato!');
          getPlayers();
        }
      },function(err){
        console.log("player.controller.js :33", err);
        toastr.error(err, 'Error...');
      });
    }

    $scope.delete = function(player){
      if(confirm('Sicuro di volerlo rimuovere?')){
        Player.delete(player)
        .then(function(res){
          console.log("player.controller.js :30", res);
          toastr.warning('Rimosso!');
          getPlayers();
        }, function(err){
          toastr.error(err, 'Errore...');
          console.log("player.controller.js :32", err);
        })
      }
    }

    function getPlayers(){
      Player
        .get()
        .then(function(res){
          $scope.players = res.data;
        });
    }

    function getTeams(){
      Team
        .get()
        .then(function(res){
          if(res.status){
            $scope.teams = res.data;
          }
        },function(err){
          $scope.error = err;
        });
    }
  });