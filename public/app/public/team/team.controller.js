angular
.module('app')
.controller('PublicTeamCtrl', ['$scope', '$stateParams', 'Team', function($scope, $stateParams, Team){
  var team_id = $stateParams.team_id;
  $scope.team = {};

  getTeam();

  function getTeam(){
    Team
      .getTeam(team_id)
      .then(function(res){
        $scope.team = res.data;
      });
  }



}])