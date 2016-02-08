angular
  .module('app')

  .controller('ResultCtrl', function($scope, $state, $stateParams, toastr, Match){
    $scope.match = {};

    $scope.teamAScores = [];
    $scope.teamBScores = [];
    $scope.loadedAttendances = {}; // ex.  { 'team_id': { 'player_id': {} }  }
    $scope.teamAAttendances = {};
    $scope.teamBAttendances = {};

    getMatch();

    $scope.edit = function(result){
      result.attendances = [];

      for(value in $scope.teamAAttendances){
        var attendance = { player_id: Number(value), match_id: $scope.match.id };
        if($scope.teamAAttendances[value]){
          attendance.action = 'add';
        }else{
          attendance.action = 'remove';
        }
        result.attendances.push(attendance); 
      }
      for(value in $scope.teamBAttendances){
        var attendance = { player_id: Number(value), match_id: $scope.match.id };
        if($scope.teamBAttendances[value]){
          attendance.action = 'add';
        }else{
          attendance.action = 'remove';
        }
        result.attendances.push(attendance);
      }

      result.all_scores = $scope.teamAScores.concat($scope.teamBScores);

      Match
        .edit(result)
        .then(function(res){
          console.log("result.controller.js :25", res.data);
          getMatch();
          //$scope.attendances = {};
        })
    }
    
    function getMatch(){
      Match
        .single($stateParams.match_id)
        .then(function(res){
          $scope.match = res.data;

          /** attendances two way <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< FINISH_IT */
          $scope.match.attendance.forEach(function(element, index, array){
            console.log("result.controller.js :56", array.length);
            $scope.loadedAttendances[element.player.team_id] = $scope.loadedAttendances[element.player.team_id] || {};
            $scope.loadedAttendances[element.player.team_id][element.player.id] = element;
          });

          /** scores two way */
          $scope.match.team_a.player.forEach(function(player){
            player.score = 0;
            $scope.match.scores.forEach(function(score){
              if( score.player_id === player.id ) player.score++;
            });
          });
          $scope.match.team_b.player.forEach(function(player){
            player.score = 0;
            $scope.match.scores.forEach(function(score){
              if( score.player_id === player.id ) player.score++;
            });
          });
        });

    }

    $scope.$watch('match', function(newVal, oldVal){
      if( newVal !== oldVal && typeof oldVal.id != 'undefined' ) {
        var match = newVal;
        var teamAScores = [];
        var teamBScores = [];
        match.team_a.player.forEach(function(player){
          if(player.score && player.score >= 0 ){
            player.player_id = player.id;
            player.match_id = $scope.match.id;
            for(var i = 0; i < player.score; i++) teamAScores.push(player);
          }
          $scope.teamAScores = teamAScores;
        });
        match.team_b.player.forEach(function(player){
          if(player.score && player.score >= 0 ){
            player.player_id = player.id;
            player.match_id = $scope.match.id;
            for(var i = 0; i < player.score; i++) teamBScores.push(player);
          }
          $scope.teamBScores = teamBScores;
        });
      }
    },true);

  });