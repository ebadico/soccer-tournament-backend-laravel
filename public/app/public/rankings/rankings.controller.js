angular.module('app')

.controller('PublicRankingsCtrl', ['$scope', 'Team','Round', function($scope, Team, Round){
  $scope.teams = [];
  $scope.rounds = [];

  getRounds();
  getTeams();

  $scope.changeRound = function(round_id){
    $scope.roundFilterId = round_id;
  }


  function getTeams(){
    Team.get()
    .then(function(res){
      $scope.teams = res.data;
    }, function(err){
      console.log("rankings.controller.js :13", err);
    });
  }
  function getRounds(){
    Round.get()
    .then(function(res){
      console.log("rankings.controller.js :20", res);
      $scope.rounds = res.data;
    }, function(err){
      console.log("rankings.controller.js :21", err);
    })
  }
}])

