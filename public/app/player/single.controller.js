angular.module('app')
.controller('SinglePlayerCtrl',['$scope', '$stateParams', 'toastr', 'Player', function($scope, $stateParams, toastr, Player){
  $scope.player = {};

  getPlayer();

  $scope.submit = function($files, $event, $flow, player) {
    $flow.opts.target = '/api/media?type=avatar&player_id=' + player.id;
    $flow.upload();
  }

  $scope.upload = function(){
    toastr.success('Avatar caricato!');
    getPlayer();
  }

  $scope.edit = function(player){
    Player.edit(player)
    .then(function(res){
     console.log("single.controller.js :20", res.data); 
     toastr.success('Giocatore modificato!');
     getPlayer();
     $scope.editMode = !$scope.editMode;
    }, function(err){
     toastr.error(err, 'Error...');
    })
  }
  
  function getPlayer (){
    console.log("single.controller.js :9", $stateParams);
    Player.getSingle($stateParams.player_id)
    .then(function(res){
      console.log("single.controller.js :11", res);
      $scope.player = res.data;
    }, function(err){
      console.log("single.controller.js :13", err);
    });
  }

}])