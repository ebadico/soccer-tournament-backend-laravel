angular
  .module('app')

  .controller('TeamsCtrl', function($scope, toastr, Team, Round){
    $scope.teams = [];
    $scope.team = {
      round_id: undefined,
      name: ""
    };
    $scope.rounds = [];


      getRounds();
      getTeams();

      $scope.create = function(team){
        console.log("team.controller.js :25", $scope.team.round_id);
        Team.create(team).then(function(res){
          if(res.status === 200){
            $scope.team = {};
            toastr.success('Team creato!');
            getTeams();
          }
        },function(err){
         if(err){
          toastr.error(err, "Errore...");
         }
        })
      }

      $scope.delete = function(team){
        if(confirm('Sicuro di volerlo rimuovere?')){
          Team.delete(team)
          .then(function(res){
            console.log("team.controller.js :30", res);
            toastr.warning('Rimosso!');
            getTeams();
          }, function(err){
            toastr.error(err, 'Errore...');
            console.log("team.controller.js :32", err);
          })
        }
      }

      function getRounds(){
        Round
          .get()
          .then(function(res){
            $scope.rounds = res.data;
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