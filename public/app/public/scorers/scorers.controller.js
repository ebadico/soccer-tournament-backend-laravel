angular.module('app')

.controller('PublicScorersCtrl', ['$scope', 'Player', 'Round', function($scope, Player, Round){
  $scope.players = [];

  getRounds();
  getPlayers();

  $scope.roundChange = function(round_id){
    $scope.round_id = round_id;
  }

  function getRounds(){
    Round.get()
    .then(function(res){
      $scope.rounds = res.data;
    });
  }

  function getPlayers (){
    Player
      .get()
      .then(function(res){
        $scope.players = res.data;
      }, function(err){
        console.log("scorers.controller.js :12", err);
      })
  }
}])