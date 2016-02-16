angular.module('app')
.controller('PlayerCtrl',['$scope', 'toastr', 'Player', function($scope, toastr, Player){
  $scope.players = [];

  getPlayers();

  $scope.delete = function(player){
    if (confirm('Sicuro di volerlo rimuovere')){
      Player.delete(player) 
      .then(function(res){
        toastr.warning('Giocatore rimosso');
        getPlayers();
      },function(err){
        if(err){
          toastr.error('Error...');
          console.log("player.controller.js :14", err);
        }
      });
    }
  }

  function getPlayers(){
    Player
      .get()
      .then(function(res){
        $scope.players = res.data;
      }, function(err){
        console.log("player.controller.js :13", err);
      });
  }


}])