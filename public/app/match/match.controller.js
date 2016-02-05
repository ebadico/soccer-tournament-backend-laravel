angular
  .module('app')

  .controller('MatchCtrl', function($scope, $state, $q, Match, Round, Day, Team){
    $scope.matches = [];
    $scope.match = {};
    
    $scope.rounds = [];
    $scope.round_id = "";

    $scope.teams  = [];
    
    $scope.days   = [];
    $scope.choosen_day_id = "";
    $scope.filters = {
      day_id: 1,
      round_id: 1,
    }

    $scope.$watch('filters',function(current, prev){
      console.log("match.controller.js :21", "changed");
      getDays();
      getMatchs();
    }, true);

    Round
      .get()
      .then(function(res){
        $scope.rounds = res.data;
      });

    function getMatchs(){
      Match.getWithFilter($scope.filters)
      .then(function(res){
        $scope.matches = res.data;
      },function(err){
        console.log("match.controller.js :27", err);
      });
    }

    function getDays(){
      Day
        .getFromRound($scope.filters.round_id)
        .then(function(res){
          $scope.days = res.data;
        });
    }

    $scope.getDataFromRound = function(round_id){
      Team.getFromRound(round_id)
      .then(function(res){
        $scope.teams = res.data;
      }, function(err){
        console.log("match.controller.js :37", err);
      });
    }

    $scope.createMatch = function(match){
      Match.create(match)
      .then(function(res){
        console.log("match.controller.js :44", res);
      },function(err){
        console.log("match.controller.js :46", err);
      });
    }


  });