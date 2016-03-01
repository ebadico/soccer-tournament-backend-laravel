angular.module('app')

.controller('PublicRankingsCtrl', [
  '$scope', 
  '$stateParams',
  'Team',
  function($scope, $stateParams, Team){
    $scope.teams = [];
    getTeams();

    $scope.roundFilterId = $stateParams.round || undefined;

    function getTeams(){
      Team.get()
      .then(function(res){
        $scope.teams = res.data;
      }, function(err){
        console.log("rankings.controller.js :13", err);
      });
    }
  
}])

