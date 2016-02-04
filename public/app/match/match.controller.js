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
        $scope.matches = res.data;
      });

    Round
      .get()
      .then(function(res){
        $scope.rounds = res.data;
      });

    Day
      .get()
      .then(function(res){
        $scope.days = res.data;
      });


      $scope.getDataFromRound = function(round_id){
        Team.getFromRound(round_id)
        .then(function(res){
          $scope.teams = res;
        });
      }

      $scope.createMatch = function(match){
        Match.create(match);
      }

  });