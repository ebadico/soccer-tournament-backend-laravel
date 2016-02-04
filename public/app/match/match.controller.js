angular
  .module('app')

  .controller('MatchCtrl', function($scope, Match, Round, Day, Team){
    $scope.matches = [];
    $scope.match = {};
    
    $scope.rounds = [];
    $scope.round_id = "";
    $scope.teams  = [];
    $scope.days   = [];

    Match
      .get()
      .then(function(res){
        $scope.match = res.data;
      });

    Round
      .get()
      .then(function(res){
        $scope.rounds = res.data;
      })


      $scope.getDataFromRound = function(round_id){
        Team.getFromRound(round_id)
        .then(function(res){
          console.log(res);
        });
      }

      $scope.createMatch = function(match){
        
        // Player
        // .create(player)
        // .then(function(res){
        //   if(res.status){
        //     $scope.teams = res.data;
        //   }
        // },function(err){
        //   console.log("player.controller.js :33", err);
        //   $scope.error = err.statusText;
        // });

      }

  });