angular.module('app')

.controller('PublicRankingsCtrl', ['$scope', 'Team', function($scope, Team){
  $scope.teams = [];

  getTeams();


  function getTeams(){
    Team.get()
    .then(function(res){
      $scope.teams = res.data;
    }, function(err){
      console.log("rankings.controller.js :13", err);
    });
  }
  
}])

