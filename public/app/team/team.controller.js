angular
.module('app')
.controller('TeamsCtrl', ['$scope', 'toastr', 'Team', 'Round', function($scope, toastr, Team, Round){
  $scope.teams = [];
  $scope.team = {
    round_id: undefined,
    name: ""
  };
  
  $scope.rounds = [];
    
  getRounds();
  getTeams();

  $scope.create = function(team){
    Team
    .create(team)
    .then(function(res){
      if(res.status === 200){
        $scope.team = {};
        toastr.success('Team creato!');
        getTeams();
      }
    }, function(err){
     if(err){
      toastr.error(err, "Errore...");
     }
    });
  }

  $scope.delete = function (team){
    if(confirm('Sicuro di volerlo rimuovere?')){
      Team
      .delete(team)
      .then(function (res) {
        toastr.warning('Rimosso!');
        getTeams();
      }, function (err){
        toastr.error(err, 'Errore...');
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
  
}])

