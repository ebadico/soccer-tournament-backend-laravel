angular
  .module('app')

  .controller('TeamCtrl', ['$scope', '$stateParams', 'toastr', 'Team', 'Round', 'Player', function($scope, $stateParams, toastr, Team, Round, Player){
      $scope.team = {};
      $scope.rounds = undefined;
      $scope.editMode = false;
  
      getTeam();
      getRounds();
  
      $scope.editTeam = function(team){
        Team
          .edit(team) 
          .then(function(res){
            console.log("single.controller.js :14", res.data);
            toastr.warning('Modificato');
            getTeam();
            $scope.editMode = false;
          },function(err){
            toastr.error(err, 'Error...');
          })
      }
  
  
      $scope.deletePlayer = function(player){
        if(confirm('Sicuro di volerlo rimuovere?')){
          Player.delete(player)
          .then(function(res){
            console.log("player.controller.js :30", res);
            toastr.warning('Rimosso!');
            getTeam();
          }, function(err){
            toastr.error(err, 'Errore...');
            console.log("player.controller.js :32", err);
          })
        }
      }
  
      $scope.createPlayer = function(player){
        player.team_id = $scope.team.id;
        Player.create(player)
        .then(function(res){
          if(res.status === 200){
            $scope.player = {};
            toastr.success('Giocatore creato!');
            getTeam();
          }
        },function(err){
          console.log("player.controller.js :33", err);
          toastr.error(err, 'Error...');
        });
      }
  
      function getTeam(){
        Team
          .getTeam($stateParams.team_id)
          .then(function(res){
            $scope.team = res.data;
            console.log("single.controller.js :11", res.data);
          });
      }
      function getRounds(){
        Round
          .get()
          .then(function(res){
            console.log("single.controller.js :66", res.data);
            $scope.rounds = res.data;
          });
      }
  
    }])