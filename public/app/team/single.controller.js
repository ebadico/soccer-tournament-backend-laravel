angular
.module('app')
.controller('SingleTeamCtrl', ['$scope', '$stateParams', 'toastr', 'Team', 'Round', 'Player', function($scope, $stateParams, toastr, Team, Round, Player){
  $scope.team = {};
  $scope.rounds = undefined;
  $scope.editMode = false;

  getTeam();
  getRounds();

  $scope.submit = function ($files, $event, $flow, team) {
    $flow.opts.target = '/api/media?type=avatar&team_id=' + team.id;
    $flow.upload();
  }
  $scope.upload = function() {
    getTeam();
  }

  // refactor the shit out of Medias, put FK in other model idiot.
  // why in the fuckin hell you didn't do it from the start I don't even know.
  //
  $scope.submitGroupPhoto = function($files, $event, $flow, team) {
    $flow.opts.target = '/api/media?type=team';
    $flow.upload();
  }
  $scope.uploadedGroupPhoto = function($file, $message, $flow, team){
    if($message){
      var img = JSON.parse($message);
      team.group_photo_id = img.id;
      $scope.editTeam(team);
    }
    //getTeam();
  }

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